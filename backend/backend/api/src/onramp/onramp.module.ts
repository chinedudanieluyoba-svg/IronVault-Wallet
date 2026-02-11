import { Module } from '@nestjs/common';
import { OnRampService } from './onramp.service';
import { OnRampController } from './onramp.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { WalletModule } from '../wallet/wallet.module';
import { TransactionModule } from '../transaction/transaction.module';
import { MetricsModule } from '../common/metrics/metrics.module';

@Module({
  imports: [PrismaModule, WalletModule, TransactionModule, MetricsModule],
  providers: [OnRampService],
  controllers: [OnRampController],
  exports: [OnRampService],
})
export class OnRampModule {}
