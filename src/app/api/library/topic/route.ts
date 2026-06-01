import { NextResponse, NextRequest } from 'next/server';
import { getTopicContent } from '@/lib/markdown';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const career = searchParams.get('career');
    const year = searchParams.get('year');
    const slug = searchParams.get('slug');

    if (!career || !slug) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const data = getTopicContent(career, year ? parseInt(year, 10) : null, slug);
    if (!data) {
      return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in /api/library/topic:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
