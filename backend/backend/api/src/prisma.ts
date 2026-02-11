import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool } from '@neondatabase/serverless';

// Select DB URL based on NODE_ENV for runtime with fallback chain
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

export const prisma = new PrismaClient({
  adapter: new PrismaNeon(pool as any),
});
