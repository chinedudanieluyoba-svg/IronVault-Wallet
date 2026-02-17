/**
 * Idempotency Service
 *
 * Purpose: Prevent duplicate operations (double credits/debits)
 * Critical for: Payments, webhooks, admin actions
 *
 * How it works:
 * 1. Generate unique idempotency key for each operation
 * 2. Check if operation already exists
 * 3. If exists, return existing result (idempotent)
 * 4. If new, proceed with operation
 *
 * Key format: {source}:{reference}:{action}
 * Example: webhook:moonpay_tx_123:credit
 */

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export interface IdempotentOperation {
  key: string;
  walletId: string;
  amount: number;
  type: string;
  source: string;
  reference?: string;
  description?: string;
}

export interface IdempotencyResult {
  isNew: boolean;
  existingEntry?: any;
}

@Injectable()
export class IdempotencyService {
  constructor(private prisma: PrismaService) {}

  /**
   * Generate idempotency key for wallet operation
   * Format: {source}:{reference}:{walletId}:{action}
   */
  generateKey(
    source: string,
    reference: string,
    walletId: string,
    action: 'credit' | 'debit',
  ): string {
    return `${source}:${reference}:${walletId}:${action}`;
  }

  /**
   * Check if operation already exists (idempotency check)
   * Returns existing ledger entry if found
   */
  async checkIdempotency(idempotencyKey: string): Promise<IdempotencyResult> {
    const existing = await this.prisma.walletLedgerEntry.findUnique({
      where: { idempotencyKey },
    });

    if (existing) {
      return {
        isNew: false,
        existingEntry: existing,
      };
    }

    return {
      isNew: true,
    };
  }

  /**
   * Generate idempotency key for webhook event
   * Format: webhook:{provider}:{externalId}:{walletId}:credit
   */
  generateWebhookKey(
    provider: string,
    externalId: string,
    walletId: string,
  ): string {
    return this.generateKey(
      'webhook',
      `${provider}_${externalId}`,
      walletId,
      'credit',
    );
  }

  /**
   * Generate idempotency key for admin action
   * Format: admin:{adminId}:{timestamp}:{walletId}:{action}
   */
  generateAdminKey(
    adminId: string,
    timestamp: number,
    walletId: string,
    action: 'credit' | 'debit',
  ): string {
    return this.generateKey(
      'admin',
      `${adminId}_${timestamp}`,
      walletId,
      action,
    );
  }

  /**
   * Generate idempotency key for user transaction
   * Format: user:{userId}:{transactionId}:{walletId}:{action}
   */
  generateUserKey(
    userId: string,
    transactionId: string,
    walletId: string,
    action: 'credit' | 'debit',
  ): string {
    return this.generateKey(
      'user',
      `${userId}_${transactionId}`,
      walletId,
      action,
    );
  }

  /**
   * Validate idempotency key format
   */
  isValidKey(key: string): boolean {
    // Format: {source}:{reference}:{walletId}:{action}
    const parts = key.split(':');
    if (parts.length !== 4) return false;

    const [source, reference, walletId, action] = parts;

    // Validate source
    if (!['webhook', 'admin', 'user'].includes(source)) return false;

    // Validate action
    if (!['credit', 'debit'].includes(action)) return false;

    // Validate non-empty parts
    if (!reference || !walletId) return false;

    return true;
  }
}
