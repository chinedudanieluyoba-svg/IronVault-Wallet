# Data Integrity Guide

## Overview

This document describes the data integrity mechanisms in the cryptocurrency wallet platform. These features ensure that balance updates are accurate, consistent, and protected against common payment system issues:

- **Idempotency Keys**: Prevent duplicate charges from webhook retries
- **Concurrency Locks**: Prevent race condition balance corruption
- **Ledger Reconciliation**: Detect and fix discrepancies

---

## Idempotency Keys

### Problem Statement

In payment systems, operations can be retried due to:
- Network timeouts (webhook response not received)
- Provider-side retries (MoonPay, Transak retry failed webhooks)
- Client retries (user clicks "submit" multiple times)
- Infrastructure failures (pod restart mid-request)

Without idempotency, these retries can cause:
- **Double charging**: User charged twice for one transaction
- **Duplicate credits**: Wallet credited twice for one deposit
- **Data inconsistency**: Ledger entries duplicated

### Solution: Idempotency Keys

Every wallet operation generates a unique key that identifies the operation across retries.

#### Key Format

```
{source}:{reference}:{walletId}:{action}
```

**Components**:
- `source`: Origin of operation (`webhook`, `user`, `admin`, `system`)
- `reference`: External reference ID (provider transaction ID, user request ID, etc.)
- `walletId`: Target wallet ID
- `action`: Operation type (`credit`, `debit`)

#### Examples

```typescript
// Webhook from MoonPay
webhook:moonpay_tx_abc123:wallet_user789:credit

// User withdrawal
user:user456_req_xyz:wallet_user456:debit

// Admin manual credit
admin:admin789_1707350400000:wallet_user123:credit

// System-initiated transfer
system:transfer_tx_def456:wallet_user999:debit
```

### Implementation

#### 1. Schema

```prisma
model WalletLedgerEntry {
  id              String   @id @default(cuid())
  walletId        String
  amount          Float
  type            String   // 'credit' or 'debit'
  balanceBefore   Float
  balanceAfter    Float
  source          String   // 'webhook', 'user', 'admin'
  reference       String   // External reference ID
  idempotencyKey  String?  @unique // NEW: Unique constraint
  createdAt       DateTime @default(now())
  
  @@index([idempotencyKey]) // Fast lookups
}
```

#### 2. Service Method

[IdempotencyService](../src/common/idempotency/idempotency.service.ts):

```typescript
@Injectable()
export class IdempotencyService {
  // Generate idempotency key
  generateKey(
    source: string,
    reference: string,
    walletId: string,
    action: 'credit' | 'debit'
  ): string {
    return `${source}:${reference}:${walletId}:${action}`;
  }

  // Check if operation already processed
  async checkIdempotency(key: string): Promise<{
    isNew: boolean;
    existingEntry?: WalletLedgerEntry;
  }> {
    const existing = await this.prisma.walletLedgerEntry.findUnique({
      where: { idempotencyKey: key }
    });

    if (existing) {
      return { isNew: false, existingEntry: existing };
    }

    return { isNew: true };
  }
}
```

#### 3. Integration in WalletService

[WalletService.creditWallet()](../src/wallet/wallet.service.ts):

```typescript
async creditWallet(
  walletId: string,
  amount: number,
  options: { source: string; reference: string; description?: string }
) {
  // 1. Generate idempotency key BEFORE transaction
  const idempotencyKey = this.idempotencyService.generateKey(
    options.source,
    options.reference,
    walletId,
    'credit'
  );

  // 2. Check if already processed
  const { isNew, existingEntry } = await this.idempotencyService.checkIdempotency(
    idempotencyKey
  );

  if (!isNew) {
    // 3. Return existing wallet state (idempotent behavior)
    this.auditLogger.audit(
      { walletId },
      'Duplicate credit detected (idempotent)',
      { idempotencyKey, existingEntry: existingEntry.id }
    );

    return this.prisma.wallet.findUniqueOrThrow({ where: { id: walletId } });
  }

  // 4. Process new operation with idempotency key
  return this.prisma.$transaction(async (tx) => {
    const lockedWallet = await this.concurrencyLockService.lockWallet(tx, walletId);

    const updatedWallet = await tx.wallet.update({
      where: { id: walletId },
      data: { balance: { increment: amount } }
    });

    // 5. Store idempotency key in ledger entry
    await tx.walletLedgerEntry.create({
      data: {
        walletId,
        amount,
        type: 'credit',
        balanceBefore: lockedWallet.balance,
        balanceAfter: updatedWallet.balance,
        source: options.source,
        reference: options.reference,
        idempotencyKey, // ← Prevents duplicates at DB level
        description: options.description,
      }
    });

    return updatedWallet;
  });
}
```

