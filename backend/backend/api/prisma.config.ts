import 'dotenv/config';

/**
 * Prisma Configuration
 * 
 * This file ensures environment variables are loaded before Prisma operations.
 * The dotenv/config import at the top loads .env files automatically.
 */

export const prismaConfig = {
  // Prisma will use DATABASE_URL from environment variables
  // which are now loaded via dotenv/config
  datasourceUrl: process.env.DATABASE_URL || 
                 process.env.DATABASE_URL_PROD || 
                 process.env.DATABASE_URL_STAGING || 
                 process.env.DATABASE_URL_DEV,
};

export default prismaConfig;
