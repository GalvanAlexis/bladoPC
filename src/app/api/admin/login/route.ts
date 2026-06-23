import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const validUser = process.env.ADMIN_USER;
  const validPass = process.env.ADMIN_PASS;

  if (!validUser || !validPass) {
    return NextResponse.json(
      { error: 'Admin credentials not configured' },
      { status: 500 }
    );
  }

  if (username === validUser && password === validPass) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { error: 'Credenciales incorrectas' },
    { status: 401 }
  );
}
