# ISS-020 — Setup Prisma + Supabase

**Estado:** 🔴 OPEN  
**Prioridad:** 🔴 Alta  
**Etiquetas:** `database`, `prisma`, `supabase`, `config`  

---

## Descripción

Integrar Prisma como ORM y Supabase como proveedor de base de datos PostgreSQL en el proyecto.  
Este ISS es el **prerequisito bloqueante** para ISS-021 e ISS-022. Una vez completado, el proyecto tendrá una capa de persistencia robusta y lista para producción.

> Supabase se usa **solo como base de datos PostgreSQL**. No se usa el SDK de Supabase JS — Prisma maneja todas las queries. Esto mantiene el código portable y limpio.

---

## Pasos de implementación

### 1. Crear proyecto en Supabase
- Ir a [https://supabase.com](https://supabase.com) → "New Project".
- Elegir región más cercana (preferentemente `sa-east-1` — São Paulo).
- Guardar la contraseña de la DB en un lugar seguro.

### 2. Obtener la DATABASE_URL
En el dashboard de Supabase: **Settings → Database → Connection string → URI**  
Usar la URI de tipo **"Transaction pooler"** (recomendada para serverless/Vercel):
```
postgresql://postgres.[REF]:[PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
```

### 3. Instalar dependencias
```bash
npm install prisma @prisma/client
npx prisma init
```

### 4. Configurar el schema
Crear/reemplazar `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

model Visitor {
  id        String        @id @default(cuid())
  createdAt DateTime      @default(now())
  country   String?
  city      String?
  region    String?
  userAgent String?
  device    String?
  browser   String?
  referrer  String?
  sessions  ChatSession[]

  @@index([country])
  @@index([createdAt])
}

model ChatSession {
  id        String    @id @default(cuid())
  createdAt DateTime  @default(now())
  visitor   Visitor?  @relation(fields: [visitorId], references: [id])
  visitorId String?
  messages  Message[]
}

model Message {
  id        String      @id @default(cuid())
  createdAt DateTime    @default(now())
  role      String
  content   String
  session   ChatSession @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  sessionId String

  @@index([sessionId])
  @@index([createdAt])
}
```

### 5. Configurar variables de entorno

Agregar a `.env.local`:
```env
# Supabase / Prisma (Transaction pooler — para Vercel/Serverless)
DATABASE_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"

# Supabase / Prisma (Direct connection — para migraciones locales)
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres"
```

Actualizar `.env.local.example` con las dos variables documentadas (sin valores reales).

### 6. Correr la migración inicial
```bash
npx prisma migrate dev --name init
```

### 7. Crear el Prisma Client Singleton

Crear `src/lib/prisma.ts`:
```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

> **Por qué el singleton:** Next.js en modo desarrollo recrea módulos con Hot Reload. Sin el singleton, se crearían cientos de conexiones abiertas a la DB.

### 8. Agregar a Vercel (Producción)
En Vercel Dashboard → Settings → Environment Variables:
- `DATABASE_URL` → Transaction pooler URL
- `DIRECT_URL` → Direct connection URL

### 9. Actualizar .gitignore
Verificar que `prisma/migrations/` NO esté ignorado (deben commitearse las migraciones).

---

## Archivos a crear/modificar

| Archivo | Acción |
|---|---|
| `prisma/schema.prisma` | Crear |
| `src/lib/prisma.ts` | Crear |
| `.env.local` | Modificar (agregar DATABASE_URL y DIRECT_URL) |
| `.env.local.example` | Modificar (documentar las nuevas variables) |

---

## Criterios de aceptación

- [ ] `npx prisma migrate dev --name init` corre sin errores
- [ ] Las 3 tablas (`Visitor`, `ChatSession`, `Message`) existen en Supabase (verificar en Table Editor)
- [ ] `src/lib/prisma.ts` exporta el singleton correctamente
- [ ] `npm run build` sigue pasando sin errores
- [ ] `DATABASE_URL` y `DIRECT_URL` documentadas en `.env.local.example`

---

## Estimación

~60 minutos

---

## Referencias

- [Prisma + Supabase Quickstart](https://supabase.com/docs/guides/integrations/prisma)
- [Prisma con Next.js (best practices)](https://www.prisma.io/docs/guides/nextjs)
- [Vercel + Prisma Connection Pooling](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
