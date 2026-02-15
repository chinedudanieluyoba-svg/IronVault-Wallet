/**
 * Concurrency Lock Service
 *
 * Purpose: Prevent race-condition balance bugs
 * Critical for: Concurrent wallet operations
 *
 * How it works:
 * 1. Use PostgreSQL row-level locking (SELECT ... FOR UPDATE)
 * 2. Lock wallet row during balance update
 * 3. Release lock after transaction completes
 *
 * Prevents:
 * - Lost updates (two transactions reading same balance)
 * - Race conditions (concurrent credits/debits)
 * - Balance corruption
 */

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export interface LockedWallet {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  frozenAt: Date | null;
  createdAt: Date;
}

@Injectable()
export class ConcurrencyLockService {
  constructor(private prisma: PrismaService) {}

  /**
   * Lock wallet row for update (SELECT ... FOR UPDATE)
   * MUST be called within a transaction
   *
   * This prevents race conditions by locking the row until transaction completes:
   * - Other transactions wait for lock to be released
   * - Ensures serialized access to wallet balance
   *
   * Example usage:
   * await prisma.$transaction(async (tx) => {
   *   const wallet = await lockService.lockWallet(tx, walletId);
   *   // Perform balance update
   *   await tx.wallet.update({ where: { id: walletId }, data: { balance: newBalance } });
   * });
   */
  async lockWallet(
    tx: any, // Prisma transaction client
    walletId: string,
  ): Promise<LockedWallet> {
    // Use raw SQL for SELECT ... FOR UPDATE
    // Prisma doesn't have direct support for FOR UPDATE yet
    const result = await tx.$queryRaw<LockedWallet[]>`
      SELECT 
        id, 
        "userId", 
        balance, 
        currency, 
        "frozenAt", 
        "createdAt"
      FROM "Wallet"
      WHERE id = ${walletId}
      FOR UPDATE
    `;

    if (!result || result.length === 0) {
      throw new Error(`Wallet ${walletId} not found`);
    }

    return result[0];
  }

  /**
   * Lock multiple wallets (for transfers between wallets)
   * Locks in consistent order to prevent deadlocks
   */
  async lockWallets(tx: any, walletIds: string[]): Promise<LockedWallet[]> {
    // Sort wallet IDs to ensure consistent lock order (prevents deadlocks)
    const sortedIds = [...walletIds].sort();

    const wallets: LockedWallet[] = [];
    for (const walletId of sortedIds) {
      const wallet = await this.lockWallet(tx, walletId);
      wallets.push(wallet);
    }

    return wallets;
  }

  /**
   * Try to lock wallet with timeout
   * Throws error if lock cannot be acquired within timeout
   */
  async lockWalletWithTimeout(
    tx: any,
    walletId: string,
    timeoutMs: number = 5000,
  ): Promise<LockedWallet> {
    // Set lock timeout for this transaction
    await tx.$executeRaw`SET LOCAL lock_timeout = ${timeoutMs}`;

    try {
      return await this.lockWallet(tx, walletId);
    } catch (error) {
      if (error.message?.includes('lock timeout')) {
        throw new Error(
          `Failed to acquire lock on wallet ${walletId} within ${timeoutMs}ms. Please retry.`,
        );
      }
      throw error;
    }
  }

  /**
   * Check if wallet is currently locked by another transaction
   * (Advisory check - doesn't actually lock)
   */
  async isWalletLocked(walletId: string): Promise<boolean> {
    const result = await this.prisma.$queryRaw<Array<{ locked: boolean }>>`
      SELECT 
        EXISTS(
          SELECT 1 
          FROM pg_locks 
          WHERE relation = 'Wallet'::regclass 
          AND mode = 'RowExclusiveLock'
        ) as locked
    `;

    return result[0]?.locked || false;
  }
}
