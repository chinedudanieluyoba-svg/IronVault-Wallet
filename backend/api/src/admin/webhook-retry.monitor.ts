import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { WebhookRetryService } from './webhook-retry.service';
import { AlertsService } from './alerts.service';
import { AuditLogger } from '../common/logging/audit.logger';

/**
 * Webhook retry monitor
 * Periodically retries failed webhooks
 * Moves to dead-letter after max retries
 */
@Injectable()
export class WebhookRetryMonitor implements OnModuleInit, OnModuleDestroy {
  private timer?: NodeJS.Timeout;
  private running = false;

  constructor(
    private webhookRetryService: WebhookRetryService,
    private alertsService: AlertsService,
    private auditLogger: AuditLogger,
  ) {}

  onModuleInit() {
    const intervalMs = Number(
      process.env.WEBHOOK_RETRY_INTERVAL_MS ?? '300000',
    ); // 5 minutes
    if (!Number.isFinite(intervalMs) || intervalMs <= 0) {
      return;
    }

    this.timer = setInterval(() => {
      if (this.running) {
        return;
      }
      this.running = true;
      this.runRetry()
        .catch((error) => {
          this.auditLogger.error({}, 'Webhook retry job failed', error);
          this.alertsService.alertReconciliationCrash('webhook_retry', error);
        })
        .finally(() => {
          this.running = false;
        });
    }, intervalMs);
  }

  onModuleDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  private async runRetry() {
    const result = await this.webhookRetryService.retryFailedWebhooks();

    // Alert if failures are high
    if (result.failures > 0) {
      // Track failures for threshold-based alerting
      for (let i = 0; i < result.failures; i++) {
        await this.alertsService.alertWebhookFailure(
          'unknown',
          'batch_retry',
          `${result.failures} webhooks failed in retry cycle`,
        );
      }
    }

    this.auditLogger.audit({}, 'Webhook retry job completed', {
      attempts: result.attempts,
      successes: result.successes,
      failures: result.failures,
      movedToDeadLetter: result.movedToDeadLetter,
    });
  }
}
