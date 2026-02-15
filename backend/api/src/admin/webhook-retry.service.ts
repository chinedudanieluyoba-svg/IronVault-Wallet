import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditLogger } from '../common/logging/audit.logger';
import { DeadLetterQueueService } from './dead-letter-queue.service';

export interface WebhookRetryResult {
  webhookId: string;
  provider: string;
  externalId: string;
  retryCount: number;
  maxRetries: number;
  success: boolean;
  error?: string;
}

export interface WebhookRetryBatchResult {
  attempts: number;
  successes: number;
  failures: number;
  movedToDeadLetter: number;
  results: WebhookRetryResult[];
}

/**
 * Webhook retry processor
 * Finds failed webhooks and retries processing
 * Moves to dead-letter queue after max retries exhausted
 */
@Injectable()
export class WebhookRetryService {
  private readonly maxRetries = Number(process.env.WEBHOOK_MAX_RETRIES ?? '3');

  constructor(
    private prisma: PrismaService,
    private auditLogger: AuditLogger,
    private dlqService: DeadLetterQueueService,
  ) {}

  /**
   * Process failed webhooks that need retrying
   * Looks for status='failed' or 'error' with retryCount < maxRetries
   */
  async retryFailedWebhooks(): Promise<WebhookRetryBatchResult> {
    // Find webhooks still eligible for retry
    const failedWebhooks = await this.prisma.webhookEvent.findMany({
      where: {
        status: {
          in: ['failed', 'error'],
        },
        // Note: retryCount filter will be added after migration runs
        // For now, handle filtering in application code
      },
      orderBy: { receivedAt: 'asc' }, // Will change to lastRetryAt after migration
      take: 100, // Process in batches
    });

    const results: WebhookRetryResult[] = [];
    let successes = 0;
    let failures = 0;
    let movedToDeadLetter = 0;

    for (const webhook of failedWebhooks) {
      try {
        const webhookWithRetry = webhook as any; // Cast to include new fields after migration
        const currentRetryCount = webhookWithRetry.retryCount ?? 0;
        const newRetryCount = currentRetryCount + 1;

        // Check if we've exhausted retries
        if (newRetryCount >= this.maxRetries) {
          // Move to dead-letter queue
          await this.moveToDeadLetter(webhook.id);
          movedToDeadLetter++;

          this.auditLogger.error(
            { webhookId: webhook.id },
            'Webhook moved to dead-letter queue after max retries',
            undefined,
            {
              provider: webhook.provider,
              externalId: webhook.externalId,
              retries: newRetryCount,
            },
          );

          results.push({
            webhookId: webhook.id,
            provider: webhook.provider,
            externalId: webhook.externalId,
            retryCount: newRetryCount,
            maxRetries: this.maxRetries,
            success: false,
            error: 'Moved to dead-letter after max retries',
          });
        } else {
          // Queue for retry in next cycle
          await this.retryWebhookEvent(webhook.id);
          successes++;

          results.push({
            webhookId: webhook.id,
            provider: webhook.provider,
            externalId: webhook.externalId,
            retryCount: newRetryCount,
            maxRetries: this.maxRetries,
            success: true,
            error: 'Retry scheduled for processing',
          });
        }
      } catch (error) {
        failures++;

        results.push({
          webhookId: webhook.id,
          provider: webhook.provider,
          externalId: webhook.externalId,
          retryCount: (webhook as any).retryCount ?? 0,
          maxRetries: this.maxRetries,
          success: false,
          error: error.message,
        });
      }
    }

    return {
      attempts: failedWebhooks.length,
      successes,
      failures,
      movedToDeadLetter,
      results,
    };
  }

  /**
   * Retry a single webhook event
   * Attempts to reprocess the webhook event
   * Does NOT automatically mark as processed - only increments retry count
   * Actual processing logic should update status to 'processed' on success
   */
  async retryWebhookEvent(webhookId: string): Promise<boolean> {
    const webhook = await this.prisma.webhookEvent.findUnique({
      where: { id: webhookId },
    });

    if (!webhook) {
      throw new Error('Webhook not found');
    }

    // Increment retry count and update last retry timestamp
    // Cast to any because new fields aren't in Prisma types yet (pre-migration)
    // The actual webhook processing logic must update status='processed'
    await (this.prisma.webhookEvent.update as any)({
      where: { id: webhookId },
      data: {
        retryCount: {
          increment: 1,
        },
        lastRetryAt: new Date(),
        // Keep status as-is; let actual processor decide if it succeeds
        // Status will be 'failed' or 'pending' depending on previous attempt
      },
    });
    // Return true to indicate retry was queued
    // Actual success depends on webhook processor picking it up
    return true;
  }

  /**
   * Move webhook to dead-letter queue and record in DLQ table
   */
  async moveToDeadLetter(webhookId: string): Promise<void> {
    const webhook = await this.prisma.webhookEvent.findUnique({
      where: { id: webhookId },
    });

    if (!webhook) {
      throw new Error('Webhook not found');
    }

    // Add to DLQ service
    const webhookWithRetry = webhook as any;
    await this.dlqService.addToQueue(
      webhook.externalId,
      'webhook',
      webhook.provider,
      'max_retries',
      webhookWithRetry.retryCount ?? 0,
      this.maxRetries,
      webhook.errorMessage || undefined,
      { provider: webhook.provider }, // Basic payload info
    );

    // Update webhook event status
    // Cast to any because new fields aren't in Prisma types yet (pre-migration)
    await (this.prisma.webhookEvent.update as any)({
      where: { id: webhookId },
      data: {
        status: 'dead_letter',
        deadLetterAt: new Date(),
      },
    });
  }

  /**
   * Get all dead-letter webhooks
   */
  async getDeadLetterWebhooks(
    limit: number = 100,
    offset: number = 0,
  ): Promise<{ webhooks: any[]; total: number }> {
    const [webhooks, total] = await Promise.all([
      (this.prisma.webhookEvent.findMany as any)({
        where: { status: 'dead_letter' },
        orderBy: { deadLetterAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      this.prisma.webhookEvent.count({ where: { status: 'dead_letter' } }),
    ]);

    return { webhooks, total };
  }

  /**
   * Manually retry a dead-letter webhook (admin action)
   */
  async manuallyRetryDeadLetter(
    webhookId: string,
    adminId: string,
  ): Promise<void> {
    const webhook = await this.prisma.webhookEvent.findUnique({
      where: { id: webhookId },
    });

    if (!webhook) {
      throw new Error('Webhook not found');
    }

    if (webhook.status !== 'dead_letter') {
      throw new Error('Webhook is not in dead-letter status');
    }

    // Reset retry state and try again
    // Cast to any because new fields aren't in Prisma types yet (pre-migration)
    await (this.prisma.webhookEvent.update as any)({
      where: { id: webhookId },
      data: {
        status: 'failed',
        deadLetterAt: null,
        retryCount: 0, // Reset counter for fresh attempt
        lastRetryAt: new Date(),
      },
    });

    this.auditLogger.audit(
      { adminId, webhookId },
      'Dead-letter webhook manually retried',
      {
        provider: webhook.provider,
        externalId: webhook.externalId,
      },
    );
  }
}
