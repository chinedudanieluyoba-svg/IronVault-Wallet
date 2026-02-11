import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface WalletAuditView {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
  ledgerCount: number;
  lastTransactionAt?: Date;
}

export interface LedgerAuditView {
  id: string;
  walletId: string;
  direction: 'credit' | 'debit';
  type: string;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  reason: string;
  source: string | null;
  providerEventId: string | null;
  reference: string | null;
  timestamp: Date;
}

export interface WebhookAuditView {
  id: string;
  provider: string;
  eventId: string;
  status: string; // 'pending' | 'processed' | 'ignored' | 'failed' | 'error'
  transactionId: string | null;
  payloadHash: string; // Hash only, NOT raw payload
  errorMessage: string | null;
  receivedAt: Date;
  processedAt: Date | null;
}

export interface AdminCreditResult {
  walletId: string;
  amount: number;
  reason: string;
  adminId: string;
  balanceBefore: number;
  balanceAfter: number;
  ledgerEntryId: string;
  timestamp: Date;
}

export interface LedgerIntegrityView {
  walletId: string;
  userId: string;
  walletBalance: number;
  ledgerBalance: number;
  lastLedgerBalance: number;
  lastLedgerAt: Date | null;
  delta: number;
  isConsistent: boolean;
  lastLedgerConsistent: boolean;
}

/**
 * Admin wallet inspection (read-only)
 * All queries require @Roles(Role.ADMIN) and JwtAuthGuard
 */
