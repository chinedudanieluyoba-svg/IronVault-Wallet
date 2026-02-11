import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProfileController } from './profile/profile.controller';
import { WalletModule } from './wallet/wallet.module';
import { TransactionModule } from './transaction/transaction.module';
import { OnRampModule } from './onramp/onramp.module';
import { RateLimitModule } from './common/rate-limit/rate-limit.module';
import { LoggingModule } from './common/logging/logging.module';
import { MetricsModule } from './common/metrics/metrics.module';
import { AdminModule } from './admin/admin.module';
import { HealthController } from './health/health.controller';
import { ReadinessService } from './health/readiness.service';
import { SecretsService } from './config/secrets.service';

@Module({
  imports: [
    LoggingModule, // ✅ Structured logging with audit trail
    MetricsModule, // ✅ Operational metrics and monitoring
    PrismaModule,
    AuthModule,
    WalletModule,
    TransactionModule, // ✅ Atomic transaction handling
    OnRampModule, // ✅ Crypto on-ramp (fiat → crypto)
    RateLimitModule, // ✅ Rate limiting
    AdminModule, // ✅ Admin endpoints with forensic audit trail
  ],
  controllers: [AppController, HealthController, ProfileController],
  providers: [AppService, ReadinessService, SecretsService],
})
export class AppModule {}
