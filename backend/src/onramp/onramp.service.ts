import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WalletService } from '../wallet/wallet.service';
import { AuditLogger } from '../common/logging/audit.logger';
import { RequestIdStorage } from '../common/logging/request-id.storage';
import { MetricsService } from '../common/metrics/metrics.service';
import { OnRampEvent } from './types/onramp-event';
import { isCreditableEvent } from './guards/onramp-status.guard';

interface InitiateOnRampInput {
  walletId: string;
  amount: number;
  currency: string;
  provider: 'moonpay' | 'transak' | 'paystack' | 'stripe';
}

interface HandleProviderWebhookInput {
  providerTxId: string;
  status: string;
  amount: number;
  provider: 'moonpay' | 'transak' | 'paystack' | 'stripe';
  [key: string]: any;
}

@Injectable()
export class OnRampService {
  constructor(
    private prisma: PrismaService,
    private walletService: WalletService,
    private auditLogger: AuditLogger,
    private requestIdStorage: RequestIdStorage,
    private metricsService: MetricsService,
  ) {}

  /**
   * Initiate on-ramp transaction
   * Create a pending on-ramp record that will be credited when payment is confirmed
   */
  async initiateOnRamp(input: InitiateOnRampInput) {
    const requestId = this.requestIdStorage.getRequestId();

    const onRamp = await this.prisma.onRamp.create({
      data: {
        walletId: input.walletId,
        provider: input.provider,
        amount: input.amount,
        currency: input.currency,
        status: 'pending',
      },
    });

    const wallet = await this.prisma.wallet.findUnique({
      where: { id: input.walletId },
    });

    // Log initiation
    this.auditLogger.audit(
      { requestId, userId: wallet?.userId, walletId: input.walletId },
      `On-ramp initiated (${input.provider})`,
      {
        amount: input.amount,
        currency: input.currency,
        onRampId: onRamp.id,
        status: 'pending',
      },
    );

    return onRamp;
  }

  /**
   * Get on-ramp transaction status
   */
  async getStatus(onRampId: string) {
    return this.prisma.onRamp.findUnique({
      where: { id: onRampId },
    });
  }

  /**
   * Handle webhook from payment provider
   */
  async handleProviderWebhook(payload: HandleProviderWebhookInput) {
    // Implementation depends on provider
    // For now, just record the event
    return { received: true };
  }

  /**
   * Process on-ramp event and credit wallet
   */
  async processEvent(event: OnRampEvent, verifiedWebhook: boolean) {
    const requestId = this.requestIdStorage.getRequestId();
    const timer = this.metricsService.startTimer();

    if (!verifiedWebhook) {
      this.auditLogger.warn(
        { requestId, userId: event.userId, providerEventId: event.externalId },
        'Webhook rejected: not verified',
        { provider: event.provider },
      );
      this.metricsService.trackWebhook({
        provider: event.provider,
        providerEventId: event.externalId,
        eventType: event.status,
        status: 'FAILED',
        errorReason: 'Webhook not verified',
        durationMs: timer(),
      });
      throw new ForbiddenException('Webhook event not verified');
    }

    if (!isCreditableEvent(event)) {
      this.auditLogger.info(
        { requestId, userId: event.userId, providerEventId: event.externalId },
        `Provider webhook received (non-creditable status)`,
        { provider: event.provider, status: event.status },
      );
      return;
    }

    await this.prisma.$transaction(async (tx) => {
      // Idempotency check
      const exists = await tx.webhookEvent.findUnique({
        where: { externalId: event.externalId },
      });

      if (exists) {
        this.auditLogger.info(
          {
            requestId,
            userId: event.userId,
            providerEventId: event.externalId,
          },
          `Provider webhook already processed (idempotent)`,
          { provider: event.provider, amount: event.amount },
        );
        return;
      }

      const wallet = await tx.wallet.findUniqueOrThrow({
        where: { userId: event.userId },
      });

      // Credit wallet (handles idempotency at ledger level)
      const updatedWallet = await this.walletService.creditWallet({
        walletId: wallet.id,
        amount: event.amount,
        type: 'deposit',
        source: 'webhook',
        reference: `${event.provider}_${event.externalId}`,
        description: `On-ramp deposit from ${event.provider}`,
        verifiedWebhook: true,
        providerEventId: event.externalId,
      });

      await tx.webhookEvent.create({
        data: {
          provider: event.provider,
          externalId: event.externalId,
          payloadHash: event.rawPayloadHash,
          status: 'processed',
          processedAt: new Date(),
        },
      });

      // Log webhook processing event
      this.auditLogger.audit(
        {
          requestId,
          userId: event.userId,
          walletId: wallet.id,
          providerEventId: event.externalId,
        },
        `Provider webhook processed (${event.provider})`,
        {
          amount: event.amount,
          currency: updatedWallet.currency,
          provider: event.provider,
          newBalance: updatedWallet.balance,
          status: 'credited',
        },
      );

      // Track webhook metric
      this.metricsService.trackWebhook({
        provider: event.provider,
        providerEventId: event.externalId,
        eventType: event.status,
        status: 'SUCCESS',
        durationMs: timer(),
      });
    });
  }
}
