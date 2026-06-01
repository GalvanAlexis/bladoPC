import { NextResponse } from 'next/server';
import { getLibraryData } from '@/lib/markdown';

export async function GET() {
  try {
    const data = getLibraryData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in /api/library:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
