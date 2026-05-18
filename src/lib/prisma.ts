import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
  pool: pg.Pool;
};

const connectionString = process.env.DATABASE_URL;

/**
 * Singleton de PrismaClient y pg.Pool para Next.js en Prisma 7.
 *
 * En desarrollo, Next.js recrea módulos con Hot Reload (HMR).
 * Almacenamos el Pool y PrismaClient en `globalThis` para evitar
 * agotar las conexiones del pool de Supabase.
 */
const pool = globalForPrisma.pool ?? new pg.Pool({ connectionString });
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
