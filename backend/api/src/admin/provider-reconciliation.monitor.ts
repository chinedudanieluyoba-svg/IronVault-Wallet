import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ProviderReconciliationService } from './provider-reconciliation.service';
import { AuditLogger } from '../common/logging/audit.logger';

/**
 * Hourly provider reconciliation job
 * Checks for dropped webhooks and missing ledger entries
 */
@Injectable()
export class ProviderReconciliationMonitor
  implements OnModuleInit, OnModuleDestroy
{
  private timer?: NodeJS.Timeout;
  private running = false;

  constructor(
    private providerReconciliationService: ProviderReconciliationService,
    private auditLogger: AuditLogger,
  ) {}

  onModuleInit() {
    const intervalMs = Number(
      process.env.PROVIDER_RECONCILIATION_INTERVAL_MS ?? '3600000',
    ); // 1 hour
    if (!Number.isFinite(intervalMs) || intervalMs <= 0) {
      return;
    }

    this.timer = setInterval(() => {
      if (this.running) {
        return;
      }
      this.running = true;
      this.runAudit()
        .catch((error) => {
          this.auditLogger.error(
            {},
            'Provider reconciliation audit failed',
            error,
          );
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

  private async runAudit() {
    const lookbackMinutes = Number(
      process.env.PROVIDER_RECONCILIATION_LOOKBACK_MINUTES ?? '60',
    );
    const result =
      await this.providerReconciliationService.reconcileProviders(
        lookbackMinutes,
      );

    this.auditLogger.audit({}, 'Provider reconciliation audit completed', {
      checked: result.checkedCount,
      missingWebhooks: result.missingWebhooks,
      missingLedgers: result.missingLedgers,
    });
  }
}
