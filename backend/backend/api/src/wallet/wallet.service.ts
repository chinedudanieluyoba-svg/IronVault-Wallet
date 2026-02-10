import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WalletLedgerService } from './services/wallet-ledger.service';
import { AuditLogger } from '../common/logging/audit.logger';
import { RequestIdStorage } from '../common/logging/request-id.storage';
import { MetricsService } from '../common/metrics/metrics.service';
import { IdempotencyService } from '../common/idempotency/idempotency.service';
import { ConcurrencyLockService } from '../common/concurrency/concurrency-lock.service';
import {
  Wallet,
  CreateWalletInput,
  CreditWalletInput,
  DebitWalletInput,
  WalletResponse,
} from './types/wallet.types';

/**
 * Wallet Service
 * Manages wallet creation, balance, and ledger-tracked transactions
 * All balance changes are recorded immutably in ledger
 */
@Injectable()
export class WalletService {
  constructor(
    private prisma: PrismaService,
    private ledgerService: WalletLedgerService,
    private auditLogger: AuditLogger,
    private requestIdStorage: RequestIdStorage,
    private metricsService: MetricsService,
    private idempotencyService: IdempotencyService,
    private concurrencyLockService: ConcurrencyLockService,
  ) {}

  private readonly balanceEpsilon = 0.000001;

  /**
   * Create wallet for user
   */
  async createWallet(input: CreateWalletInput): Promise<WalletResponse> {
    const requestId = this.requestIdStorage.getRequestId();

    // Check if user already has wallet
    const existing = await this.prisma.wallet.findFirst({
      where: { userId: input.userId },
    });

    if (existing) {
      this.auditLogger.warn(
        { requestId, userId: input.userId },
        'Wallet creation attempted but user already has wallet',
        { currency: input.currency },
      );
      throw new BadRequestException(
        `User ${input.userId} already has a wallet`,
      );
    }

    const wallet = await this.prisma.wallet.create({
      data: {
        userId: input.userId,
        currency: input.currency,
        balance: 0,
      },
    });

    // Log audit event
    this.auditLogger.audit(
      { requestId, userId: input.userId, walletId: wallet.id },
      'Wallet created',
      { currency: wallet.currency, initialBalance: wallet.balance },
    );

    return this.mapToResponse(wallet);
  }

  /**
   * Get wallet by ID
   */
  async getWallet(walletId: string): Promise<WalletResponse> {
    const wallet = await this.prisma.wallet.findUnique({
      where: { id: walletId },
    });

    if (!wallet) {
      throw new NotFoundException(`Wallet ${walletId} not found`);
    }

    await this.assertLedgerMatchesBalance(wallet.id, wallet.balance);

    return this.mapToResponse(wallet);
  }

  /**
   * Get wallet by user ID
   */
  async getWalletByUserId(userId: string): Promise<WalletResponse> {
    const wallet = await this.prisma.wallet.findUnique({
      where: { userId },
    });

    if (!wallet) {
      throw new NotFoundException(`Wallet for user ${userId} not found`);
    }

    await this.assertLedgerMatchesBalance(wallet.id, wallet.balance);

    return this.mapToResponse(wallet);
  }

  /**
   * Get current balance (redundant read from Wallet table, but fast)
   */
  async getBalance(walletId: string): Promise<number> {
    const wallet = await this.getWallet(walletId);
    return wallet.balance;
  }

