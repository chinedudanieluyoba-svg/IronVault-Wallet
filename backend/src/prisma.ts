import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

// Required for Node.js environments without native WebSocket support (Node.js < 22)
neonConfig.webSocketConstructor = ws;

// Optimize for financial workloads: disable connection pipelining and write
// coalescing to ensure strict ordering and transactional integrity.
neonConfig.pipelineConnect = false;
neonConfig.coalesceWrites = false;

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error('DATABASE_URL is not defined. Please set DATABASE_URL.');
}

// Pass PoolConfig directly to PrismaNeon (Prisma 7.x API)
export const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: dbUrl }),
});
