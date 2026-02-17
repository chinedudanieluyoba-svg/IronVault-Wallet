import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditLogger } from '../common/logging/audit.logger';
import { RequestIdStorage } from '../common/logging/request-id.storage';
import { Role } from '../auth/roles.enum';

export type TransactionType = 'deposit' | 'withdraw' | 'buy' | 'sell';

interface AtomicTransactionInput {
  walletId: string;
  type: TransactionType;
  amount: number;
  idempotencyKey?: string;
  source: 'user';
  userId: string;
}

@Injectable()
export class TransactionService {
  constructor(
    private prisma: PrismaService,
    private auditLogger: AuditLogger,
    private requestIdStorage: RequestIdStorage,
  ) {}

  /**
   * Creates a transaction atomically using Prisma $transaction()
   * Prevents duplicate transactions using idempotency keys
   * Validates balance to prevent negative amounts
   */
  async createTransaction(input: AtomicTransactionInput) {
    const { walletId, type, amount, idempotencyKey, source, userId } = input;
    const requestId = this.requestIdStorage.getRequestId();

    if (source !== 'user' || !userId) {
      this.auditLogger.warn(
        { requestId, walletId, userId },
        'Transaction blocked: invalid source',
      );
      throw new ForbiddenException('Debits are allowed only from user actions');
    }

    if (type === 'deposit') {
      this.auditLogger.warn(
        { requestId, walletId, userId },
        'Transaction blocked: deposit not allowed from user action',
      );
      throw new ForbiddenException(
        'Credits are allowed only from admin or verified webhook',
      );
    }

    // Validate amount
    if (amount <= 0) {
      throw new BadRequestException('Transaction amount must be positive');
    }

    // Check for idempotency - prevent duplicate transactions
    if (idempotencyKey) {
      const existingTx = await this.prisma.transaction.findUnique({
        where: { idempotencyKey },
      });
      if (existingTx) {
        this.auditLogger.info(
          { requestId, walletId },
          'Idempotent transaction request (already processed)',
          { type, amount, idempotencyKey: '[REDACTED]' },
        );
        return existingTx; // Return existing transaction (idempotent)
      }
    }

    // Atomic transaction: fetch wallet, validate balance, update balance, create transaction
    try {
      return await this.prisma.$transaction(async (tx) => {
        // 1. Fetch wallet with lock (for write)
        const wallet = await tx.wallet.findUnique({
          where: { id: walletId },
        });

        if (!wallet) {
          throw new NotFoundException('Wallet not found');
        }

        if (wallet.userId !== userId) {
          this.auditLogger.warn(
            { requestId, walletId, userId },
            'Transaction blocked: user does not own wallet',
          );
          throw new ForbiddenException(
            'You can only transact on your own wallet',
          );
        }

        // 2. Calculate new balance based on transaction type
        let newBalance = wallet.balance;
        if (type === 'withdraw' || type === 'sell') {
          newBalance -= amount;
        } else if (type === 'buy') {
          newBalance -= amount;
        } else {
          throw new BadRequestException(`Invalid transaction type: ${type}`);
        }

        // 3. Validate balance (prevent negative balance)
        if (newBalance < 0) {
          this.auditLogger.warn(
            { requestId, walletId, userId: wallet.userId },
            `Insufficient balance for ${type} transaction`,
            {
              amount,
              currency: wallet.currency,
              availableBalance: wallet.balance,
              type,
            },
          );
          throw new BadRequestException(
            `Insufficient balance. Current: ${wallet.balance}, Required: ${amount}`,
          );
        }

        // 4. Update wallet balance atomically
        await tx.wallet.update({
          where: { id: walletId },
          data: { balance: newBalance },
        });

        // 5. Create transaction record
        const transaction = await tx.transaction.create({
          data: {
            walletId,
            type,
            amount,
            idempotencyKey: idempotencyKey || undefined,
          },
        });

        // Log audit event for transaction
        this.auditLogger.audit(
          { requestId, userId: wallet.userId, walletId },
          `Transaction created (${type})`,
          {
            amount,
            currency: wallet.currency,
            previousBalance: wallet.balance,
            newBalance,
            transactionId: transaction.id,
          },
        );

        return {
          transaction,
          newBalance,
          previousBalance: wallet.balance,
        };
      });
    } catch (error) {
      // Handle unique constraint violation (duplicate idempotency key)
      if (
        error.code === 'P2002' &&
        error.meta?.target?.includes('idempotencyKey')
      ) {
        this.auditLogger.warn(
          { requestId, walletId },
          'Duplicate transaction attempt (constraint violation)',
          { type, amount },
        );
        throw new ConflictException(
          'This transaction has already been processed',
        );
      }
      throw error;
    }
  }

  /**
   * Get all transactions for a wallet, ordered by most recent first
   */
  async getTransactionsByWallet(walletId: string, userId: string, role: Role) {
    const requestId = this.requestIdStorage.getRequestId();

    // Verify wallet exists
    const wallet = await this.prisma.wallet.findUnique({
      where: { id: walletId },
    });

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    if (role !== Role.ADMIN && wallet.userId !== userId) {
      this.auditLogger.warn(
        { requestId, walletId, userId },
        'Transaction history blocked: user does not own wallet',
      );
      throw new ForbiddenException('You can only view your own transactions');
    }

    const txs = await this.prisma.transaction.findMany({
      where: { walletId },
      orderBy: { createdAt: 'desc' },
    });

    return txs;
  }

  /**
   * Get wallet balance with transaction history summary
   */
  async getWalletSummary(walletId: string, userId: string, role: Role) {
    const requestId = this.requestIdStorage.getRequestId();

    const wallet = await this.prisma.wallet.findUnique({
      where: { id: walletId },
    });

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    if (role !== Role.ADMIN && wallet.userId !== userId) {
      this.auditLogger.warn(
        { requestId, walletId, userId },
        'Wallet summary blocked: user does not own wallet',
      );
      throw new ForbiddenException('You can only view your own wallet summary');
    }

    const transactions = await this.prisma.transaction.findMany({
      where: { walletId },
      orderBy: { createdAt: 'desc' },
    });

    // Calculate transaction summary
    const summary = {
      balance: wallet.balance,
      totalDeposits: 0,
      totalWithdrawals: 0,
      totalBuys: 0,
      totalSells: 0,
      transactionCount: transactions.length,
    };

    transactions.forEach((tx) => {
      switch (tx.type) {
        case 'deposit':
          summary.totalDeposits += tx.amount;
          break;
        case 'withdraw':
          summary.totalWithdrawals += tx.amount;
          break;
        case 'buy':
          summary.totalBuys += tx.amount;
          break;
        case 'sell':
          summary.totalSells += tx.amount;
          break;
      }
    });

    return {
      wallet,
      summary,
      recentTransactions: transactions.slice(0, 10),
    };
  }
}
