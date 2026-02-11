import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool } from '@neondatabase/serverless';

@Injectable()
export class SecPrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    // Select DB URL based on NODE_ENV with fallback chain
    const dbUrl = process.env.NODE_ENV === 'production' 
      ? (process.env.DATABASE_URL_PROD || process.env.DATABASE_URL)
      : process.env.NODE_ENV === 'staging'
      ? (process.env.DATABASE_URL_STAGING || process.env.DATABASE_URL)
      : (process.env.DATABASE_URL_DEV || process.env.DATABASE_URL);

    if (!dbUrl) {
      throw new Error('DATABASE_URL is not defined. Please set DATABASE_URL or environment-specific URL.');
    }

    const pool = new Pool({
      connectionString: dbUrl,
      ssl: { rejectUnauthorized: false },
    });

    super({
      adapter: new PrismaNeon(pool as any),
    });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('✅ Sec Prisma connected');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('🛑 Sec Prisma disconnected');
  }
}
