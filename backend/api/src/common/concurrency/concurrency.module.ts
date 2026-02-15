import { Module } from '@nestjs/common';
import { ConcurrencyLockService } from './concurrency-lock.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ConcurrencyLockService],
  exports: [ConcurrencyLockService],
})
export class ConcurrencyModule {}
