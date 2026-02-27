import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const CONNECT_RETRIES = Number(process.env.DB_CONNECT_RETRIES ?? '5');
const CONNECT_RETRY_BASE_MS = Number(
  process.env.DB_CONNECT_RETRY_BASE_MS ?? '500',
);

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    const dbUrl = process.env.DATABASE_URL;

    if (!dbUrl) {
      throw new Error('DATABASE_URL is not defined. Please set DATABASE_URL.');
    }

    const pool = new Pool({
      connectionString: dbUrl,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    super({
      adapter: new PrismaPg(pool),
    });
  }

  async onModuleInit() {
    await this.connectWithRetry();
    this.logger.log('✅ Prisma connected (runtime)');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('🛑 Prisma disconnected');
  }

  /**
   * Attempt $connect with exponential-backoff retries.
   * Controlled via DB_CONNECT_RETRIES (default 5) and
   * DB_CONNECT_RETRY_BASE_MS (default 500 ms).
   * Delay is capped at 5 seconds per attempt.
   */
  private async connectWithRetry(): Promise<void> {
    const maxDelayMs = 5_000;
    for (let attempt = 1; attempt <= CONNECT_RETRIES; attempt++) {
      try {
        await this.$connect();
        return;
      } catch (error) {
        if (attempt >= CONNECT_RETRIES) {
          throw error;
        }
        const delayMs = Math.min(
          CONNECT_RETRY_BASE_MS * 2 ** (attempt - 1),
          maxDelayMs,
        );
        this.logger.warn(
          `DB connection attempt ${attempt}/${CONNECT_RETRIES} failed, retrying in ${delayMs}ms`,
        );
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }
}
