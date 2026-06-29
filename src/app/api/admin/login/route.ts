import { NextResponse } from 'next/server';
import { verifyPassword, signToken, setAuthCookie, getAdminHash } from '@/lib/auth';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const validUser = process.env.ADMIN_USER;
  const validHash = getAdminHash();

  if (!validUser || !validHash) {
    return NextResponse.json(
      { error: 'Admin credentials not configured' },
      { status: 500 }
    );
  }

  if (username !== validUser || !verifyPassword(password, validHash)) {
    return NextResponse.json(
      { error: 'Credenciales incorrectas' },
      { status: 401 }
    );
  }

  const token = signToken({ username: validUser, role: 'admin' });
  const response = NextResponse.json({ success: true });
  setAuthCookie(response, token);
  return response;
}
