# ISS-022 — Visitor Analytics Tracking

**Estado:** 🔴 OPEN  
**Prioridad:** 🟡 Media  
**Etiquetas:** `analytics`, `database`, `api`, `prisma`  
**Depende de:** ISS-020 (Prisma + Supabase setup)

---

## Descripción

Al entrar a la web, capturar de forma silenciosa y anónima los datos públicos del visitante: país, ciudad, dispositivo, browser y referrer (de dónde vino).

**Qué capturamos y cómo:**

| Dato | Fuente | Disponible en |
|---|---|---|
| País | Header `x-vercel-ip-country` | Solo Producción (Vercel) |
| Ciudad | Header `x-vercel-ip-city` | Solo Producción (Vercel) |
| Región | Header `x-vercel-ip-country-region` | Solo Producción (Vercel) |
| Browser / OS | Header `user-agent` (parseado) | Dev + Producción |
| Referrer | Header `referer` del request | Dev + Producción |
| Device type | Parseado del `user-agent` | Dev + Producción |

> **Nota:** No almacenamos la dirección IP. Solo datos derivados (país, ciudad). Esto es suficiente para estadísticas y cumple con la Ley 25.326 de Argentina sin necesidad de consentimiento explícito.

---

## Implementación

### 1. Nueva API Route: `/api/analytics/track`

Crear `src/app/api/analytics/track/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function parseDevice(userAgent: string): string {
  if (/mobile/i.test(userAgent)) return 'Mobile';
  if (/tablet|ipad/i.test(userAgent)) return 'Tablet';
  return 'Desktop';
}

function parseBrowser(userAgent: string): string {
  if (/edg/i.test(userAgent)) return 'Edge';
  if (/chrome/i.test(userAgent)) return 'Chrome';
  if (/firefox/i.test(userAgent)) return 'Firefox';
  if (/safari/i.test(userAgent)) return 'Safari';
  if (/opera/i.test(userAgent)) return 'Opera';
  return 'Other';
}

export async function POST(request: Request) {
  try {
    const headers = request.headers;

    // Geo automática de Vercel (vacía en local dev — comportamiento esperado)
    const country = headers.get('x-vercel-ip-country') ?? null;
    const city = decodeURIComponent(headers.get('x-vercel-ip-city') ?? '') || null;
    const region = headers.get('x-vercel-ip-country-region') ?? null;

    // User Agent
    const userAgent = headers.get('user-agent') ?? null;
    const device = userAgent ? parseDevice(userAgent) : null;
    const browser = userAgent ? parseBrowser(userAgent) : null;

    // Referrer
    const referrer = headers.get('referer') ?? null;

    await prisma.visitor.create({
      data: { country, city, region, userAgent, device, browser, referrer },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    // No crashear la app si el tracking falla
    console.error('Analytics tracking error:', error);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
```

> **Principio clave:** Si el tracking falla, retorna `{ ok: false }` con status 200. El visitante nunca se entera ni sufre ningún error.

### 2. Llamar al tracker desde el cliente

En `src/components/AppShell.tsx` (o en `src/app/layout.tsx`), añadir un `useEffect` que se dispare una sola vez al montar:

```typescript
useEffect(() => {
  // Fire-and-forget: no bloqueamos la UI si falla
  fetch('/api/analytics/track', { method: 'POST' }).catch(() => {});
}, []);
```

> **Por qué no usamos `navigator.sendBeacon`:** El endpoint necesita ejecutarse en el servidor para acceder a los headers de Vercel. `sendBeacon` haría el mismo fetch pero sin diferencia funcional para nuestro caso.

### 3. Vincular Visitor con ChatSession (Opcional)

Si el visitante luego abre el chat, podemos vincular la sesión con el visitante para tener contexto completo.

En `GameEngine.tsx`, junto al `sessionId`, guardar también un `visitorId` en `localStorage` (devuelto por la API de tracking). Luego enviarlo a `/api/chat` para que cree el `ChatSession` con `visitorId` incluido.

Esto es **opcional** para el primer release. Puede hacerse como mejora posterior.

---

## Archivos a crear/modificar

| Archivo | Acción |
|---|---|
| `src/app/api/analytics/track/route.ts` | Crear |
| `src/components/AppShell.tsx` | Modificar (añadir useEffect de tracking) |

---

## Criterios de aceptación

- [ ] Al visitar la web en producción, aparece un nuevo registro en la tabla `Visitor` de Supabase
- [ ] Los campos `country` y `city` se llenan correctamente en producción
- [ ] Los campos `device` y `browser` se llenan tanto en dev como en producción
- [ ] Si el endpoint falla (DB no disponible), la app NO muestra ningún error al usuario
- [ ] En local dev, `country` y `city` son `null` (comportamiento esperado y correcto)
- [ ] `npm run build` pasa sin errores

---

## Datos esperados en Supabase (Producción)

| Campo | Ejemplo |
|---|---|
| `country` | `"AR"` |
| `city` | `"Buenos Aires"` |
| `region` | `"B"` |
| `device` | `"Desktop"` |
| `browser` | `"Chrome"` |
| `referrer` | `"https://www.linkedin.com/"` |
| `createdAt` | `2026-05-17T21:30:00Z` |

---

## Estimación

~45 minutos
