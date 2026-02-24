import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool } from '@neondatabase/serverless';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const dbUrl = process.env.DATABASE_URL;

    if (!dbUrl) {
      throw new Error('DATABASE_URL is not defined. Please set DATABASE_URL.');
    }

    // Create a Pool instance (required by PrismaNeon)
    const pool = new Pool({
      connectionString: dbUrl,
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
