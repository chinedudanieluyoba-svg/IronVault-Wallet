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
    key: 'NODE_ENV',
    required: true,
    description: 'Environment (development/staging/production)',
  },
];

const OPTIONAL_SECRETS: EnvVar[] = [
  {
    key: 'MOONPAY_WEBHOOK_SECRET',
    required: false,
    description:
      'MoonPay webhook signature verification secret (webhook validation will fail without this)',
  },
  {
    key: 'STRIPE_WEBHOOK_SECRET',
    required: false,
    description:
      'Stripe webhook signature verification secret (webhook validation will fail without this)',
  },
  {
    key: 'TRANSAK_WEBHOOK_SECRET',
    required: false,
    description:
      'Transak webhook signature verification secret (webhook validation will fail without this)',
  },
  {
    key: 'PAYSTACK_WEBHOOK_SECRET',
    required: false,
    description:
      'Paystack webhook signature verification secret (webhook validation will fail without this)',
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

// Constants for validation messages
const PLACEHOLDER_VALUE = 'PLACEHOLDER_UPDATE_IN_RENDER_DASHBOARD';
const DEPLOYMENT_PLATFORM_LOCATION =
  'your deployment platform (e.g., Railway Variables)';

export class EnvironmentValidator {
  /**
   * Check if a value is empty or contains only whitespace
   */
  private static isEmptyOrWhitespace(value: string | undefined): boolean {
    return !value || value.trim() === '';
  }

  /**
   * Check if a value is a placeholder
   */
  private static isPlaceholder(value: string | undefined): boolean {
    return value === PLACEHOLDER_VALUE;
  }
  /**
   * Validate required environment variables
   * Throws error if any required var is missing
   */
  static validate(): void {
    const missing: EnvVar[] = [];
    const warnings: string[] = [];

    // Check NODE_ENV first (needed for database URL validation)
    const nodeEnv = process.env.NODE_ENV;
    if (this.isEmptyOrWhitespace(nodeEnv)) {
      console.error('\n❌ CRITICAL: NODE_ENV is required\n');
      throw new Error('NODE_ENV environment variable must be set');
    }

    // Check database URL (single variable across all environments)
    const dbUrl = process.env.DATABASE_URL;
    if (this.isEmptyOrWhitespace(dbUrl)) {
      missing.push({
        key: 'DATABASE_URL',
        required: true,
        description: `PostgreSQL connection string (NODE_ENV=${nodeEnv})`,
      });
    } else if (this.isPlaceholder(dbUrl)) {
      warnings.push(
        `🚨 CRITICAL WARNING: DATABASE_URL is using a placeholder value. Update it immediately in ${DEPLOYMENT_PLATFORM_LOCATION}.`,
      );
    }

    // Check other required variables (excluding DATABASE_URL which we handled above)
    for (const envVar of REQUIRED_ENV_VARS) {
      if (envVar.key === 'DATABASE_URL' || envVar.key === 'NODE_ENV') {
        continue; // Already validated
      }

      const value = process.env[envVar.key];

      if (this.isEmptyOrWhitespace(value)) {
        missing.push(envVar);
      } else if (this.isPlaceholder(value)) {
        warnings.push(
          `🚨 CRITICAL WARNING: ${envVar.key} is using a placeholder value. Update it immediately in ${DEPLOYMENT_PLATFORM_LOCATION}.`,
        );
      }
    }

    // Check optional secrets (warn if missing or placeholder, but don't fail)
    for (const envVar of OPTIONAL_SECRETS) {
      const value = process.env[envVar.key];

      if (this.isEmptyOrWhitespace(value)) {
        warnings.push(
          `🚨 CRITICAL WARNING: ${envVar.key} is NOT SET. ${envVar.description}. Set it in ${DEPLOYMENT_PLATFORM_LOCATION} for full functionality.`,
        );
      } else if (this.isPlaceholder(value)) {
        warnings.push(
          `🚨 CRITICAL WARNING: ${envVar.key} is using a placeholder value. Update it immediately in ${DEPLOYMENT_PLATFORM_LOCATION}.`,
        );
      }
    }

    // PRODUCTION: Warn if CORS_ALLOWED_ORIGINS is not set (CORS will be disabled)
    if (nodeEnv === 'production') {
      const corsOrigins = process.env.CORS_ALLOWED_ORIGINS;
      if (this.isEmptyOrWhitespace(corsOrigins)) {
        warnings.push(
          `🚨 CRITICAL WARNING: CORS_ALLOWED_ORIGINS is NOT SET. CORS will be disabled in production — frontend API requests will fail. Set it in ${DEPLOYMENT_PLATFORM_LOCATION}.`,
        );
      } else if (this.isPlaceholder(corsOrigins)) {
        warnings.push(
          `🚨 CRITICAL WARNING: CORS_ALLOWED_ORIGINS is using a placeholder value. Update it immediately in ${DEPLOYMENT_PLATFORM_LOCATION}.`,
        );
      }
    }

    // Check optional variables (just warn)
    for (const envVar of OPTIONAL_ENV_VARS) {
      const value = process.env[envVar.key];

      if (this.isEmptyOrWhitespace(value)) {
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
    // After validation passes, dbUrl and JWT_SECRET are guaranteed to be set
    // (either with real values or placeholders)
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
