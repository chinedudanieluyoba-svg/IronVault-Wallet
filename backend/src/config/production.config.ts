/**
 * Production Environment Configuration
 *
 * Enforces production-safe settings:
 * - Debug logs disabled
 * - Stack traces hidden from API responses
 * - CORS locked to known domains
 * - No dev conveniences
 */

export interface ProductionConfig {
  isProduction: boolean;
  isStaging: boolean;
  isDevelopment: boolean;
  corsOrigins: string[];
  logLevel: 'error' | 'warn' | 'log' | 'debug' | 'verbose';
  exposeStackTraces: boolean;
}

export class ProductionConfigService {
  private static config: ProductionConfig;

  static getConfig(): ProductionConfig {
    if (!this.config) {
      this.config = this.buildConfig();
    }
    return this.config;
  }

  private static buildConfig(): ProductionConfig {
    const nodeEnv = process.env.NODE_ENV || 'development';
    const isProduction = nodeEnv === 'production';
    const isStaging = nodeEnv === 'staging';
    const isDevelopment = nodeEnv === 'development';

    return {
      isProduction,
      isStaging,
      isDevelopment,

      // CORS: Lock down in production
      corsOrigins: this.getCorsOrigins(nodeEnv),

      // Logging: Disable debug logs in production
      logLevel: this.getLogLevel(nodeEnv),

      // Security: Hide stack traces in production
      exposeStackTraces: isDevelopment,
    };
  }

  private static getCorsOrigins(nodeEnv: string): string[] {
    if (nodeEnv === 'production') {
      // PRODUCTION: Only allow known domains
      const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS;
      if (!allowedOrigins) {
        console.warn(
          '⚠️  CORS_ALLOWED_ORIGINS not set in production - defaulting to none',
        );
        return [];
      }
      return allowedOrigins.split(',').map((origin) => origin.trim());
    }

    if (nodeEnv === 'staging') {
      // STAGING: Allow staging domains
      const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS;
      if (!allowedOrigins) {
        console.warn(
          '⚠️  CORS_ALLOWED_ORIGINS not set in staging - allowing localhost',
        );
        return ['http://localhost:3000', 'http://localhost:3001'];
      }
      return allowedOrigins.split(',').map((origin) => origin.trim());
    }

    // DEVELOPMENT: Allow all localhost ports
    return [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:8080',
    ];
  }

  private static getLogLevel(
    nodeEnv: string,
  ): 'error' | 'warn' | 'log' | 'debug' | 'verbose' {
    if (nodeEnv === 'production') {
      return 'error'; // PRODUCTION: Only log errors
    }
    if (nodeEnv === 'staging') {
      return 'warn'; // STAGING: Errors + warnings
    }
    return 'debug'; // DEVELOPMENT: Full logging
  }

  static logConfig(): void {
    const config = this.getConfig();

    console.log('🔒 Production Config:');
    console.log(`   Environment: ${process.env.NODE_ENV}`);
    console.log(`   Log Level: ${config.logLevel}`);
    console.log(
      `   Stack Traces: ${config.exposeStackTraces ? 'EXPOSED (dev only)' : 'HIDDEN (secure)'}`,
    );
    console.log(
      `   CORS Origins: ${config.corsOrigins.length > 0 ? config.corsOrigins.join(', ') : 'NONE (locked)'}`,
    );
    console.log('');
  }
}
