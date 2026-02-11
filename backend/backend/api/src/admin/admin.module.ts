import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { ProviderReconciliationService } from './provider-reconciliation.service';
import { WebhookRetryService } from './webhook-retry.service';
import { DeadLetterQueueService } from './dead-letter-queue.service';
import { AlertsService } from './alerts.service';
import { AdminAccessLogger } from './admin-access.logger';
import { LedgerIntegrityMonitor } from './ledger-integrity.monitor';
import { ProviderReconciliationMonitor } from './provider-reconciliation.monitor';
import { WebhookRetryMonitor } from './webhook-retry.monitor';
import { PrismaModule } from '../prisma/prisma.module';
import { LoggingModule } from '../common/logging/logging.module';

@Module({
  imports: [PrismaModule, LoggingModule],
  controllers: [AdminController],
  providers: [
    AdminService,
    ProviderReconciliationService,
    WebhookRetryService,
    DeadLetterQueueService,
    AlertsService,
    AdminAccessLogger,
    LedgerIntegrityMonitor,
    ProviderReconciliationMonitor,
    WebhookRetryMonitor,
  ],
  exports: [
    AdminService,
    ProviderReconciliationService,
    WebhookRetryService,
    DeadLetterQueueService,
    AlertsService,
    AdminAccessLogger,
  ],
})
export class AdminModule {}
