/**
 * MetricsService - Track key operational metrics
 *
 * Purpose: Provide insight into system health and transaction patterns
 *
 * Tracked Metrics:
 * - Wallet operations (credit, debit, balance checks)
 * - Webhook processing (success, failures, retries)
 * - Error rates
 * - Performance timings
 *
 * Output: Structured logs that can be ingested by monitoring systems
 * (Datadog, New Relic, CloudWatch, etc.)
 */

import { Injectable } from '@nestjs/common';
import { AuditLogger } from '../logging/audit.logger';

export interface WalletMetric {
  walletId: string;
  userId: string;
  operation:
    | 'CREDIT'
    | 'DEBIT'
    | 'BALANCE_CHECK'
    | 'CREATE'
    | 'FREEZE'
    | 'UNFREEZE';
  amount?: number;
  currency: string;
  balanceBefore?: number;
  balanceAfter?: number;
  success: boolean;
  errorReason?: string;
  durationMs: number;
}

export interface WebhookMetric {
  provider: string;
  providerEventId: string;
  eventType: string;
  status: 'SUCCESS' | 'FAILED' | 'RETRY' | 'DLQ';
  httpStatus?: number;
  errorReason?: string;
  retryCount?: number;
  durationMs: number;
}

export interface ErrorMetric {
  errorType: string;
  errorMessage: string;
  endpoint: string;
  userId?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

@Injectable()
export class MetricsService {
  constructor(private auditLogger: AuditLogger) {}

  /**
   * Track wallet credit operation
   */
  trackWalletCredit(metric: Omit<WalletMetric, 'operation'>) {
    this.trackWalletOperation({ ...metric, operation: 'CREDIT' });
  }

  /**
   * Track wallet debit operation
   */
  trackWalletDebit(metric: Omit<WalletMetric, 'operation'>) {
    this.trackWalletOperation({ ...metric, operation: 'DEBIT' });
  }

  /**
   * Track wallet operation (generic)
   */
  private trackWalletOperation(metric: WalletMetric) {
    const metadata = {
      operation: metric.operation,
      amount: metric.amount,
      currency: metric.currency,
      balanceBefore: metric.balanceBefore,
      balanceAfter: metric.balanceAfter,
      success: metric.success,
      errorReason: metric.errorReason,
      durationMs: metric.durationMs,
      // Prefix for metric aggregation
      metric_type: 'wallet_operation',
      metric_operation: metric.operation.toLowerCase(),
      metric_success: metric.success,
    };

    const context = {
      userId: metric.userId,
      walletId: metric.walletId,
    };

    const message = `Wallet ${metric.operation}: ${metric.success ? 'SUCCESS' : 'FAILED'}`;

    if (metric.success) {
      this.auditLogger.info(context, message, metadata);
    } else {
      this.auditLogger.error(context, message, undefined, metadata);
    }

    // Also output metric in parseable format for monitoring systems
    if (process.env.NODE_ENV === 'production') {
      console.log(
        JSON.stringify({
          type: 'METRIC',
          metric: 'wallet_operation',
          operation: metric.operation,
          success: metric.success,
          amount: metric.amount,
          currency: metric.currency,
          durationMs: metric.durationMs,
          timestamp: new Date().toISOString(),
        }),
      );
    }
  }

  /**
   * Track webhook processing
   */
  trackWebhook(metric: WebhookMetric) {
    const level = metric.status === 'SUCCESS' ? 'INFO' : 'WARN';

    this.auditLogger[level === 'INFO' ? 'info' : 'warn'](
      {
        providerEventId: metric.providerEventId,
      },
      `Webhook ${metric.provider}: ${metric.status}`,
      {
        provider: metric.provider,
        eventType: metric.eventType,
        status: metric.status,
        httpStatus: metric.httpStatus,
        errorReason: metric.errorReason,
        retryCount: metric.retryCount,
        durationMs: metric.durationMs,
        // Prefix for metric aggregation
        metric_type: 'webhook_processing',
        metric_provider: metric.provider,
        metric_status: metric.status.toLowerCase(),
      },
    );

    // Output metric in parseable format
    if (process.env.NODE_ENV === 'production') {
      console.log(
        JSON.stringify({
          type: 'METRIC',
          metric: 'webhook_processing',
          provider: metric.provider,
          status: metric.status,
          httpStatus: metric.httpStatus,
          retryCount: metric.retryCount,
          durationMs: metric.durationMs,
          timestamp: new Date().toISOString(),
        }),
      );
    }
  }

  /**
   * Track error occurrence
   */
  trackError(metric: ErrorMetric) {
    this.auditLogger.error(
      {
        userId: metric.userId,
      },
      `Error: ${metric.errorType}`,
      new Error(metric.errorMessage),
      {
        endpoint: metric.endpoint,
        severity: metric.severity,
        // Prefix for metric aggregation
        metric_type: 'error',
        metric_error_type: metric.errorType,
        metric_severity: metric.severity,
      },
    );

    // Output metric in parseable format
    if (process.env.NODE_ENV === 'production') {
      console.log(
        JSON.stringify({
          type: 'METRIC',
          metric: 'error',
          errorType: metric.errorType,
          endpoint: metric.endpoint,
          severity: metric.severity,
          timestamp: new Date().toISOString(),
        }),
      );
    }
  }

  /**
   * Get metrics summary (for health checks)
   */
  async getMetricsSummary(): Promise<{
    wallet_operations_24h: number;
    webhook_failures_24h: number;
    error_rate_24h: number;
  }> {
    // In production, these would query from metrics store (Redis, TimescaleDB, etc.)
    // For now, return placeholder values
    return {
      wallet_operations_24h: 0,
      webhook_failures_24h: 0,
      error_rate_24h: 0,
    };
  }

  /**
   * Track performance timing
   */
  startTimer(): () => number {
    const start = Date.now();
    return () => Date.now() - start;
  }
}
