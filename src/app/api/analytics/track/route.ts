import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function parseDevice(ua: string): string {
  if (/mobile/i.test(ua)) return 'Mobile';
  if (/tablet|ipad/i.test(ua)) return 'Tablet';
  return 'Desktop';
}

function parseBrowser(ua: string): string {
  if (/edg/i.test(ua)) return 'Edge';
  if (/chrome/i.test(ua)) return 'Chrome';
  if (/firefox/i.test(ua)) return 'Firefox';
  if (/safari/i.test(ua)) return 'Safari';
  if (/opera|opr/i.test(ua)) return 'Opera';
  return 'Other';
}

export async function POST(request: Request) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ ok: false, reason: 'DB not configured' });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { page, title, sessionId } = body;

    const headers = request.headers;
    const country = headers.get('x-vercel-ip-country') ?? null;
    const rawCity = headers.get('x-vercel-ip-city');
    const city = rawCity ? decodeURIComponent(rawCity) : null;
    const region = headers.get('x-vercel-ip-country-region') ?? null;
    const userAgent = headers.get('user-agent') ?? null;
    const device = userAgent ? parseDevice(userAgent) : null;
    const browser = userAgent ? parseBrowser(userAgent) : null;
    const referrer = headers.get('referer') ?? null;

    if (sessionId) {
      const existing = await prisma.visitor.findFirst({
        where: { id: sessionId },
        select: { id: true },
      });

      if (existing) {
        await prisma.visitor.update({
          where: { id: sessionId },
          data: { lastSeenAt: new Date() },
        });
      }

      await prisma.pageView.create({
        data: {
          path: page || '/',
          title: title || null,
          visitorId: sessionId,
        },
      });

      return NextResponse.json({ ok: true });
    }

    const visitor = await prisma.visitor.create({
      data: {
        country,
        city,
        region,
        userAgent,
        device,
        browser,
        referrer,
        pageViews: {
          create: {
            path: page || '/',
            title: title || null,
          },
        },
      },
    });

    return NextResponse.json({ ok: true, visitorId: visitor.id });
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'code' in error) {
      const code = (error as { code: string }).code;
      if (code === 'ECONNREFUSED' || code === 'P1001') {
        console.warn('[Analytics] Skipped tracking: DB connection refused');
      }
    } else {
      console.error('[Analytics] Error tracking:', error);
    }
    return NextResponse.json({ ok: false });
  }
}
