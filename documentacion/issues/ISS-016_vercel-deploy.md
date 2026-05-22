# ISS-016 — Deploy a Vercel

**Estado:** 🔴 OPEN  
**Prioridad:** 🟡 Media  
**Etiquetas:** `devops`, `deploy`  
**Depende de:** ISS-013 ✅, ISS-020 ✅, ISS-021 ✅, ISS-022 ✅  
**Branch:** `feature/ISS-016-vercel-deploy`

---

## Descripción

Desplegar **Progresos-Academicos** en Vercel para obtener una URL pública compartible con recruiters y tech leads.

Stack en producción:
- **Next.js 16.2.6** — App Router, Server Components, API Routes
- **Prisma 7 + `@prisma/adapter-pg`** — ORM con pool de conexiones serverless
- **Supabase** — PostgreSQL en la nube (pooler para serverless)
- **Groq SDK** — IA para el chat con Blado

---

## Problemas detectados y resueltos

### 1. `prisma/schema.prisma` sin `url` ni `directUrl` ✅ RESUELTO
Sin estas declaraciones, `prisma generate` falla en el build de Vercel.

**Fix aplicado:**
```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

### 2. Sin `postinstall` en `package.json` ✅ RESUELTO
Vercel no sabía que debía correr `prisma generate` tras instalar dependencias.

**Fix aplicado:**
```json
"postinstall": "prisma generate"
```

El flujo de build de Vercel es: `npm install` → `postinstall (prisma generate)` → `next build`.

---

## Pasos del deploy

### 1. Verificar build local
```bash
npm run build
# Debe terminar sin errores TypeScript ni errores de Prisma
```

### 2. Preparar el repositorio
- [x] `content/` está en el repo (fuente de datos del Skill Tree)
- [x] `public/` con sprites y fondos commiteado
- [x] `.env.local` en `.gitignore` (no se commitea)
- [x] `.env.local.example` como template documentado

### 3. Conectar en Vercel Dashboard

1. Ir a [vercel.com](https://vercel.com) → **Add New Project**
2. **Import Git Repository** → `GalvanAlexis/Progresos-Academicos` (público)
3. Framework: **Next.js** (detectado automático)
4. Build Command: `npm run build` (default)
5. Output Directory: `.next` (default)
6. **No** cambiar nada más — click **Deploy**

### 4. Configurar variables de entorno en Vercel

En **Vercel Dashboard → Settings → Environment Variables**, agregar:

| Variable | Valor | Environments |
|---|---|---|
| `GROQ_API_KEY` | `gsk_xxxxxxxxxxxx` | Production, Preview |
| `DATABASE_URL` | `postgresql://postgres.[REF]:[PWD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1` | Production, Preview |
| `DIRECT_URL` | `postgresql://postgres:[PWD]@db.[REF].supabase.co:5432/postgres` | Production, Preview |

> ⚠️ Obtener `DATABASE_URL` y `DIRECT_URL` en:
> **Supabase Dashboard → Settings → Database**
> - `DATABASE_URL` → Transaction pooler URI (puerto 6543)
> - `DIRECT_URL` → Direct connection URI (puerto 5432)

### 5. Re-deploy tras configurar env vars

Vercel → **Deployments** → **Redeploy** (el primer deploy probablemente falle sin las vars).

---

## Checklist de verificación post-deploy

- [ ] La página principal carga en `https://[proyecto].vercel.app`
- [ ] Los fondos de caverna y sprite de Blado cargan correctamente
- [ ] El diálogo de introducción de Blado se reproduce
- [ ] El chat con IA (Groq) responde correctamente
- [ ] El Skill Tree abre y muestra los nodos de las carreras
- [ ] El historial de chat persiste entre recargas (Supabase)
- [ ] Las analíticas de visitas registran en la DB (POST `/api/analytics`)
- [ ] No hay errores `500` en las API routes

---

## Criterios de aceptación

- [ ] `npm run build` termina sin errores TypeScript
- [ ] `prisma generate` corre en el build de Vercel (via `postinstall`)
- [ ] URL pública accesible y funcional
- [ ] Chat con Blado responde en producción
- [ ] URL compartible para recruiters

---

## Notas técnicas

### `fs` en Vercel (serverless)
Los archivos `content/**/*.md` son leídos con `fs.readFileSync` en Server Components.
En Vercel, el filesystem de solo lectura incluye todos los archivos del bundle — **esto funciona por defecto**, no requiere configuración extra en `next.config.ts`.

### Prisma en serverless
Se usa `PrismaPg` (`@prisma/adapter-pg`) con `pg.Pool` para compatibilidad con el entorno serverless de Vercel. El singleton en `globalThis` evita agotar las conexiones del pooler de Supabase durante el Hot Reload en desarrollo y entre invocaciones en producción.

---

## Estimación

~1.5–2 horas (incluyendo posibles problemas de build)
