import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
  pool: pg.Pool;
};

const connectionString = process.env.DATABASE_URL;
const directConnectionString = process.env.DIRECT_URL;

function createPool(): pg.Pool {
  const url = connectionString || directConnectionString;

  if (!url) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('DATABASE_URL no configurada en produccion');
    }
    return new pg.Pool();
  }

  const parsed = new URL(url);
  const config: pg.PoolConfig = {
    host: parsed.hostname,
    port: parseInt(parsed.port, 10) || 5432,
    database: parsed.pathname.replace(/^\//, '') || 'postgres',
    user: decodeURIComponent(parsed.username),
    password: decodeURIComponent(parsed.password),
    connectionTimeoutMillis: 10000,
    ssl: { rejectUnauthorized: false },
    max: 5,
  };

  if (url.includes('pgbouncer=true')) {
    config.max = 1;
  }

  return new pg.Pool(config);
}

const pool = globalForPrisma.pool ?? createPool();
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
