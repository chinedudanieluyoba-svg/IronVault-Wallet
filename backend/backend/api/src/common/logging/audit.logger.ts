/**
 * AuditLogger - Structured logging for audit trails
 *
 * SAFE TO LOG:
 * ✔ requestId - Trace requests across services
 * ✔ userId - Identify user actions
 * ✔ walletId - Track wallet operations
 * ✔ providerEventId - External provider events
 * ✔ amounts - Non-sensitive amounts
 * ✔ status - Operation status
 *
 * NEVER LOG:
 * ❌ JWT tokens
 * ❌ webhook raw payloads
 * ❌ Secrets (API keys, webhook secrets)
 * ❌ Full headers
 * ❌ Passwords
 * ❌ Private keys
 */

import { Injectable } from '@nestjs/common';

export interface AuditContext {
  requestId?: string;
  userId?: string;
  walletId?: string;
  providerEventId?: string;
  [key: string]: any;
}

export interface AuditEvent {
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'AUDIT';
  context: AuditContext;
  message: string;
  metadata?: Record<string, any>;
}

@Injectable()
export class AuditLogger {
  /**
   * Log audit event (key transaction/wallet operations)
   * Use for: wallet creation, deposits, withdrawals, transfers
   */
  audit(
    context: AuditContext,
    message: string,
    metadata?: Record<string, any>,
  ) {
    const event: AuditEvent = {
      timestamp: new Date().toISOString(),
      level: 'AUDIT',
      context,
      message,
      metadata: this.sanitizeMetadata(metadata),
    };
    this.logEvent(event);
  }

  /**
   * Log info (non-sensitive operations)
   */
  info(context: AuditContext, message: string, metadata?: Record<string, any>) {
    const event: AuditEvent = {
      timestamp: new Date().toISOString(),
      level: 'INFO',
      context,
      message,
      metadata: this.sanitizeMetadata(metadata),
    };
    this.logEvent(event);
  }

  /**
   * Log warnings
   */
  warn(context: AuditContext, message: string, metadata?: Record<string, any>) {
    const event: AuditEvent = {
      timestamp: new Date().toISOString(),
      level: 'WARN',
      context,
      message,
      metadata: this.sanitizeMetadata(metadata),
    };
    this.logEvent(event);
  }

  /**
   * Log errors (without exposing sensitive data)
   */
  error(
    context: AuditContext,
    message: string,
    error?: Error,
    metadata?: Record<string, any>,
  ) {
    // Extract safe error info
    const errorInfo = error
      ? {
          name: error.name,
          message: error.message,
          // Never log full stack trace (may contain secrets)
          stack: error.stack?.split('\n').slice(0, 3).join('\n'),
        }
      : undefined;

    const event: AuditEvent = {
      timestamp: new Date().toISOString(),
      level: 'ERROR',
      context,
      message,
      metadata: this.sanitizeMetadata({ ...metadata, error: errorInfo }),
    };
    this.logEvent(event);
  }

  /**
   * Sanitize metadata to remove sensitive fields
   */
  private sanitizeMetadata(
    metadata?: Record<string, any>,
  ): Record<string, any> | undefined {
    if (!metadata) return undefined;

    const sanitized = { ...metadata };

    // List of keys that should never be logged
    const sensitivePatterns = [
      /secret/i,
      /token/i,
      /password/i,
      /key/i,
      /auth/i,
      /credential/i,
      /authorization/i,
      /bearer/i,
      /payload/i,
      /signature/i,
      /api_key/i,
    ];

    for (const key in sanitized) {
      // Check if key matches sensitive patterns
      if (sensitivePatterns.some((pattern) => pattern.test(key))) {
        sanitized[key] = '[REDACTED]';
      }
      // Sanitize objects recursively
      else if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
        sanitized[key] = this.sanitizeMetadata(sanitized[key]);
      }
    }

    return sanitized;
  }

  /**
   * Output log event (can be customized for different log destinations)
   */
  private logEvent(event: AuditEvent) {
    // Format: TIMESTAMP [LEVEL] [requestId] message | context
    const context = [
      event.context.requestId && `req:${event.context.requestId}`,
      event.context.userId && `user:${event.context.userId}`,
      event.context.walletId && `wallet:${event.context.walletId}`,
      event.context.providerEventId &&
        `provider:${event.context.providerEventId}`,
    ]
      .filter(Boolean)
      .join(' | ');

    const contextStr = context ? ` [${context}]` : '';
    const metadataStr = event.metadata
      ? ` | ${JSON.stringify(event.metadata)}`
      : '';

    const logMessage = `${event.timestamp} [${event.level}]${contextStr} ${event.message}${metadataStr}`;

    if (event.level === 'ERROR') {
      console.error(logMessage);
    } else if (event.level === 'WARN') {
      console.warn(logMessage);
    } else {
      console.log(logMessage);
    }
  }
}
