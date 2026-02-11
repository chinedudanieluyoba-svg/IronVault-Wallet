import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LedgerEntryType, WalletLedgerEntry } from '../types/wallet.types';

/**
 * Wallet Ledger Service
 * Manages immutable ledger entries for wallet transactions
 * Each entry captures: type, amount, balance before/after, reference
 */
@Injectable()
export class WalletLedgerService {
  constructor(private prisma: PrismaService) {}

  /**
   * Record ledger entry (immutable append-only log)
   * Captures complete transaction state for audit trail
   */
  async recordEntry(
    walletId: string,
    type: LedgerEntryType,
    amount: number,
    balanceBefore: number,
    balanceAfter: number,
    reference?: string,
    description?: string,
  ): Promise<any> {
    return this.prisma.walletLedgerEntry.create({
      data: {
        walletId,
        type: type as string,
        amount,
        balanceBefore,
        balanceAfter,
        reference,
        description,
      },
    });
  }

  /**
   * Get ledger entries for a wallet
   * Ordered by creation time (newest first)
   */
  async getEntries(
    walletId: string,
    limit: number = 50,
    offset: number = 0,
  ): Promise<any[]> {
    return this.prisma.walletLedgerEntry.findMany({
      where: { walletId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });
  }

  /**
   * Get ledger entries by type
   */
  async getEntriesByType(
    walletId: string,
    type: LedgerEntryType,
    limit: number = 50,
  ): Promise<any[]> {
    return this.prisma.walletLedgerEntry.findMany({
      where: {
        walletId,
        type: type as string,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  /**
   * Get entry count for wallet
   */
  async getEntryCount(walletId: string): Promise<number> {
    return this.prisma.walletLedgerEntry.count({
      where: { walletId },
    });
  }

  /**
   * Sum all debits (outgoing transactions)
   */
  async getTotalDebits(walletId: string): Promise<number> {
    const result = await this.prisma.walletLedgerEntry.aggregate({
      where: {
        walletId,
        type: {
          in: ['withdrawal', 'transfer_out', 'trading'],
        },
      },
      _sum: {
        amount: true,
      },
    });
    return result._sum.amount || 0;
  }

  /**
   * Sum all credits (incoming transactions)
   */
  async getTotalCredits(walletId: string): Promise<number> {
    const result = await this.prisma.walletLedgerEntry.aggregate({
      where: {
        walletId,
        type: {
          in: ['deposit', 'transfer_in'],
        },
      },
      _sum: {
        amount: true,
      },
    });
    return result._sum.amount || 0;
  }
}
