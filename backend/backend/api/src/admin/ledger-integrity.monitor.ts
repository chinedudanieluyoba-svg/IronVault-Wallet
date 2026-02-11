import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AlertsService } from './alerts.service';
import { AuditLogger } from '../common/logging/audit.logger';

@Injectable()
export class LedgerIntegrityMonitor implements OnModuleInit, OnModuleDestroy {
  private timer?: NodeJS.Timeout;
  private running = false;

  constructor(
    private adminService: AdminService,
    private alertsService: AlertsService,
    private auditLogger: AuditLogger,
  ) {}

  onModuleInit() {
    const intervalMs = Number(
      process.env.LEDGER_INTEGRITY_INTERVAL_MS ?? '900000',
    );
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
          this.auditLogger.error({}, 'Ledger integrity audit failed', error);
          this.alertsService.alertReconciliationCrash(
            'ledger_integrity',
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
    const batchSize = Number(process.env.LEDGER_INTEGRITY_BATCH_SIZE ?? '200');
    const limit = Number.isFinite(batchSize) && batchSize > 0 ? batchSize : 200;
    const result = await this.adminService.getLedgerIntegrityAll(limit, 0);

    // Flag wallets with mismatches
    const flaggedCount = await this.adminService.flagInconsistentWallets(
      result.results,
    );

    // Alert on mismatches
    for (const wallet of result.results) {
      if (!wallet.isConsistent) {
        await this.alertsService.alertBalanceMismatch(
          wallet.walletId,
          wallet.walletBalance,
          wallet.ledgerBalance,
          wallet.delta,
        );
      }
    }

    this.auditLogger.audit({}, 'Ledger integrity audit completed', {
      checked: result.results.length,
      totalWallets: result.total,
      mismatches: result.mismatches,
      flagged: flaggedCount,
    });
  }
}
