import { NextResponse } from 'next/server';
import { albedrioEngine } from '@/lib/albedrio-engine';

export async function POST(request: Request) {
  try {
    const fact = await request.json();
    const events = await albedrioEngine.evaluate(fact);
    return NextResponse.json({ events });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
