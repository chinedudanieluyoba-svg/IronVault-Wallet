
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../../../../generated/prisma';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool } from '@neondatabase/serverless';

@Injectable()
export class PrismaService
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

    // Create a Pool instance (required by PrismaNeon)
    const pool = new Pool({
      connectionString: dbUrl!,
      ssl: { rejectUnauthorized: false }, // Neon requires SSL
    });

    // Pass Pool to PrismaNeon
    super({
      adapter: new PrismaNeon(pool as any),
    });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('✅ Prisma connected (runtime)');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('🛑 Prisma disconnected');
  }
}
