import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Parsea el User-Agent para detectar el tipo de dispositivo.
 */
function parseDevice(ua: string): string {
  if (/mobile/i.test(ua)) return 'Mobile';
  if (/tablet|ipad/i.test(ua)) return 'Tablet';
  return 'Desktop';
}

/**
 * Parsea el User-Agent para detectar el browser.
 */
function parseBrowser(ua: string): string {
  if (/edg/i.test(ua)) return 'Edge';
  if (/chrome/i.test(ua)) return 'Chrome';
  if (/firefox/i.test(ua)) return 'Firefox';
  if (/safari/i.test(ua)) return 'Safari';
  if (/opera|opr/i.test(ua)) return 'Opera';
  return 'Other';
}

/**
 * POST /api/analytics/track
 *
 * Registra un visitante único. Captura:
 * - Geo automática via headers de Vercel (solo en producción)
 * - User-Agent (browser, device)
 * - Referrer (de dónde vino el visitante)
 *
 * Principio: Si este endpoint falla, el visitante NO debe verlo.
 * Siempre retorna { ok: true/false } con status 200.
 */
export async function POST(request: Request) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ ok: false, reason: 'DB not configured' });
  }

  try {
    const headers = request.headers;

    // Geo automática de Vercel (solo disponible en producción)
    const country = headers.get('x-vercel-ip-country') ?? null;
    const rawCity = headers.get('x-vercel-ip-city');
    const city = rawCity ? decodeURIComponent(rawCity) : null;
    const region = headers.get('x-vercel-ip-country-region') ?? null;

    // User Agent
    const userAgent = headers.get('user-agent') ?? null;
    const device = userAgent ? parseDevice(userAgent) : null;
    const browser = userAgent ? parseBrowser(userAgent) : null;

    // Referrer (de dónde viene el visitante: LinkedIn, Google, directo, etc.)
    const referrer = headers.get('referer') ?? null;

    await prisma.visitor.create({
      data: {
        country,
        city,
        region,
        userAgent,
        device,
        browser,
        referrer,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[Analytics] Error tracking visitor:', error);
    // Retornar 200 para que el cliente nunca vea un error
    return NextResponse.json({ ok: false });
  }
}
