/**
 * Database Safety Service
 *
 * Validates database state and enforces production safety rules:
 * - Migrations must be applied cleanly
 * - No `prisma db push` in production
 * - Connection pooling configured
 * - Backup monitoring
 */

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

type MigrationStatus = {
  id: string;
  checksum: string;
  finished_at: Date | null;
  migration_name: string;
  logs: string | null;
  rolled_back_at: Date | null;
  started_at: Date;
  applied_steps_count: number;
};

type MigrationReport = {
  ok: boolean;
  total: number;
  applied: number;
  pending: number;
  failed: number;
  rolledBack: number;
  details?: string;
};

@Injectable()
export class DatabaseSafetyService {
  constructor(private prisma: PrismaService) {}

  /**
   * Check migration status
   * Returns OK only if all migrations are cleanly applied
   */
  async checkMigrations(): Promise<MigrationReport> {
    try {
      // Check if _prisma_migrations table exists
      const tableCheck = await this.prisma.$queryRawUnsafe<any[]>(
        "SELECT to_regclass('_prisma_migrations') AS table_name",
      );

      if (!tableCheck[0]?.table_name) {
        return {
          ok: false,
          total: 0,
          applied: 0,
          pending: 0,
          failed: 0,
          rolledBack: 0,
          details:
            '_prisma_migrations table does not exist - database not initialized',
        };
      }

      // Get all migrations
      const migrations = await this.prisma.$queryRawUnsafe<MigrationStatus[]>(
        'SELECT * FROM _prisma_migrations ORDER BY started_at ASC',
      );

      const total = migrations.length;
      const applied = migrations.filter(
        (m) => m.finished_at !== null && m.rolled_back_at === null,
      ).length;
      const pending = migrations.filter((m) => m.finished_at === null).length;
      const rolledBack = migrations.filter(
        (m) => m.rolled_back_at !== null,
      ).length;
      const failed = pending - rolledBack; // Pending but not rolled back = failed

      // All migrations should be cleanly applied
      const ok = pending === 0 && rolledBack === 0 && failed === 0;

      let details: string | undefined;
      if (!ok) {
        const issues: string[] = [];
        if (pending > 0) issues.push(`${pending} pending`);
        if (rolledBack > 0) issues.push(`${rolledBack} rolled back`);
        if (failed > 0) issues.push(`${failed} failed`);
        details = `Migration issues: ${issues.join(', ')}`;
      }

      return {
        ok,
        total,
        applied,
        pending,
        failed,
        rolledBack,
        details,
      };
    } catch (error: any) {
      return {
        ok: false,
        total: 0,
        applied: 0,
        pending: 0,
        failed: 0,
        rolledBack: 0,
        details: `Migration check failed: ${error.message}`,
      };
    }
  }

  /**
   * Verify production safety rules
   * Ensures dangerous operations are blocked
   */
  validateProductionSafety(): { ok: boolean; issues: string[] } {
    const issues: string[] = [];
    const nodeEnv = process.env.NODE_ENV;

    // CRITICAL: Never use `prisma db push` in production
    // It bypasses migration history and can cause data loss
    if (nodeEnv === 'production') {
      // Check for common env vars that suggest db push was used
      if (process.env.PRISMA_DB_PUSH_ALLOWED === 'true') {
        issues.push('PRISMA_DB_PUSH_ALLOWED=true is FORBIDDEN in production');
      }

      // Validate connection string uses SSL in production
      const dbUrl =
        process.env.DATABASE_URL_PROD ||
        process.env.DATABASE_URL ||
        process.env.DATABASE_URL_DEV;
      if (
        dbUrl &&
        !dbUrl.includes('sslmode=require') &&
        !dbUrl.includes('ssl=true')
      ) {
        issues.push('Database connection must use SSL in production');
      }

      // Validate connection pooling is configured
      const maxConnections = parseInt(
        process.env.DATABASE_MAX_CONNECTIONS || '10',
        10,
      );
      if (maxConnections > 100) {
        issues.push(
          `DATABASE_MAX_CONNECTIONS=${maxConnections} is too high (recommend ≤100)`,
        );
      }
    }

    return {
      ok: issues.length === 0,
      issues,
    };
  }

  /**
   * Get database size and table counts
   * Useful for backup monitoring
   */
  async getDatabaseStats(): Promise<{
    sizeBytes: number;
    sizeMB: number;
    tableCount: number;
    tables: Array<{ name: string; rowCount: number }>;
  }> {
    try {
      // Get database size
      const sizeQuery = await this.prisma.$queryRawUnsafe<any[]>(
        'SELECT pg_database_size(current_database()) AS size_bytes',
      );
      const sizeBytes = parseInt(sizeQuery[0]?.size_bytes || '0', 10);
      const sizeMB = Math.round(sizeBytes / 1024 / 1024);

      // Get table counts
      const tables = await this.prisma.$queryRawUnsafe<any[]>(`
        SELECT 
          schemaname || '.' || tablename AS name,
          n_live_tup AS row_count
        FROM pg_stat_user_tables
        WHERE schemaname = 'public'
        ORDER BY n_live_tup DESC
      `);

      return {
        sizeBytes,
        sizeMB,
        tableCount: tables.length,
        tables: tables.map((t) => ({
          name: t.name,
          rowCount: parseInt(t.row_count || '0', 10),
        })),
      };
    } catch (error: any) {
      throw new Error(`Failed to get database stats: ${error.message}`);
    }
  }

  /**
   * Verify backup configuration exists
   * Production requires backup strategy
   */
  validateBackupConfig(): { ok: boolean; issues: string[] } {
    const issues: string[] = [];
    const nodeEnv = process.env.NODE_ENV;

    if (nodeEnv === 'production') {
      // Check for backup configuration
      if (
        !process.env.BACKUP_ENABLED ||
        process.env.BACKUP_ENABLED !== 'true'
      ) {
        issues.push('BACKUP_ENABLED must be set to "true" in production');
      }

      if (!process.env.BACKUP_RETENTION_DAYS) {
        issues.push('BACKUP_RETENTION_DAYS must be configured');
      }

      const lastBackupTest = process.env.LAST_BACKUP_RESTORE_TEST_DATE;
      if (!lastBackupTest) {
        issues.push(
          'LAST_BACKUP_RESTORE_TEST_DATE not set - backups must be tested regularly',
        );
      } else {
        // Warn if backup restore not tested in last 90 days
        const lastTest = new Date(lastBackupTest);
        const daysSinceTest = Math.floor(
          (Date.now() - lastTest.getTime()) / (1000 * 60 * 60 * 24),
        );
        if (daysSinceTest > 90) {
          issues.push(
            `Backup restore test is ${daysSinceTest} days old - test backups every 90 days`,
          );
        }
      }
    }

    return {
      ok: issues.length === 0,
      issues,
    };
  }
}
