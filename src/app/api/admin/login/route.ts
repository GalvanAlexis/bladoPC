import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const validUser = process.env.ADMIN_USER || 'admin';
  const validPass = process.env.ADMIN_PASS || 'admin123';

  if (username === validUser && password === validPass) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { error: 'Credenciales incorrectas' },
    { status: 401 }
  );
}
