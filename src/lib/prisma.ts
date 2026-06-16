import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
  pool: pg.Pool;
};

const connectionString = process.env.DATABASE_URL;

const poolConfig: pg.PoolConfig = {};

if (connectionString) {
  poolConfig.connectionString = connectionString;
  poolConfig.connectionTimeoutMillis = 5000;
} else if (process.env.NODE_ENV === 'production') {
  throw new Error('DATABASE_URL no configurada en produccion');
}

const pool = globalForPrisma.pool ?? new pg.Pool(poolConfig);
if (process.env.NODE_ENV !== 'production') globalForPrisma.pool = pool;

const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
