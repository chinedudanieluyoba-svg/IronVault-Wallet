/**
 * Secrets Management Service
 *
 * Validates secret configuration and enforces rotation policies
 * Secrets should be stored in platform secret manager (AWS Secrets Manager,
 * GCP Secret Manager, Azure Key Vault, etc.), not in code or .env files
 */

import { Injectable } from '@nestjs/common';

type SecretStatus = {
  name: string;
  configured: boolean;
  rotationDue: boolean;
  lastRotated?: Date;
  daysOld?: number;
};

type SecretsReport = {
  ok: boolean;
  secrets: SecretStatus[];
  warnings: string[];
};

@Injectable()
export class SecretsService {
  private readonly ROTATION_WARNING_DAYS = 60; // Warn if secret is >60 days old
  private readonly ROTATION_CRITICAL_DAYS = 90; // Critical if secret is >90 days old

  /**
   * Validate all secrets are configured
   * Returns status of each secret and rotation warnings
   */
  validateSecrets(): SecretsReport {
    const secrets: SecretStatus[] = [];
    const warnings: string[] = [];

    // JWT Secret
    secrets.push(this.checkSecret('JWT_SECRET', 'JWT_SECRET_ROTATION_DATE'));

    // Database credentials
    const nodeEnv = process.env.NODE_ENV;
    if (nodeEnv === 'production') {
      secrets.push(
        this.checkSecret('DATABASE_URL_PROD', 'DB_CREDENTIALS_ROTATION_DATE'),
      );
    }

    // Payment provider secrets
    secrets.push(
      this.checkSecret(
        'MOONPAY_WEBHOOK_SECRET',
        'MOONPAY_SECRET_ROTATION_DATE',
      ),
    );

    // Optional provider secrets (don't fail if missing, just warn)
    const optionalSecrets = [
      'STRIPE_WEBHOOK_SECRET',
      'TRANSAK_WEBHOOK_SECRET',
      'PAYSTACK_WEBHOOK_SECRET',
    ];

    for (const secretKey of optionalSecrets) {
      if (process.env[secretKey]) {
        const rotationKey = secretKey.replace('_SECRET', '_ROTATION_DATE');
        secrets.push(this.checkSecret(secretKey, rotationKey));
      }
    }

    // Check for rotation warnings
    for (const secret of secrets) {
      if (secret.rotationDue && secret.daysOld) {
        if (secret.daysOld > this.ROTATION_CRITICAL_DAYS) {
          warnings.push(
            `🔴 CRITICAL: ${secret.name} is ${secret.daysOld} days old - rotate immediately`,
          );
        } else if (secret.daysOld > this.ROTATION_WARNING_DAYS) {
          warnings.push(
            `⚠️  WARNING: ${secret.name} is ${secret.daysOld} days old - rotation recommended`,
          );
        }
      }
    }

    // Check that secrets are not hardcoded (basic check)
    this.validateNoHardcodedSecrets(warnings);

    const ok = secrets.every((s) => s.configured) && warnings.length === 0;

    return {
      ok,
      secrets,
      warnings,
    };
  }

  private checkSecret(envKey: string, rotationDateKey: string): SecretStatus {
    const value = process.env[envKey];
    const configured = !!value && value.length > 0;

    if (!configured) {
      return {
        name: envKey,
        configured: false,
        rotationDue: false,
      };
    }

    const rotationDateStr = process.env[rotationDateKey];
    if (!rotationDateStr) {
      return {
        name: envKey,
        configured: true,
        rotationDue: false,
      };
    }

    const lastRotated = new Date(rotationDateStr);
    const daysOld = Math.floor(
      (Date.now() - lastRotated.getTime()) / (1000 * 60 * 60 * 24),
    );
    const rotationDue = daysOld > this.ROTATION_WARNING_DAYS;

    return {
      name: envKey,
      configured: true,
      rotationDue,
      lastRotated,
      daysOld,
    };
  }

  private validateNoHardcodedSecrets(warnings: string[]): void {
    // Check for suspicious patterns that might indicate hardcoded secrets
    const suspiciousKeys = [
      'JWT_SECRET',
      'DATABASE_URL',
      'MOONPAY_WEBHOOK_SECRET',
      'STRIPE_WEBHOOK_SECRET',
    ];

    for (const key of suspiciousKeys) {
      const value = process.env[key];
      if (!value) continue;

      // Check if secret looks hardcoded (simple heuristics)
      if (
        value.includes('your_') ||
        value.includes('example_') ||
        value.includes('test_')
      ) {
        warnings.push(
          `⚠️  ${key} appears to be a placeholder value - use real secrets in production`,
        );
      }

      // Check if secret is too short
      if (value.length < 16 && key.includes('SECRET')) {
        warnings.push(
          `⚠️  ${key} is too short - use at least 16 characters (recommend 32+)`,
        );
      }
    }
  }

  /**
   * Get secrets rotation schedule
   */
  getRotationSchedule(): Record<string, number> {
    return {
      JWT_SECRET: 90, // days
      DATABASE_URL: 90,
      WEBHOOK_SECRETS: 90,
      API_KEYS: 180, // Less critical, but still rotate
    };
  }

  /**
   * Validate database credentials follow least-privilege
   */
  validateDatabasePrivileges(): { ok: boolean; issues: string[] } {
    const issues: string[] = [];

    // Check if using root/postgres user (BAD)
    const dbUrl =
      process.env.DATABASE_URL_PROD ||
      process.env.DATABASE_URL ||
      process.env.DATABASE_URL_DEV;

    if (dbUrl) {
      try {
        const url = new URL(dbUrl);
        const username = url.username.toLowerCase();

        if (
          username === 'root' ||
          username === 'postgres' ||
          username === 'admin'
        ) {
          issues.push(
            `Database using privileged user '${username}' - create dedicated app user with minimal privileges`,
          );
        }
      } catch (error) {
        // Invalid URL, skip check
      }
    }

    return {
      ok: issues.length === 0,
      issues,
    };
  }
}
