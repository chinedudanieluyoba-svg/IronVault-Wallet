import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { AuditLogger } from '../logging/audit.logger';

@Module({
  providers: [MetricsService, AuditLogger],
  exports: [MetricsService],
})
export class MetricsModule {}
