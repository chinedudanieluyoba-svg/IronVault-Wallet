import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditLogger } from '../common/logging/audit.logger';

export interface Alert {
  alertType:
    | 'balance_mismatch'
    | 'webhook_failures'
    | 'reconciliation_crash'
    | 'credit_spike';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  message: string;
  metadata?: any;
}

/**
 * Alerts service
 * Detects and logs critical conditions
 * Does NOT auto-fix - only alerts and flags for human review
 */
@Injectable()
export class AlertsService {
  // Configurable thresholds
  private readonly balanceMismatchThreshold = Number(
    process.env.ALERT_BALANCE_MISMATCH_THRESHOLD ?? '0.01',
  ); // $0.01
  private readonly webhookFailureThreshold = Number(
    process.env.ALERT_WEBHOOK_FAILURE_THRESHOLD ?? '5',
  ); // 5 failures
  private readonly webhookFailureWindow = Number(
    process.env.ALERT_WEBHOOK_FAILURE_WINDOW_MINUTES ?? '60',
  ); // 1 hour
  private readonly creditSpikeThreshold = Number(
    process.env.ALERT_CREDIT_SPIKE_THRESHOLD ?? '1000',
  ); // $1000 in 1 minute

  // Track recent webhook failures to batch alerts
  private recentWebhookFailures: { timestamp: Date; provider: string }[] = [];
  private lastWebhookFailureAlert: Date = new Date(0);

  constructor(
    private prisma: PrismaService,
    private auditLogger: AuditLogger,
  ) {}

  /**
   * Alert: Wallet balance mismatch detected
   * Only alert if delta exceeds threshold
   */
  async alertBalanceMismatch(
    walletId: string,
    walletBalance: number,
    ledgerBalance: number,
    delta: number,
  ): Promise<void> {
    // Only alert if mismatch is significant
    if (Math.abs(delta) < this.balanceMismatchThreshold) {
      return;
    }

    const alert: Alert = {
      alertType: 'balance_mismatch',
      severity: Math.abs(delta) > 100 ? 'critical' : 'high',
      title: `Wallet balance mismatch: $${Math.abs(delta).toFixed(2)}`,
      message: `Wallet ${walletId}: balance=$${walletBalance}, ledger=$${ledgerBalance}, delta=$${delta}`,
      metadata: {
        walletId,
        walletBalance,
        ledgerBalance,
        delta,
      },
    };

    await this.logAlert(alert);
  }

  /**
   * Alert: Webhook failures above threshold
   * Batches failures to avoid spam
   */
  async alertWebhookFailure(
    provider: string,
    externalId: string,
    error: string,
  ): Promise<void> {
    // Add to recent failures
    this.recentWebhookFailures.push({
      timestamp: new Date(),
      provider,
    });

    // Clean old failures outside window
    const windowStart = new Date(
      Date.now() - this.webhookFailureWindow * 60 * 1000,
    );
    this.recentWebhookFailures = this.recentWebhookFailures.filter(
      (f) => f.timestamp > windowStart,
    );

    // Check if threshold exceeded
    const failureCount = this.recentWebhookFailures.length;
    if (
      failureCount >= this.webhookFailureThreshold &&
      Date.now() - this.lastWebhookFailureAlert.getTime() > 5 * 60 * 1000 // Don't spam more than every 5 min
    ) {
      const alert: Alert = {
        alertType: 'webhook_failures',
        severity: failureCount > 10 ? 'critical' : 'high',
        title: `${failureCount} webhook failures in ${this.webhookFailureWindow}min`,
        message: `Webhook provider ${provider} has ${failureCount} failures. Last: ${error}`,
        metadata: {
          provider,
          failureCount,
          threshold: this.webhookFailureThreshold,
          windowMinutes: this.webhookFailureWindow,
        },
      };

      await this.logAlert(alert);
      this.lastWebhookFailureAlert = new Date();
    }
  }

  /**
   * Alert: Reconciliation job crash
   */
  async alertReconciliationCrash(jobName: string, error: Error): Promise<void> {
    const alert: Alert = {
      alertType: 'reconciliation_crash',
      severity: 'critical',
      title: `Reconciliation job crashed: ${jobName}`,
      message: `${jobName} reconciliation failed: ${error.message}. System will retry but human attention needed.`,
      metadata: {
        jobName,
        errorMessage: error.message,
        stack: error.stack?.split('\n').slice(0, 3).join('\n'),
      },
    };

    await this.logAlert(alert);
  }