### Behavior

| Scenario | Behavior |
|----------|----------|
| **First request** | Process normally, store idempotency key in ledger |
| **Duplicate request** | Skip processing, return existing wallet state |
| **Network timeout** | Provider retries → idempotency prevents duplicate credit |
| **User double-click** | Second request sees existing key → no duplicate debit |

### Benefits

✅ **Safe retries**: Providers (MoonPay, Transak) can safely retry failed webhooks  
✅ **Network resilience**: Clients can retry on timeout without risk  
✅ **User protection**: Double-click won't cause double-charge  
✅ **Audit trail**: Idempotency key stored in ledger for debugging  
✅ **No errors**: Duplicate requests return success (graceful degradation)

### Testing Idempotency

```typescript
// Test: Duplicate webhook should return existing wallet state
const webhook1 = await onrampService.processEvent({
  provider: 'moonpay',
  externalId: 'tx_12345',
  userId: 'user_789',
  amount: 100,
  status: 'completed',
});

const walletBefore = await walletService.getBalance('wallet_789');

// Simulate webhook retry
const webhook2 = await onrampService.processEvent({
  provider: 'moonpay',
  externalId: 'tx_12345', // SAME external ID
  userId: 'user_789',
  amount: 100,
  status: 'completed',
});

const walletAfter = await walletService.getBalance('wallet_789');

// Balance unchanged (idempotent)
expect(walletAfter.balance).toBe(walletBefore.balance);

// Ledger has only ONE entry for tx_12345
const ledgerEntries = await prisma.walletLedgerEntry.findMany({
  where: { idempotencyKey: { contains: 'tx_12345' } }
});
expect(ledgerEntries).toHaveLength(1);
```

---

## Concurrency Control

### Problem Statement

Without row-level locking, concurrent operations on the same wallet can cause:

#### Race Condition Example

```
Initial balance: $100

Thread A (Credit $50)          Thread B (Debit $30)
─────────────────────          ─────────────────────
Read balance: $100
                              Read balance: $100
Calculate: $100 + $50 = $150
                              Calculate: $100 - $30 = $70
Write balance: $150
                              Write balance: $70  ← LOST UPDATE!

Expected: $120 ($100 + $50 - $30)
Actual: $70 (credit was lost)
```

**Other Issues**:
- **TOCTOU Bug**: Time-of-check, time-of-use (balance check passes, but changes before debit)
- **Insufficient balance bypass**: Debit allowed because balance check was stale
- **Lost updates**: Last write wins, earlier operations lost

### Solution: Row-Level Locking

Use PostgreSQL's `SELECT ... FOR UPDATE` to lock wallet rows during transactions.

#### How It Works

```sql
BEGIN;

-- Lock the row (other transactions wait)
SELECT * FROM "Wallet" WHERE id = 'wallet_123' FOR UPDATE;

-- Now safe to read balance, check constraints, and update
UPDATE "Wallet" SET balance = balance + 50 WHERE id = 'wallet_123';

COMMIT; -- Lock released
```

**Guarantees**:
- Only ONE transaction can hold the lock at a time
- Other transactions **wait** for lock to be released
- Lock automatically released on commit/rollback
- Prevents lost updates and TOCTOU bugs

### Implementation

#### 1. Concurrency Lock Service

[ConcurrencyLockService](../src/common/concurrency/concurrency-lock.service.ts):

```typescript
@Injectable()
export class ConcurrencyLockService {
  constructor(private prisma: PrismaService) {}

  /**
   * Lock a single wallet row (SELECT FOR UPDATE)
   * Must be called within a transaction
   */
  async lockWallet(
    tx: PrismaTransactionClient,
    walletId: string
  ): Promise<LockedWallet> {
    const result = await tx.$queryRaw<Wallet[]>`
      SELECT * FROM "Wallet"
      WHERE id = ${walletId}
      FOR UPDATE
    `;

    if (result.length === 0) {
      throw new NotFoundException('Wallet not found');
    }

    return result[0];
  }

  /**
   * Lock multiple wallets in sorted order (prevents deadlocks)
   */
  async lockWallets(
    tx: PrismaTransactionClient,
    walletIds: string[]
  ): Promise<LockedWallet[]> {
    // CRITICAL: Sort IDs to prevent deadlocks
    const sortedIds = [...walletIds].sort();

    const result = await tx.$queryRaw<Wallet[]>`
      SELECT * FROM "Wallet"
      WHERE id = ANY(${sortedIds}::text[])
      ORDER BY id ASC
      FOR UPDATE
    `;

    if (result.length !== walletIds.length) {
      throw new NotFoundException('One or more wallets not found');
    }

    return result;
  }

  /**
   * Lock with timeout (prevents indefinite waits)
   */
  async lockWalletWithTimeout(
    tx: PrismaTransactionClient,
    walletId: string,
    timeoutMs: number = 5000
  ): Promise<LockedWallet> {
    // Set lock timeout for this transaction
    await tx.$queryRaw`SET lock_timeout = ${timeoutMs}`;

    try {
      return await this.lockWallet(tx, walletId);
    } catch (error) {
      if (error.code === '55P03') {
        throw new Error(`Lock timeout after ${timeoutMs}ms`);
      }
      throw error;
    } finally {
      // Reset lock timeout
      await tx.$queryRaw`SET lock_timeout = DEFAULT`;
    }
  }
}
```

