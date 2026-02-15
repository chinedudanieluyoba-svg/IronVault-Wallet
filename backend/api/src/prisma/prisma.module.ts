import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { DatabaseSafetyService } from './database-safety.service';

@Module({
  providers: [PrismaService, DatabaseSafetyService],
  exports: [PrismaService, DatabaseSafetyService],
})
export class PrismaModule {}
