import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditLogger } from '../common/logging/audit.logger';

export interface MissingWebhookResult {
  onRampId: string;
  provider: string;
  amount: number;
  status: string;
  completedAt: Date;
  missingWebhook: boolean;
  missingLedger: boolean;
}

export interface ProviderReconciliationResult {
  checkedCount: number;
  missingWebhooks: number;
  missingLedgers: number;
  results: MissingWebhookResult[];
}

/**
 * Provider reconciliation: Detect dropped webhooks and missing ledger entries
 * Checks: OnRamp status='completed' -> has WebhookEvent? -> has WalletLedgerEntry?
 */
@Injectable()
export class ProviderReconciliationService {
  constructor(
    private prisma: PrismaService,
    private auditLogger: AuditLogger,
  ) {}

  /**
   * Reconcile provider transactions with webhook events and ledger entries
   * Check all OnRamp records with status='completed' in the last hour
   */
  async reconcileProviders(
    lookbackMinutes: number = 60,
  ): Promise<ProviderReconciliationResult> {
    const cutoff = new Date(Date.now() - lookbackMinutes * 60 * 1000);

    // Find all completed OnRamp transactions in lookback window
    const completedOnRamps = await this.prisma.onRamp.findMany({
      where: {
        status: 'completed',
        completedAt: {
          gte: cutoff,
        },
      },
      include: {
        wallet: true,
        missingWebhook: true,
      },
    });

    const results: MissingWebhookResult[] = [];
    let missingWebhookCount = 0;
    let missingLedgerCount = 0;

    // Check each completed OnRamp for corresponding webhook and ledger
    for (const onRamp of completedOnRamps) {
      const webhookEvents = await this.prisma.webhookEvent.findMany({
        where: {
          provider: onRamp.provider,
          transactionId: {
            not: null,
          },
          // Check if related to this onRamp via Transaction
          transaction: {
            walletId: onRamp.walletId,
          },
        },
      });

      // Check for ledger entries from this webhook
      const ledgerEntries = await this.prisma.walletLedgerEntry.findMany({
        where: {
          walletId: onRamp.walletId,
          source: 'webhook',
          providerEventId: {
            not: null,
          },
          createdAt: {
            gte: onRamp.completedAt || onRamp.createdAt,
            lte: new Date(),
          },
        },
      });

      const webhookExists = webhookEvents.length > 0;
      const ledgerExists = ledgerEntries.length > 0;
      const missingWebhook = !webhookExists;
      const missingLedger = !ledgerExists && webhookExists; // Ledger missing only if webhook exists but ledger doesn't

      if (missingWebhook) {
        missingWebhookCount++;
        this.auditLogger.error(
          { onRampId: onRamp.id },
          'Missing webhook event detected',
          undefined,
          {
            provider: onRamp.provider,
            amount: onRamp.amount,
            completedAt: onRamp.completedAt,
            walletId: onRamp.walletId,
          },
        );

        // Create or update MissingWebhookAlert
        if (!onRamp.missingWebhook) {
          await this.prisma.missingWebhookAlert.create({
            data: {
              onRampId: onRamp.id,
              provider: onRamp.provider,
              status: 'pending',
            },
          });
        }
      } else if (missingLedger) {
        // Webhook exists but ledger entry is missing (shouldn't happen, but flag it)
        missingLedgerCount++;
        this.auditLogger.error(
          { onRampId: onRamp.id },
          'Ledger entry missing for webhook event',
          undefined,
          {
            provider: onRamp.provider,
            amount: onRamp.amount,
            walletId: onRamp.walletId,
          },
        );
      }

      results.push({
        onRampId: onRamp.id,
        provider: onRamp.provider,
        amount: onRamp.amount,
        status: onRamp.status,
        completedAt: onRamp.completedAt || onRamp.createdAt,
        missingWebhook,
        missingLedger,
      });
    }

    return {
      checkedCount: completedOnRamps.length,
      missingWebhooks: missingWebhookCount,
      missingLedgers: missingLedgerCount,
      results,
    };
  }

  /**
   * Get all pending MissingWebhookAlerts
   */
  async getPendingMissingWebhooks(
    limit: number = 100,
    offset: number = 0,
  ): Promise<{ alerts: any[]; total: number }> {
    const [alerts, total] = await Promise.all([
      this.prisma.missingWebhookAlert.findMany({
        where: { status: 'pending' },
        include: {
          onRamp: true,
        },
        orderBy: { detectedAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      this.prisma.missingWebhookAlert.count({ where: { status: 'pending' } }),
    ]);

    return { alerts, total };
  }

  /**
   * Mark missing webhook as resolved
   */
  async resolveMissingWebhook(
    alertId: string,
    resolution: 'webhook_received' | 'manual_credit' | 'cancelled',
    notes?: string,
  ): Promise<void> {
    await this.prisma.missingWebhookAlert.update({
      where: { id: alertId },
      data: {
        status: 'manual_reviewed',
        resolution,
        resolvedAt: new Date(),
        notes,
      },
    });
  }

  /**
   * Replay webhook for a missing alert (manual action)
   * This would manually process the on-ramp as if webhook arrived
   */
  async replayMissingWebhook(alertId: string, adminId: string): Promise<void> {
    const alert = await this.prisma.missingWebhookAlert.findUnique({
      where: { id: alertId },
      include: { onRamp: true },
    });

    if (!alert) {
      throw new Error('Missing webhook alert not found');
    }

    // Mark the OnRamp as completed if not already
    if (alert.onRamp.status !== 'completed') {
      await this.prisma.onRamp.update({
        where: { id: alert.onRampId },
        data: { status: 'completed', completedAt: new Date() },
      });
    }

    // Create a ledger entry to credit the wallet
    const wallet = await this.prisma.wallet.findUnique({
      where: { id: alert.onRamp.walletId },
    });

    if (!wallet) {
      throw new Error('Wallet not found');
    }

    const balanceBefore = wallet.balance;
    const balanceAfter = balanceBefore + alert.onRamp.amount;

    // Update wallet balance
    await this.prisma.wallet.update({
      where: { id: alert.onRamp.walletId },
      data: {
        balance: balanceAfter,
      },
    });

    // Create ledger entry
    await this.prisma.walletLedgerEntry.create({
      data: {
        walletId: alert.onRamp.walletId,
        type: 'deposit',
        amount: alert.onRamp.amount,
        balanceBefore,
        balanceAfter,
        reference: `manual_replay_${alertId}_${adminId}`,
        description: `Manual replay of missing webhook (alert: ${alertId}, admin: ${adminId})`,
        source: 'webhook',
        providerEventId: `manual_${alertId}`,
      },
    });

    // Mark alert as resolved
    await this.resolveMissingWebhook(
      alertId,
      'manual_credit',
      `Manually replayed by ${adminId}`,
    );

    this.auditLogger.audit({ adminId }, 'Missing webhook replayed manually', {
      alertId,
      onRampId: alert.onRampId,
      amount: alert.onRamp.amount,
    });
  }
}