#### 2. Integration in WalletService

```typescript
async debitWallet(
  walletId: string,
  amount: number,
  options: { source: string; reference: string; userId: string }
) {
  const idempotencyKey = this.idempotencyService.generateKey(
    options.source,
    options.reference,
    walletId,
    'debit'
  );

  const { isNew } = await this.idempotencyService.checkIdempotency(idempotencyKey);
  if (!isNew) {
    return this.prisma.wallet.findUniqueOrThrow({ where: { id: walletId } });
  }

  return this.prisma.$transaction(async (tx) => {
    // 1. LOCK THE WALLET ROW
    const lockedWallet = await this.concurrencyLockService.lockWallet(tx, walletId);

    // 2. Now safe to check balance (no TOCTOU)
    if (lockedWallet.balance < amount) {
      throw new BadRequestException('Insufficient balance');
    }

    // 3. Update balance
    const updatedWallet = await tx.wallet.update({
      where: { id: walletId },
      data: { balance: { decrement: amount } }
    });

    // 4. Record ledger entry
    await tx.walletLedgerEntry.create({
      data: {
        walletId,
        amount,
        type: 'debit',
        balanceBefore: lockedWallet.balance,
        balanceAfter: updatedWallet.balance,
        source: options.source,
        reference: options.reference,
        idempotencyKey,
      }
    });

    return updatedWallet;
  });
}
```

### Deadlock Prevention

When locking **multiple wallets** (e.g., transfers), always lock in **sorted order**.

#### Bad (Can Deadlock):

```typescript
// Transaction A
lockWallet('wallet_B');
lockWallet('wallet_A');

// Transaction B
lockWallet('wallet_A'); // DEADLOCK!
lockWallet('wallet_B');
```

#### Good (No Deadlock):

```typescript
// Transaction A
const sorted = ['wallet_B', 'wallet_A'].sort(); // → ['wallet_A', 'wallet_B']
lockWallets(sorted);

// Transaction B
const sorted = ['wallet_A', 'wallet_B'].sort(); // → ['wallet_A', 'wallet_B']
lockWallets(sorted); // ← Waits for A to release, no deadlock
```

### Benefits

✅ **Prevents race conditions**: Only one operation on a wallet at a time  
✅ **Accurate balance checks**: Balance cannot change between check and update  
✅ **Lost update protection**: Database-level serialization  
✅ **Atomic operations**: Lock + update + ledger entry in one transaction  
✅ **Configurable timeout**: Prevents indefinite waits

### Testing Concurrency

```typescript
// Test: Concurrent debits should not exceed balance
const wallet = await walletService.createWallet({ 
  userId: 'user_123', 
  currency: 'USD' 
});

await walletService.creditWallet(wallet.id, 100, {
  source: 'admin',
  reference: 'initial_credit'
});

// Simulate 10 concurrent $20 debits (total $200, but balance is $100)
const debits = Array.from({ length: 10 }, (_, i) =>
  walletService.debitWallet(wallet.id, 20, {
    source: 'user',
    reference: `concurrent_debit_${i}`,
    userId: 'user_123'
  })
);

try {
  await Promise.all(debits);
  throw new Error('Should have thrown insufficient balance');
} catch (error) {
  expect(error.message).toContain('Insufficient balance');
}

// Final balance should be between $0 and $100 (not negative)
const finalWallet = await walletService.getBalance(wallet.id);
expect(finalWallet.balance).toBeGreaterThanOrEqual(0);
expect(finalWallet.balance).toBeLessThanOrEqual(100);

// Ledger entries should match final balance
const ledgerBalance = await walletLedgerService.calculateBalance(wallet.id);
expect(ledgerBalance).toBe(finalWallet.balance);
```

---

## Ledger Reconciliation

### Problem Statement

