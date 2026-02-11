import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DatabaseSafetyService } from '../prisma/database-safety.service';
import { SecretsService } from '../config/secrets.service';
import { AdminService } from '../admin/admin.service';
import { ProviderReconciliationService } from '../admin/provider-reconciliation.service';
import { WebhookRetryService } from '../admin/webhook-retry.service';
import { DeadLetterQueueService } from '../admin/dead-letter-queue.service';
import { AlertsService } from '../admin/alerts.service';

type ReadinessCheck = {
  ok: boolean;
  details?: string;
};

type ReadinessReport = {
  ok: boolean;
  checks: {
    database: ReadinessCheck;
    migrations: ReadinessCheck;
    databaseSafety: ReadinessCheck;
    backupConfig: ReadinessCheck;
    secrets: ReadinessCheck;
    services: ReadinessCheck & { loaded?: Record<string, boolean> };
  };
};

@Injectable()
export class ReadinessService {
  constructor(
    private prisma: PrismaService,
    private databaseSafety: DatabaseSafetyService,
    private secrets: SecretsService,
    private adminService: AdminService,
    private providerReconciliationService: ProviderReconciliationService,
    private webhookRetryService: WebhookRetryService,
    private deadLetterQueueService: DeadLetterQueueService,
    private alertsService: AlertsService,
  ) {}

  async checkReady(): Promise<ReadinessReport> {
    const database = await this.checkDatabase();
    const migrations = await this.checkMigrations();
    const databaseSafety = await this.checkDatabaseSafety();
    const backupConfig = this.checkBackupConfig();
    const secrets = this.checkSecrets();
    const services = this.checkServices();

    const ok =
      database.ok &&
      migrations.ok &&
      databaseSafety.ok &&
      backupConfig.ok &&
      secrets.ok &&
      services.ok;

    return {
      ok,
      checks: {
        database,
        migrations,
        databaseSafety,
        backupConfig,
        secrets,
        services,
      },
    };
  }

  private async checkDatabase(): Promise<ReadinessCheck> {
    try {
      await this.prisma.$queryRawUnsafe('SELECT 1');
      return { ok: true };
    } catch (error: any) {
      return { ok: false, details: error?.message || 'Database unreachable' };
    }
  }

  private async checkMigrations(): Promise<ReadinessCheck> {
    try {
      const report = await this.databaseSafety.checkMigrations();

      if (!report.ok) {
        return { ok: false, details: report.details };
      }

      return {
        ok: true,
        details: `${report.applied}/${report.total} migrations applied`,
      };
    } catch (error: any) {
      return { ok: false, details: error?.message || 'Migration check failed' };
    }
  }

  private async checkDatabaseSafety(): Promise<ReadinessCheck> {
    try {
      const safety = this.databaseSafety.validateProductionSafety();

      if (!safety.ok) {
        return { ok: false, details: safety.issues.join('; ') };
      }

      return { ok: true };
    } catch (error: any) {
      return { ok: false, details: error?.message || 'Safety check failed' };
    }
  }

  private checkBackupConfig(): ReadinessCheck {
    const nodeEnv = process.env.NODE_ENV;

    // Only enforce in production
    if (nodeEnv !== 'production') {
      return { ok: true, details: 'Skipped (not production)' };
    }

    const validation = this.databaseSafety.validateBackupConfig();

    if (!validation.ok) {
      return { ok: false, details: validation.issues.join('; ') };
    }

    return { ok: true };
  }

  private checkSecrets(): ReadinessCheck {
    const nodeEnv = process.env.NODE_ENV;

    // Only enforce in production
    if (nodeEnv !== 'production') {
      return { ok: true, details: 'Skipped (not production)' };
    }

    const report = this.secrets.validateSecrets();

    if (!report.ok) {
      const issues = report.warnings.join('; ');
      return { ok: false, details: issues };
    }

    if (report.warnings.length > 0) {
      return {
        ok: true,
        details: `${report.warnings.length} rotation warnings`,
      };
    }

    return { ok: true };
  }

  private checkServices(): ReadinessCheck & {
    loaded: Record<string, boolean>;
  } {
    const loaded = {
      adminService: !!this.adminService,
      providerReconciliationService: !!this.providerReconciliationService,
      webhookRetryService: !!this.webhookRetryService,
      deadLetterQueueService: !!this.deadLetterQueueService,
      alertsService: !!this.alertsService,
    };

    const ok = Object.values(loaded).every(Boolean);

    return {
      ok,
      loaded,
      details: ok ? undefined : 'Critical services not loaded',
    };
  }
}
