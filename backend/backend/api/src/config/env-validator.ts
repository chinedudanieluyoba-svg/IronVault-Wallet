/**
 * Environment Variable Validator
 *
 * Validates required environment variables on app startup.
 * Fails fast if critical configuration is missing.
 *
 * Philosophy: Silent failure = dangerous
 */

type EnvVar = {
  key: string;
  required: boolean;
  description: string;
};

const REQUIRED_ENV_VARS: EnvVar[] = [
  {
    key: 'DATABASE_URL',
    required: true,
    description: 'PostgreSQL connection string',
  },
  {
    key: 'JWT_SECRET',
    required: true,
    description: 'Secret for signing JWT tokens',
  },
  {
    key: 'MOONPAY_WEBHOOK_SECRET',
    required: true,
    description: 'MoonPay webhook signature verification secret',
  },
  {
    key: 'NODE_ENV',
    required: true,
    description: 'Environment (development/staging/production)',
  },
];

const OPTIONAL_ENV_VARS: EnvVar[] = [
  {
    key: 'PORT',
    required: false,
    description: 'Server port (defaults to 3000)',
  },
  {
    key: 'LEDGER_INTEGRITY_INTERVAL_MS',
    required: false,
    description: 'Ledger integrity check interval (defaults to 15 min)',
  },
  {
    key: 'PROVIDER_RECONCILIATION_INTERVAL_MS',
    required: false,
    description: 'Provider reconciliation interval (defaults to 1 hour)',
  },
  {
    key: 'WEBHOOK_RETRY_INTERVAL_MS',
    required: false,
    description: 'Webhook retry interval (defaults to 5 min)',
  },
  {
    key: 'WEBHOOK_MAX_RETRIES',
    required: false,
    description: 'Max webhook retry attempts (defaults to 3)',
  },
  {
    key: 'ALERT_BALANCE_MISMATCH_THRESHOLD',
    required: false,
    description:
      'Balance mismatch alert threshold in dollars (defaults to 0.01)',
  },
  {
    key: 'ALERT_WEBHOOK_FAILURE_THRESHOLD',
    required: false,
    description: 'Webhook failure count threshold (defaults to 5)',
  },
  {
    key: 'ALERT_WEBHOOK_FAILURE_WINDOW_MINUTES',
    required: false,
    description: 'Webhook failure time window in minutes (defaults to 60)',
  },
  {
    key: 'ALERT_CREDIT_SPIKE_THRESHOLD',
    required: false,
    description:
      'Credit spike threshold per minute in dollars (defaults to 1000)',
  },
];

export class EnvironmentValidator {
  /**
   * Validate required environment variables
   * Throws error if any required var is missing
   */
  static validate(): void {
    const missing: EnvVar[] = [];
    const warnings: string[] = [];

    // Check NODE_ENV first (needed for database URL validation)
    const nodeEnv = process.env.NODE_ENV;
    if (!nodeEnv || nodeEnv.trim() === '') {
      console.error('\n❌ CRITICAL: NODE_ENV is required\n');
      throw new Error('NODE_ENV environment variable must be set');
    }

    // Check database URL based on NODE_ENV
    let dbUrl: string | undefined;
    if (nodeEnv === 'production') {
      dbUrl = process.env.DATABASE_URL_PROD;
      if (!dbUrl || dbUrl.trim() === '') {
        missing.push({
          key: 'DATABASE_URL_PROD',
          required: true,
          description:
            'Production PostgreSQL connection string (NODE_ENV=production)',
        });
      }
    } else if (nodeEnv === 'staging') {
      dbUrl = process.env.DATABASE_URL_STAGING;
      if (!dbUrl || dbUrl.trim() === '') {
        missing.push({
          key: 'DATABASE_URL_STAGING',
          required: true,
          description:
            'Staging PostgreSQL connection string (NODE_ENV=staging)',
        });
      }
    } else {
      dbUrl = process.env.DATABASE_URL_DEV;
      if (!dbUrl || dbUrl.trim() === '') {
        missing.push({
          key: 'DATABASE_URL_DEV',
          required: true,
          description:
            'Development PostgreSQL connection string (NODE_ENV=development)',
        });
      }
    }

    // Check other required variables (excluding DATABASE_URL which we handled above)
    for (const envVar of REQUIRED_ENV_VARS) {
      if (envVar.key === 'DATABASE_URL' || envVar.key === 'NODE_ENV') {
        continue; // Already validated
      }

      const value = process.env[envVar.key];

      if (!value || value.trim() === '') {
        missing.push(envVar);
      } else if (value === 'PLACEHOLDER_UPDATE_IN_RENDER_DASHBOARD') {
        warnings.push(
          `🚨 CRITICAL WARNING: ${envVar.key} is using a placeholder value. Update it immediately in your deployment platform (e.g., Render Dashboard → Environment).`,
        );
      }
    }

    // PRODUCTION ONLY: Require CORS_ALLOWED_ORIGINS
    if (nodeEnv === 'production') {
      const corsOrigins = process.env.CORS_ALLOWED_ORIGINS;
      if (!corsOrigins || corsOrigins.trim() === '') {
        missing.push({
          key: 'CORS_ALLOWED_ORIGINS',
          required: true,
          description:
            'Comma-separated list of allowed CORS origins (REQUIRED in production)',
        });
      } else if (corsOrigins === 'PLACEHOLDER_UPDATE_IN_RENDER_DASHBOARD') {
        warnings.push(
          `🚨 CRITICAL WARNING: CORS_ALLOWED_ORIGINS is using a placeholder value. Update it immediately in your deployment platform (e.g., Render Dashboard → Environment).`,
        );
      }
    }

    // Check optional variables (just warn)
    for (const envVar of OPTIONAL_ENV_VARS) {
      const value = process.env[envVar.key];

      if (!value || value.trim() === '') {
        warnings.push(
          `⚠️  Optional: ${envVar.key} not set (${envVar.description})`,
        );
      }
    }

    // Fail fast if required vars missing
    if (missing.length > 0) {
      console.error('\n❌ CRITICAL: Missing required environment variables\n');
      console.error('The following environment variables MUST be set:\n');

      for (const envVar of missing) {
        console.error(`  ❌ ${envVar.key}`);
        console.error(`     → ${envVar.description}\n`);
      }

      console.error('Application cannot start without these variables.');
      console.error('Set them in your .env file or environment.\n');

      throw new Error(
        `Missing required environment variables: ${missing.map((v) => v.key).join(', ')}`,
      );
    }

    // Log successful validation
    console.log('✅ Environment variables validated');

    if (warnings.length > 0) {
      console.log(
        '\n⚠️  Optional environment variables not set (using defaults):',
      );
      warnings.forEach((w) => console.log(`   ${w}`));
      console.log('');
    }

    // Log environment info
    console.log(`📦 NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`🗄️  DATABASE: ${this.maskConnectionString(dbUrl!)}`);
    console.log(`🔐 JWT_SECRET: ${this.maskSecret(process.env.JWT_SECRET!)}`);
    console.log('');
  }

  /**
   * Mask sensitive connection strings for logging
   */
  private static maskConnectionString(url: string): string {
    try {
      const parsed = new URL(url);
      if (parsed.password) {
        parsed.password = '***';
      }
      return parsed.toString();
    } catch {
      return url.substring(0, 20) + '***';
    }
  }

  /**
   * Mask secrets for logging
   */
  private static maskSecret(secret: string): string {
    if (!secret) return '(not set)';
    const length = secret.length;
    if (length <= 8) return '***';
    return `${secret.substring(0, 4)}...${secret.substring(length - 4)} (${length} chars)`;
  }
}
