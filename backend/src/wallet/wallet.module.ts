import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletLedgerService } from './services/wallet-ledger.service';
import { WalletController } from './wallet.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { MetricsModule } from '../common/metrics/metrics.module';
import { IdempotencyModule } from '../common/idempotency/idempotency.module';
import { ConcurrencyModule } from '../common/concurrency/concurrency.module';

@Module({
  imports: [PrismaModule, MetricsModule, IdempotencyModule, ConcurrencyModule],
  providers: [WalletService, WalletLedgerService],
  controllers: [WalletController],
  exports: [WalletService, WalletLedgerService],
})
export class WalletModule {}
