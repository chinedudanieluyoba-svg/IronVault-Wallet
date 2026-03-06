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
import { SwapModule } from './swap/swap.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { WalletConnectModule } from './walletconnect/walletconnect.module';
import { TxModule } from './tx/tx.module';
import { NetworkModule } from './network/network.module';
import { SecurityModule } from './security/security.module';

@Module({
  imports: [
    LoggingModule, // ✅ Structured logging with audit trail
    MetricsModule, // ✅ Operational metrics and monitoring
    PrismaModule,
    AuthModule,
    WalletModule,
    WalletConnectModule,
    TransactionModule, // ✅ Atomic transaction handling
    OnRampModule, // ✅ Crypto on-ramp (fiat → crypto)
    SwapModule, // ✅ DEX aggregator swaps
    PortfolioModule, // ✅ Portfolio indexer
    TxModule, // ✅ Transaction engine (build/send/status)
    NetworkModule, // ✅ Multi-chain network registry
    SecurityModule, // ✅ Security + risk engine
    RateLimitModule, // ✅ Rate limiting
    AdminModule, // ✅ Admin endpoints with forensic audit trail
  ],
  controllers: [AppController, HealthController, ProfileController],
  providers: [AppService, ReadinessService, SecretsService],
})
export class AppModule {}