@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  private readonly balanceEpsilon = 0.000001;

  async getAllWallets(
    limit: number = 100,
    offset: number = 0,
  ): Promise<{ wallets: WalletAuditView[]; total: number }> {
    const wallets = await this.prisma.wallet.findMany({
      take: limit,
      skip: offset,
      include: {
        ledger: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    const total = await this.prisma.wallet.count();

    const auditView: WalletAuditView[] = await Promise.all(
      wallets.map(async (w) => {
        const ledgerCount = await this.prisma.walletLedgerEntry.count({
          where: { walletId: w.id },
        });
        return {
          id: w.id,
          userId: w.userId,
          balance: w.balance,
          currency: w.currency,
          createdAt: w.createdAt,
          updatedAt: w.updatedAt,
          ledgerCount,
          lastTransactionAt: w.ledger[0]?.createdAt,
        };
      }),
    );

    return { wallets: auditView, total };
  }

  async getWalletDetails(
    walletId: string,
    limit: number = 50,
    offset: number = 0,
  ): Promise<{
    wallet: WalletAuditView;
    ledger: Array<{
      id: string;
      type: string;
      amount: number;
      balanceBefore: number;
      balanceAfter: number;
      reference?: string | null;
      description?: string | null;
      createdAt: Date;
    }>;
    total: number;
  }> {
    const wallet = await this.prisma.wallet.findUniqueOrThrow({
      where: { id: walletId },
      include: {
        ledger: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    const [ledger, total, ledgerCount] = await Promise.all([
      this.prisma.walletLedgerEntry.findMany({
        where: { walletId },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      this.prisma.walletLedgerEntry.count({
        where: { walletId },
      }),
      this.prisma.walletLedgerEntry.count({
        where: { walletId },
      }),
    ]);

    return {
      wallet: {
        id: wallet.id,
        userId: wallet.userId,
        balance: wallet.balance,
        currency: wallet.currency,
        createdAt: wallet.createdAt,
        updatedAt: wallet.updatedAt,
        ledgerCount,
        lastTransactionAt: wallet.ledger[0]?.createdAt,
      },
      ledger: ledger.map((entry) => ({
        id: entry.id,
        type: entry.type,
        amount: entry.amount,
        balanceBefore: entry.balanceBefore,
        balanceAfter: entry.balanceAfter,
        reference: entry.reference,
        description: entry.description,
        createdAt: entry.createdAt,
      })),
      total,
    };
  }

  async getWalletsByUserId(
    userId: string,
    limit: number = 100,
    offset: number = 0,
  ): Promise<{ wallets: WalletAuditView[]; total: number }> {
    const wallets = await this.prisma.wallet.findMany({
      where: { userId },
      take: limit,
      skip: offset,
      include: {
        ledger: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    const total = await this.prisma.wallet.count({ where: { userId } });

    const auditView: WalletAuditView[] = await Promise.all(
      wallets.map(async (w) => {
        const ledgerCount = await this.prisma.walletLedgerEntry.count({
          where: { walletId: w.id },
        });
        return {
          id: w.id,
          userId: w.userId,
          balance: w.balance,
          currency: w.currency,
          createdAt: w.createdAt,
          updatedAt: w.updatedAt,
          ledgerCount,
          lastTransactionAt: w.ledger[0]?.createdAt,
        };
      }),
    );

    return { wallets: auditView, total };
  }

  /**
   * Get all ledger entries (append-only audit trail)
   * NEVER editable, NEVER deletable
   */
  async getAllLedgerEntries(
    limit: number = 100,
    offset: number = 0,
    filters?: {
      walletId?: string;
      source?: string;
      startDate?: Date;
      endDate?: Date;
    },
  ): Promise<{ entries: LedgerAuditView[]; total: number }> {
    const where: any = {};

    if (filters?.walletId) where.walletId = filters.walletId;
    if (filters?.source) where.source = filters.source;

    if (filters?.startDate || filters?.endDate) {
      where.createdAt = {};
      if (filters.startDate) where.createdAt.gte = filters.startDate;
      if (filters.endDate) where.createdAt.lte = filters.endDate;
    }

    const [entries, total] = await Promise.all([
      this.prisma.walletLedgerEntry.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      this.prisma.walletLedgerEntry.count({ where }),
    ]);

    return {
      entries: entries.map((e) => this.mapLedgerEntry(e)),
      total,
    };
  }

  /**
   * Get ledger entries for specific wallet
   */
  async getLedgerEntriesByWallet(
    walletId: string,
    limit: number = 100,
    offset: number = 0,
  ): Promise<{ entries: LedgerAuditView[]; total: number }> {
    const [entries, total] = await Promise.all([
      this.prisma.walletLedgerEntry.findMany({
        where: { walletId },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      this.prisma.walletLedgerEntry.count({ where: { walletId } }),
    ]);

    return {
      entries: entries.map((e) => this.mapLedgerEntry(e)),
      total,
    };
  }

  /**
   * Get ledger entries for specific transaction
   */
  async getLedgerEntriesByTransaction(
    txId: string,
    limit: number = 100,
    offset: number = 0,
  ): Promise<{ entries: LedgerAuditView[]; total: number }> {
    const [entries, total] = await Promise.all([
      this.prisma.walletLedgerEntry.findMany({
        where: { reference: txId },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      this.prisma.walletLedgerEntry.count({ where: { reference: txId } }),
    ]);

    return {
      entries: entries.map((e) => this.mapLedgerEntry(e)),
      total,
    };
  }

  /**
   * Map ledger entry to audit view
   * Determines direction (credit/debit) based on type
   */
  private mapLedgerEntry(entry: any): LedgerAuditView {
    // Determine direction based on balance change
    const direction: 'credit' | 'debit' =
      entry.balanceAfter > entry.balanceBefore ? 'credit' : 'debit';

    // Use description as reason, or type if not available
    const reason = entry.description || entry.type;

    return {
      id: entry.id,
      walletId: entry.walletId,
      direction,
      type: entry.type,
      amount: entry.amount,
      balanceBefore: entry.balanceBefore,
      balanceAfter: entry.balanceAfter,
      reason,
      source: entry.source,
      providerEventId: entry.providerEventId,
      reference: entry.reference,
      timestamp: entry.createdAt,
    };
  }

  /**
   * Get all webhook events (provider disputes, chargebacks, audits)
   */
  async getAllWebhookEvents(
    limit: number = 100,
    offset: number = 0,
    filters?: {
      provider?: string;
      status?: string;
      startDate?: Date;
      endDate?: Date;
    },
  ): Promise<{ events: WebhookAuditView[]; total: number }> {
    const where: any = {};

    if (filters?.provider) where.provider = filters.provider;
    if (filters?.status) where.status = filters.status;

    if (filters?.startDate || filters?.endDate) {
      where.receivedAt = {};
      if (filters.startDate) where.receivedAt.gte = filters.startDate;
      if (filters.endDate) where.receivedAt.lte = filters.endDate;
    }

    const [events, total] = await Promise.all([
      this.prisma.webhookEvent.findMany({
        where,
        orderBy: { receivedAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      this.prisma.webhookEvent.count({ where }),
    ]);

    return {
      events: events.map((e) => this.mapWebhookEvent(e)),
      total,
    };
  }

  /**
   * Get specific webhook event details
   */
  async getWebhookEvent(eventId: string): Promise<WebhookAuditView> {
    const event = await this.prisma.webhookEvent.findUniqueOrThrow({
      where: { id: eventId },
    });

    return this.mapWebhookEvent(event);
  }

  /**
   * Map webhook event to audit view
   * Never includes raw payload, only hash
   */
  private mapWebhookEvent(event: any): WebhookAuditView {
    return {
      id: event.id,
      provider: event.provider,
      eventId: event.externalId,
      status: event.status,
      transactionId: event.transactionId,
      payloadHash: event.payloadHash,
      errorMessage: event.errorMessage,
      receivedAt: event.receivedAt,
      processedAt: event.processedAt,
    };
  }

  /**
   * Manual credit (EMERGENCY ONLY)
   * Requires admin role + mandatory reason for audit trail
   * Logged as source='admin' with adminId in ledger
   */
  async manualCredit(
    walletId: string,
    amount: number,
    reason: string,
    adminId: string,
  ): Promise<AdminCreditResult> {
    if (amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }

    if (!reason || reason.length < 10) {
      throw new Error('Reason must be at least 10 characters');
    }

    return await this.prisma.$transaction(async (tx) => {
      // Get current wallet state
      const wallet = await tx.wallet.findUniqueOrThrow({
        where: { id: walletId },
      });

      const balanceBefore = wallet.balance;

      // Update balance
      const updated = await tx.wallet.update({
        where: { id: walletId },
        data: {
          balance: {
            increment: amount,
          },
        },
      });

      const balanceAfter = updated.balance;

      // Record ledger entry (immutable) - includes adminId in description
      const ledgerEntry = await tx.walletLedgerEntry.create({
        data: {
          walletId,
          type: 'deposit',
          amount,
          balanceBefore,
          balanceAfter,
          reference: `admin_credit_${adminId}_${Date.now()}`,
          description: `Admin credit: ${reason} (by ${adminId})`,
          source: 'admin',
          providerEventId: null,
        },
      });

      return {
        walletId,
        amount,
        reason,
        adminId,
        balanceBefore,
        balanceAfter,
        ledgerEntryId: ledgerEntry.id,
        timestamp: new Date(),
      };
    });
  }

  /**
   * Ledger integrity check for a single wallet
   * Ensures wallet balance equals ledger totals and latest ledger balance
   */
  async getLedgerIntegrity(walletId: string): Promise<LedgerIntegrityView> {
    const wallet = await this.prisma.wallet.findUniqueOrThrow({
      where: { id: walletId },
    });

    return this.buildLedgerIntegrity(wallet);
  }

  /**
   * Ledger integrity check for many wallets (paginated)
   */
  async getLedgerIntegrityAll(
    limit: number = 100,
    offset: number = 0,
  ): Promise<{
    results: LedgerIntegrityView[];
    total: number;
    mismatches: number;
  }> {
    const [wallets, total] = await Promise.all([
      this.prisma.wallet.findMany({
        take: limit,
        skip: offset,
      }),
      this.prisma.wallet.count(),
    ]);

    const results = await Promise.all(
      wallets.map((wallet) => this.buildLedgerIntegrity(wallet)),
    );
    const mismatches = results.filter((result) => !result.isConsistent).length;

    return { results, total, mismatches };
  }

  private balancesMatch(a: number, b: number): boolean {
    return Math.abs(a - b) <= this.balanceEpsilon;
  }

  private async buildLedgerIntegrity(wallet: {
    id: string;
    userId: string;
    balance: number;
  }): Promise<LedgerIntegrityView> {
    const walletId = wallet.id;
    const [latestEntry, creditsAgg, debitsAgg] = await Promise.all([
      this.prisma.walletLedgerEntry.findFirst({
        where: { walletId },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.walletLedgerEntry.aggregate({
        where: {
          walletId,
          type: { in: ['deposit', 'transfer_in'] },
        },
        _sum: { amount: true },
      }),
      this.prisma.walletLedgerEntry.aggregate({
        where: {
          walletId,
          type: { in: ['withdrawal', 'transfer_out', 'trading'] },
        },
        _sum: { amount: true },
      }),
    ]);

    const totalCredits = creditsAgg._sum.amount ?? 0;
    const totalDebits = debitsAgg._sum.amount ?? 0;
    const ledgerBalance = totalCredits - totalDebits;

    const lastLedgerBalance = latestEntry?.balanceAfter ?? 0;
    const lastLedgerAt = latestEntry?.createdAt ?? null;

    const consistentWithLedger = this.balancesMatch(
      wallet.balance,
      ledgerBalance,
    );
    const consistentWithLast = latestEntry
      ? this.balancesMatch(wallet.balance, lastLedgerBalance)
      : true;

    return {
      walletId,
      userId: wallet.userId,
      walletBalance: wallet.balance,
      ledgerBalance,
      lastLedgerBalance,
      lastLedgerAt,
      delta: wallet.balance - ledgerBalance,
      isConsistent: consistentWithLedger && consistentWithLast,
      lastLedgerConsistent: consistentWithLast,
    };
  }

  /**
   * Flag wallets with ledger mismatches
   * Called by scheduled reconciliation job
   */
  async flagInconsistentWallets(
    integrityResults: LedgerIntegrityView[],
  ): Promise<number> {
    const inconsistent = integrityResults.filter((r) => !r.isConsistent);

    if (inconsistent.length === 0) {
      return 0;
    }

    // Flag all inconsistent wallets in a single transaction
    await this.prisma.$transaction(
      inconsistent.map((result) =>
        this.prisma.wallet.update({
          where: { id: result.walletId },
          data: {
            flaggedForReview: true,
            flaggedReason: 'ledger_mismatch',
            flaggedAt: new Date(),
            flaggedDelta: result.delta,
          },
        }),
      ),
    );

    return inconsistent.length;
  }

  /**
   * Get all flagged wallets
   */
  async getFlaggedWallets(
    limit: number = 100,
    offset: number = 0,
  ): Promise<{ wallets: any[]; total: number }> {
    const [wallets, total] = await Promise.all([
      this.prisma.wallet.findMany({
        where: { flaggedForReview: true },
        take: limit,
        skip: offset,
        orderBy: { flaggedAt: 'desc' },
      }),
      this.prisma.wallet.count({ where: { flaggedForReview: true } }),
    ]);

    return { wallets, total };
  }

  /**
   * Clear flag from a wallet (after manual review)
   */
  async clearWalletFlag(walletId: string, adminId: string): Promise<void> {
    await this.prisma.wallet.update({
      where: { id: walletId },
      data: {
        flaggedForReview: false,
        flaggedReason: null,
        flaggedAt: null,
        flaggedDelta: null,
      },
    });
  }
}
