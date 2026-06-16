import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkRateLimit, getClientIp, RateLimitConfig } from '@/lib/rateLimit';

const API_RATE_LIMIT: RateLimitConfig = { maxRequests: 30, windowMs: 60000 };

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Security headers
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "connect-src 'self' https://api.groq.com",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "base-uri 'self'",
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Rate limiting for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = getClientIp(request);
    const route = request.nextUrl.pathname;
    const limitKey = `${ip}:${route}`;
    const result = checkRateLimit(limitKey, API_RATE_LIMIT);

    if (!result.allowed) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Intenta de nuevo en un momento.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil(result.resetIn / 1000)),
          },
        },
      );
    }
  }

  // Origin check for POST requests
  if (request.method === 'POST' && request.nextUrl.pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin');
    const referer = request.headers.get('referer');
    const host = request.headers.get('host');

    if (!host) {
      return NextResponse.json({ error: 'Host header missing' }, { status: 400 });
    }

    const allowedOrigins = [
      `https://${host}`,
      `http://${host}`,
      ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
    ];

    if (origin && !allowedOrigins.some(o => origin.startsWith(o))) {
      return NextResponse.json({ error: 'Origen no permitido' }, { status: 403 });
    }

    if (referer && !allowedOrigins.some(o => referer.startsWith(o))) {
      return NextResponse.json({ error: 'Referer no permitido' }, { status: 403 });
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|file.svg|globe.svg|next.svg|vercel.svg|window.svg|games/|video/).*)',
  ],
};