Despite idempotency and locking, discrepancies can occur due to:
- **Bug in balance update logic**: Increment/decrement calculation error
- **Manual database edits**: DBA updates wallet.balance directly
- **Migration issues**: Data imported with incorrect balances
- **Ledger corruption**: Entry deleted or modified

**Need**: Tool to detect and optionally fix discrepancies by recalculating balance from ledger.

### Solution: Reconciliation CLI

Command-line tool that:
1. Reads all ledger entries for a wallet (chronologically)
2. Recalculates balance (sum of credits - sum of debits)
3. Compares to `wallet.balance` field
4. Reports discrepancies
5. Optionally fixes with explicit `--fix` flag

### Implementation

[reconcile-balance.ts](../scripts/reconcile-balance.ts):

```typescript
async function calculateBalanceFromLedger(walletId: string): Promise<number> {
  const entries = await prisma.walletLedgerEntry.findMany({
    where: { walletId },
    orderBy: { createdAt: 'asc' }
  });

  let balance = 0;
  for (const entry of entries) {
    if (entry.type === 'credit') {
      balance += entry.amount;
    } else if (entry.type === 'debit') {
      balance -= entry.amount;
    }
  }

  return balance;
}

async function reconcileWallet(walletId: string): Promise<{
  currentBalance: number;
  ledgerBalance: number;
  discrepancy: number;
  status: 'OK' | 'WARN';
}> {
  const wallet = await prisma.wallet.findUniqueOrThrow({ where: { id: walletId } });
  const ledgerBalance = await calculateBalanceFromLedger(walletId);
  const discrepancy = wallet.balance - ledgerBalance;

  return {
    currentBalance: wallet.balance,
    ledgerBalance,
    discrepancy,
    status: Math.abs(discrepancy) < 0.01 ? 'OK' : 'WARN'
  };
}

async function fixWalletBalance(walletId: string, correctBalance: number) {
  await prisma.wallet.update({
    where: { id: walletId },
    data: { balance: correctBalance }
  });

  // Log to audit trail
  await auditLogger.audit(
    { walletId },
    'Balance reconciliation fix applied',
    { oldBalance: wallet.balance, newBalance: correctBalance }
  );
}
```

### Usage

#### 1. Check All Wallets (Read-Only)

```bash
npm run reconcile:balance
```

**Output**:
```
┌──────────────┬─────────────┬────────────┬─────────────┬────────┐
│ Wallet ID    │ Current Bal │ Ledger Bal │ Discrepancy │ Status │
├──────────────┼─────────────┼────────────┼─────────────┼────────┤
│ wallet_abc   │ 1000.00     │ 1000.00    │ 0.00        │ ✓ OK   │
│ wallet_def   │ 500.00      │ 550.00     │ -50.00      │ ✗ WARN │
│ wallet_ghi   │ 2500.00     │ 2500.00    │ 0.00        │ ✓ OK   │
└──────────────┴─────────────┴────────────┴─────────────┴────────┘

Summary: 2 OK, 1 discrepancy found
```

#### 2. Check Specific Wallet

```bash
npm run reconcile:balance wallet_def
```

#### 3. Fix Discrepancies

```bash
npm run reconcile:balance --fix
```

**Interactive confirmation**:
```
Found discrepancy in wallet_def:
  Current balance: $500.00
  Ledger balance:  $550.00
  Discrepancy:     -$50.00

Fix this wallet? (y/n): y
✓ Fixed wallet_def (balance updated to $550.00)
```

#### 4. Automated Fix (No Confirmation)

```bash
npm run reconcile:balance --fix --force
```

**Warning**: Use `--force` only in automated scripts. It skips confirmation prompts.

### Safety Features

1. **Read-only by default**: Must explicitly pass `--fix` to make changes
2. **Interactive confirmation**: Requires user to confirm each fix (unless `--force`)
3. **Integrity validation**: Checks for gaps/anomalies in ledger entries before fixing
4. **Audit logging**: All fixes logged to `AdminAccessLog`
5. **Dry-run support**: Can simulate fixes without applying them

### Integration

#### Cron Job (Recommended)

```bash
# Daily reconciliation check (read-only)
0 2 * * * cd /app && npm run reconcile:balance >> /var/log/reconcile.log 2>&1

# Weekly fix (manual approval)
# Run manually after reviewing logs
```

#### Monitoring Alert

```typescript
// In background reconciliation job
const result = await reconcileAllWallets();

if (result.discrepancyCount > 0) {
  alertService.createAlert({
    type: 'BALANCE_MISMATCH',
    severity: 'HIGH',
    message: `${result.discrepancyCount} wallets need reconciliation`,
    metadata: { walletIds: result.discrepantWalletIds }
  });
}
```