  /**
   * Credit wallet (internal - onramp deposits, transfers)
   * Atomically:
   * 1. Verify wallet exists
   * 2. Update balance
   * 3. Record ledger entry
   */
  async creditWallet(input: CreditWalletInput): Promise<WalletResponse> {
    const requestId = this.requestIdStorage.getRequestId();

    // Generate idempotency key
    let idempotencyKey: string | undefined;
    if (input.source === 'webhook' && input.providerEventId) {
      idempotencyKey = this.idempotencyService.generateWebhookKey(
        'provider', // Provider name from input if available
        input.providerEventId,
        input.walletId,
      );
    } else if (input.reference) {
      idempotencyKey = this.idempotencyService.generateKey(
        input.source || 'system',
        input.reference,
        input.walletId,
        'credit',
      );
    }

    // Check idempotency
    if (idempotencyKey) {
      const idempotencyResult =
        await this.idempotencyService.checkIdempotency(idempotencyKey);
      if (!idempotencyResult.isNew) {
        this.auditLogger.info(
          { requestId, walletId: input.walletId },
          'Duplicate credit detected (idempotent)',
          { idempotencyKey, reference: input.reference },
        );
        // Return existing wallet state (idempotent)
        const wallet = await this.prisma.wallet.findUniqueOrThrow({
          where: { id: input.walletId },
        });
        return this.mapToResponse(wallet);
      }
    }

    if (input.source === 'admin' && input.actorRole !== 'ADMIN') {
      this.auditLogger.warn(
        { requestId, userId: input.actorUserId, walletId: input.walletId },
        'Credit blocked: non-admin attempted admin credit',
        { source: input.source },
      );
      throw new ForbiddenException(
        'Credits are allowed only from admin actions',
      );
    }

    if (input.source === 'webhook') {
      if (!input.verifiedWebhook || !input.providerEventId) {
        this.auditLogger.warn(
          { requestId, walletId: input.walletId },
          'Credit blocked: webhook not verified',
          { source: input.source },
        );
        throw new ForbiddenException(
          'Credits are allowed only from verified webhook events',
        );
      }
    }

    if (input.source !== 'admin' && input.source !== 'webhook') {
      this.auditLogger.warn(
        { requestId, walletId: input.walletId },
        'Credit blocked: invalid source',
        { source: input.source },
      );
      throw new ForbiddenException('Invalid credit source');
    }

    if (input.amount <= 0) {
      throw new BadRequestException('Amount must be greater than 0');
    }

    return await this.prisma.$transaction(async (tx) => {
      // Lock wallet row to prevent race conditions
      const wallet = await this.concurrencyLockService.lockWallet(
        tx,
        input.walletId,
      );

      const balanceBefore = wallet.balance;

      // Update balance
      const updated = await tx.wallet.update({
        where: { id: input.walletId },
        data: {
          balance: {
            increment: input.amount,
          },
        },
      });

      const balanceAfter = updated.balance;

      // Record ledger entry (immutable)
      await tx.walletLedgerEntry.create({
        data: {
          walletId: input.walletId,
          type: input.type,
          idempotencyKey,
          amount: input.amount,
          balanceBefore,
          balanceAfter,
          reference: input.reference,
          description: input.description,
          source: input.source,
          providerEventId: input.providerEventId,
        },
      });

      // Log audit event
      this.auditLogger.audit(
        { requestId, userId: wallet.userId, walletId: input.walletId },
        `Wallet credited (${input.type})`,
        {
          amount: input.amount,
          currency: wallet.currency,
          balanceBefore,
          balanceAfter,
          reference: input.reference,
        },
      );

      // Track metric
      this.metricsService.trackWalletCredit({
        walletId: input.walletId,
        userId: wallet.userId,
        amount: input.amount,
        currency: wallet.currency,
        balanceBefore,
        balanceAfter,
        success: true,
        durationMs: 0, // Transaction already complete
      });

      return this.mapToResponse(updated);
    });
  }