  /**
   * Alert: Unexpected credit volume spike
   * Track credits per minute and alert on spike
   */
  async alertCreditSpike(
    walletId: string,
    amount: number,
    previousMinuteTotal: number,
  ): Promise<void> {
    const totalThisMinute = previousMinuteTotal + amount;

    // Only alert if spike is significant
    if (totalThisMinute < this.creditSpikeThreshold) {
      return;
    }

    const alert: Alert = {
      alertType: 'credit_spike',
      severity: 'high',
      title: `Credit spike: $${totalThisMinute.toFixed(2)} in last minute`,
      message: `Wallet ${walletId} received $${amount}. Last minute total: $${totalThisMinute.toFixed(2)}. Verify legitimacy.`,
      metadata: {
        walletId,
        amount,
        totalLastMinute: totalThisMinute,
        threshold: this.creditSpikeThreshold,
      },
    };

    await this.logAlert(alert);
  }

  /**
   * Log alert to database and notify
   */
  private async logAlert(alert: Alert): Promise<void> {
    // Store in database
    const dbAlert = await this.prisma.alertLog.create({
      data: {
        alertType: alert.alertType,
        severity: alert.severity,
        title: alert.title,
        message: alert.message,
        metadata: alert.metadata,
      },
    });

    // Always log to console for visibility
    const logLevel = alert.severity === 'critical' ? 'error' : 'warn';
    this.auditLogger[logLevel](
      { alertType: alert.alertType },
      alert.title,
      undefined,
      alert.metadata,
    );

    // Placeholder for v2: email/Slack integration
    // await this.notifySlack(alert)
    // await this.notifyEmail(alert)

    console.log(
      `[${alert.severity.toUpperCase()}] ${alert.alertType}: ${alert.title}`,
    );
  }

  /**
   * Get unresolved alerts
   */
  async getUnresolved(
    alertType?: string,
    limit: number = 100,
    offset: number = 0,
  ): Promise<{ alerts: any[]; total: number }> {
    const [alerts, total] = await Promise.all([
      this.prisma.alertLog.findMany({
        where: {
          resolved: false,
          ...(alertType && { alertType }),
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      this.prisma.alertLog.count({
        where: {
          resolved: false,
          ...(alertType && { alertType }),
        },
      }),
    ]);

    return { alerts, total };
  }

  /**
   * Acknowledge alert (admin reviewed it)
   */
  async acknowledge(alertId: string): Promise<void> {
    await this.prisma.alertLog.update({
      where: { id: alertId },
      data: {
        acknowledgedAt: new Date(),
      },
    });
  }

  /**
   * Resolve alert (issue dealt with)
   */
  async resolve(alertId: string, adminId: string): Promise<void> {
    await this.prisma.alertLog.update({
      where: { id: alertId },
      data: {
        resolved: true,
        resolvedAt: new Date(),
        resolvedBy: adminId,
      },
    });
  }

  /**
   * Get alert statistics
   */
  async getStats(): Promise<{
    unresolvedByType: { [key: string]: number };
    unresolvedBySeverity: { [key: string]: number };
    total24h: number;
  }> {
    const [byType, bySeverity, total24h] = await Promise.all([
      this.prisma.alertLog.groupBy({
        by: ['alertType'],
        where: { resolved: false },
        _count: true,
      }),
      this.prisma.alertLog.groupBy({
        by: ['severity'],
        where: { resolved: false },
        _count: true,
      }),
      this.prisma.alertLog.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
        },
      }),
    ]);

    return {
      unresolvedByType: byType.reduce(
        (acc, item) => {
          acc[item.alertType] = item._count;
          return acc;
        },
        {} as { [key: string]: number },
      ),
      unresolvedBySeverity: bySeverity.reduce(
        (acc, item) => {
          acc[item.severity] = item._count;
          return acc;
        },
        {} as { [key: string]: number },
      ),
      total24h,
    };
  }
}