---

## Best Practices

### 1. Always Use Idempotency Keys

```typescript
// ✓ Good: Idempotency key from source
await walletService.creditWallet(walletId, 100, {
  source: 'webhook',
  reference: `moonpay_${externalId}`,
});

// ✗ Bad: No idempotency (duplicate risk)
await prisma.wallet.update({
  where: { id: walletId },
  data: { balance: { increment: 100 } }
});
```

### 2. Always Lock Before Balance Checks

```typescript
// ✓ Good: Lock then check
await prisma.$transaction(async (tx) => {
  const lockedWallet = await concurrencyService.lockWallet(tx, walletId);
  if (lockedWallet.balance < amount) {
    throw new Error('Insufficient balance');
  }
  await tx.wallet.update({ ... });
});

// ✗ Bad: Check then lock (TOCTOU bug)
const wallet = await prisma.wallet.findUnique({ where: { id: walletId } });
if (wallet.balance < amount) {
  throw new Error('Insufficient balance');
}
await prisma.$transaction(async (tx) => {
  // Balance could have changed!
  await tx.wallet.update({ ... });
});
```

### 3. Run Reconciliation Regularly

```bash
# Development: After every migration
npm run migrate:dev && npm run reconcile:balance

# Staging: Daily automated check
npm run reconcile:balance

# Production: Weekly manual review
npm run reconcile:balance | tee reconcile-$(date +%Y%m%d).log
```

### 4. Monitor Idempotency Hits

```typescript
// Track duplicate requests (normal behavior, but good to monitor)
if (!isNew) {
  metricsService.increment('wallet.idempotency.hit', {
    source: options.source,
    action: 'credit'
  });
}
```

### 5. Set Appropriate Lock Timeouts

```typescript
// Short timeout for user-facing operations
await concurrencyService.lockWalletWithTimeout(tx, walletId, 2000); // 2s

// Longer timeout for background jobs
await concurrencyService.lockWalletWithTimeout(tx, walletId, 10000); // 10s
```

---

## Troubleshooting

### Issue: "Lock timeout" errors

**Cause**: High concurrency or long-running transactions holding locks

**Solutions**:
1. Increase lock timeout: `lockWalletWithTimeout(tx, id, 10000)`
2. Reduce transaction duration: Move non-critical work outside transaction
3. Check for deadlocks: Review PostgreSQL logs
4. Implement retry logic: Retry failed operations with exponential backoff

### Issue: Idempotency key collision

**Cause**: Same reference used for different operations

**Example**:
```typescript
// Bad: Same reference for credit and debit
creditWallet(wallet, 100, { source: 'user', reference: 'tx_123' });
debitWallet(wallet, 50, { source: 'user', reference: 'tx_123' }); // ← Collision!
```

**Solution**: Include action in reference or use separate reference IDs

### Issue: Reconciliation shows discrepancy

**Root causes**:
1. **Direct database update**: Someone updated `wallet.balance` without ledger entry
2. **Bug in balance logic**: Increment/decrement calculation error
3. **Ledger entry deleted**: Entry removed from `WalletLedgerEntry`
4. **Race condition**: Balance update logic had concurrency bug (pre-locking)

**Diagnosis**:
```bash
# 1. Check ledger entries
npm run reconcile:balance wallet_abc

# 2. Review audit logs
SELECT * FROM "AdminAccessLog" WHERE "walletId" = 'wallet_abc' ORDER BY "timestamp" DESC;

# 3. Check for manual updates
SELECT * FROM "WalletLedgerEntry" WHERE "source" = 'admin' AND "walletId" = 'wallet_abc';

# 4. Fix balance
npm run reconcile:balance wallet_abc --fix
```

---

## Summary

| Feature | Purpose | Benefit |
|---------|---------|---------|
| **Idempotency Keys** | Prevent duplicate operations | Safe retries, network resilience |
| **Concurrency Locks** | Prevent race conditions | Accurate balances, no lost updates |
| **Ledger Reconciliation** | Detect/fix discrepancies | Operational safety net |

**Together**, these features provide:
- ✅ **Data integrity**: Balances always correct
- ✅ **Operational safety**: Tools to detect/fix issues
- ✅ **Audit trail**: Every operation tracked
- ✅ **resilience**: Safe to retry, concurrent operations protected

---

## Related Documentation

- [Architecture](./ARCHITECTURE.md) – System overview
- [Production Readiness](./PRODUCTION_READINESS.md) – Deployment checklist
- [Monitoring](./MONITORING.md) – Observability and alerting
- [API Reference](./API_REFERENCE.md) – Endpoint documentation
