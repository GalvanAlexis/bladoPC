import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getTokenFromRequest, verifyToken, clearAuthCookie } from '@/lib/auth';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/api/admin/login') {
    return NextResponse.next();
  }

  if (pathname.startsWith('/api/admin/')) {
    const token = getTokenFromRequest(request);

    if (!token) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      const response = NextResponse.json(
        { error: 'Sesion expirada o invalida' },
        { status: 401 }
      );
      clearAuthCookie(response);
      return response;
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-admin-user', payload.username);
    requestHeaders.set('x-admin-authenticated', 'true');

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/admin/:path*',
};
