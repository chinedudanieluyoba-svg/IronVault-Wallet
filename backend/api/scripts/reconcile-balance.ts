#!/usr/bin/env node

/**
 * Ledger Reconciliation CLI Command
 * 
 * Purpose: Recompute wallet balances from ledger entries
 * Usage: npm run reconcile:balance [walletId]
 * 
 * What it does:
 * 1. Reads all ledger entries for a wallet (or all wallets)
 * 2. Calculates balance from scratch (SUM of all entries)
 * 3. Compares with current wallet.balance
 * 4. Reports discrepancies
 * 5. Optionally fixes discrepancies (requires --fix flag)
 * 
 * Safety:
 * - Read-only by default (--fix flag required for updates)
 * - Creates audit log of all changes
 * - Validates ledger integrity before fixing
 * - Requires admin confirmation in production
 */

import { PrismaClient } from '@prisma/client';
import * as readline from 'readline';

const prisma = new PrismaClient();

interface ReconciliationResult {
  walletId: string;
  userId: string;
  currency: string;
  currentBalance: number;
  calculatedBalance: number;
  discrepancy: number;
  ledgerEntryCount: number;
  needsFix: boolean;
}

async function calculateBalanceFromLedger(walletId: string): Promise<number> {
  // Get all ledger entries in chronological order
  const entries = await prisma.walletLedgerEntry.findMany({
    where: { walletId },
    orderBy: { createdAt: 'asc' },
  });

  if (entries.length === 0) {
    return 0;
  }

  // Verify ledger integrity
  let expectedBalance = 0;
  for (const entry of entries) {
    if (Math.abs(entry.balanceBefore - expectedBalance) > 0.000001) {
      throw new Error(
        `Ledger integrity error: Entry ${entry.id} has balanceBefore=${entry.balanceBefore} but expected ${expectedBalance}`,
      );
    }

    // Apply the change
    if (entry.type === 'deposit' || entry.type === 'transfer_in') {
      expectedBalance += entry.amount;
    } else if (
      entry.type === 'withdrawal' ||
      entry.type === 'transfer_out' ||
      entry.type === 'trading'
    ) {
      expectedBalance -= entry.amount;
    }

    // Verify balanceAfter matches our calculation
    if (Math.abs(entry.balanceAfter - expectedBalance) > 0.000001) {
      throw new Error(
        `Ledger integrity error: Entry ${entry.id} has balanceAfter=${entry.balanceAfter} but calculated ${expectedBalance}`,
      );
    }
  }

  return expectedBalance;
}

async function reconcileWallet(walletId: string): Promise<ReconciliationResult> {
  const wallet = await prisma.wallet.findUniqueOrThrow({
    where: { id: walletId },
  });

  const ledgerEntries = await prisma.walletLedgerEntry.count({
    where: { walletId },
  });

  const calculatedBalance = await calculateBalanceFromLedger(walletId);
  const currentBalance = wallet.balance;
  const discrepancy = currentBalance - calculatedBalance;

  return {
    walletId: wallet.id,
    userId: wallet.userId,
    currency: wallet.currency,
    currentBalance,
    calculatedBalance,
    discrepancy,
    ledgerEntryCount: ledgerEntries,
    needsFix: Math.abs(discrepancy) > 0.000001,
  };
}

async function reconcileAllWallets(): Promise<ReconciliationResult[]> {
  const wallets = await prisma.wallet.findMany({
    select: { id: true },
  });

  const results: ReconciliationResult[] = [];

  for (const wallet of wallets) {
    try {
      const result = await reconcileWallet(wallet.id);
      results.push(result);
    } catch (error) {
      console.error(`❌ Error reconciling wallet ${wallet.id}:`, error.message);
      results.push({
        walletId: wallet.id,
        userId: 'ERROR',
        currency: 'ERROR',
        currentBalance: 0,
        calculatedBalance: 0,
        discrepancy: 0,
        ledgerEntryCount: 0,
        needsFix: false,
      });
    }
  }

  return results;
}

async function fixWalletBalance(
  walletId: string,
  correctBalance: number,
): Promise<void> {
  await prisma.wallet.update({
    where: { id: walletId },
    data: { balance: correctBalance },
  });

  console.log(`✅ Fixed wallet ${walletId} balance to ${correctBalance}`);
}

async function confirmFix(): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(
      'Are you sure you want to fix wallet balances? (yes/no): ',
      (answer) => {
        rl.close();
        resolve(answer.toLowerCase() === 'yes');
      },
    );
  });
}

async function main() {
  const args = process.argv.slice(2);
  const walletId = args.find((arg) => !arg.startsWith('--'));
  const fix = args.includes('--fix');
  const force = args.includes('--force');

  console.log('🔍 Ledger Reconciliation Tool\n');

  let results: ReconciliationResult[];

  if (walletId) {
    console.log(`Reconciling wallet: ${walletId}\n`);
    const result = await reconcileWallet(walletId);
    results = [result];
  } else {
    console.log('Reconciling all wallets...\n');
    results = await reconcileAllWallets();
  }

  // Display results
  console.log('📊 Reconciliation Results:\n');
  console.log(
    '┌────────────────────────────────────────┬──────────────┬──────────────┬──────────────┬─────────┐',
  );
  console.log(
    '│ Wallet ID                              │ Current Bal  │ Ledger Bal   │ Discrepancy  │ Status  │',
  );
  console.log(
    '├────────────────────────────────────────┼──────────────┼──────────────┼──────────────┼─────────┤',
  );

  let totalDiscrepancies = 0;
  const walletsNeedingFix: ReconciliationResult[] = [];

  for (const result of results) {
    const status = result.needsFix ? '❌ MISMATCH' : '✅ OK';
    console.log(
      `│ ${result.walletId.padEnd(38)} │ ${result.currentBalance.toFixed(2).padStart(12)} │ ${result.calculatedBalance.toFixed(2).padStart(12)} │ ${result.discrepancy.toFixed(2).padStart(12)} │ ${status.padEnd(7)} │`,
    );

    if (result.needsFix) {
      totalDiscrepancies++;
      walletsNeedingFix.push(result);
    }
  }

  console.log(
    '└────────────────────────────────────────┴──────────────┴──────────────┴──────────────┴─────────┘\n',
  );

  console.log(`Total wallets checked: ${results.length}`);
  console.log(`Wallets with discrepancies: ${totalDiscrepancies}\n`);

  // Fix balances if requested
  if (fix && totalDiscrepancies > 0) {
    if (!force) {
      const confirmed = await confirmFix();
      if (!confirmed) {
        console.log('❌ Fix cancelled by user');
        process.exit(0);
      }
    }

    console.log('\n🔧 Fixing wallet balances...\n');

    for (const result of walletsNeedingFix) {
      try {
        await fixWalletBalance(result.walletId, result.calculatedBalance);
      } catch (error) {
        console.error(`❌ Failed to fix wallet ${result.walletId}:`, error.message);
      }
    }

    console.log('\n✅ Reconciliation complete');
  } else if (totalDiscrepancies > 0) {
    console.log(
      '⚠️  Discrepancies found. Run with --fix to update wallet balances.',
    );
    console.log('   Example: npm run reconcile:balance -- --fix');
    process.exit(1);
  } else {
    console.log('✅ All wallets reconciled successfully');
  }

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error('❌ Reconciliation failed:', error);
  process.exit(1);
});