  /**
   * Debit wallet (internal - withdrawals, trading)
   * Atomically:
   * 1. Verify wallet exists
   * 2. Check sufficient balance
   * 3. Update balance
   * 4. Record ledger entry
   */
  async debitWallet(input: DebitWalletInput): Promise<WalletResponse> {
    const requestId = this.requestIdStorage.getRequestId();

    // Generate idempotency key
    let idempotencyKey: string | undefined;
    if (input.reference) {
      idempotencyKey = this.idempotencyService.generateKey(
        input.source || 'user',
        input.reference,
        input.walletId,
        'debit',
      );
    }

    // Check idempotency
    if (idempotencyKey) {
      const idempotencyResult =
        await this.idempotencyService.checkIdempotency(idempotencyKey);
      if (!idempotencyResult.isNew) {
        this.auditLogger.info(
          { requestId, userId: input.userId, walletId: input.walletId },
          'Duplicate debit detected (idempotent)',
          { idempotencyKey, reference: input.reference },
        );
        // Return existing wallet state (idempotent)
        const wallet = await this.prisma.wallet.findUniqueOrThrow({
          where: { id: input.walletId },
        });
        return this.mapToResponse(wallet);
      }
    }

    if (input.source !== 'user') {
      this.auditLogger.warn(
        { requestId, userId: input.userId, walletId: input.walletId },
        'Debit blocked: invalid source',
        { source: input.source },
      );
      throw new ForbiddenException('Debits are allowed only from user actions');
    }

    if (input.amount <= 0) {
      throw new BadRequestException('Amount must be greater than 0');
    }

    return await this.prisma.$transaction(async (tx) => {
      // Lock wallet row to prevent race conditions
      const wallet = await this.concurrencyLockService.lockWallet(
        tx,
        input.walletId,
      );

      if (wallet.userId !== input.userId) {
        this.auditLogger.warn(
          { requestId, userId: input.userId, walletId: input.walletId },
          'Debit blocked: user does not own wallet',
        );
        throw new ForbiddenException('You can only debit your own wallet');
      }

      const balanceBefore = wallet.balance;

      // Verify sufficient balance
      if (balanceBefore < input.amount) {
        this.auditLogger.warn(
          { requestId, userId: wallet.userId, walletId: input.walletId },
          'Insufficient balance for debit',
          {
            amount: input.amount,
            currency: wallet.currency,
            availableBalance: balanceBefore,
          },
        );
        throw new BadRequestException(
          `Insufficient balance. Have: ${balanceBefore}, Need: ${input.amount}`,
        );
      }

      // Update balance
      const updated = await tx.wallet.update({
        where: { id: input.walletId },
        data: {
          balance: {
            decrement: input.amount,
          },
        },
      });

      const balanceAfter = updated.balance;

      // Record ledger entry (immutable)
      await tx.walletLedgerEntry.create({
        data: {
          walletId: input.walletId,
          type: input.type,
          amount: input.amount,
          balanceBefore,
          balanceAfter,
          reference: input.reference,
          description: input.description,
          source: input.source,
        },
      });

      // Log audit event
      this.auditLogger.audit(
        { requestId, userId: wallet.userId, walletId: input.walletId },
        `Wallet debited (${input.type})`,
        {
          amount: input.amount,
          currency: wallet.currency,
          balanceBefore,
          balanceAfter,
          reference: input.reference,
        },
      );

      return this.mapToResponse(updated);
    });
  }

  private balancesMatch(a: number, b: number): boolean {
    return Math.abs(a - b) <= this.balanceEpsilon;
  }

  private async assertLedgerMatchesBalance(
    walletId: string,
    walletBalance?: number,
  ) {
    const requestId = this.requestIdStorage.getRequestId();
    let balanceToCheck: number;

    if (walletBalance === undefined) {
      const wallet = await this.prisma.wallet.findUnique({
        where: { id: walletId },
      });

      if (!wallet) {
        throw new NotFoundException(`Wallet ${walletId} not found`);
      }

      balanceToCheck = wallet.balance;
    } else {
      balanceToCheck = walletBalance;
    }

    const [totalCredits, totalDebits] = await Promise.all([
      this.ledgerService.getTotalCredits(walletId),
      this.ledgerService.getTotalDebits(walletId),
    ]);

    const ledgerBalance = totalCredits - totalDebits;

    if (!this.balancesMatch(balanceToCheck, ledgerBalance)) {
      this.auditLogger.error(
        { requestId, walletId },
        'Ledger balance mismatch detected',
        undefined,
        {
          walletBalance: balanceToCheck,
          ledgerBalance,
          delta: balanceToCheck - ledgerBalance,
        },
      );
      throw new InternalServerErrorException(
        'Wallet ledger integrity check failed',
      );
    }
  }

  /**
   * Internal method to map wallet to response DTO
   */
  private mapToResponse(wallet: Wallet): WalletResponse {
    return {
      id: wallet.id,
      userId: wallet.userId,
      balance: wallet.balance,
      currency: wallet.currency,
      createdAt: wallet.createdAt,
      updatedAt: wallet.updatedAt,
    };
  }
}
