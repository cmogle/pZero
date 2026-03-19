import { runDemoPipeline } from '@/demo/pipeline';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/** GET /api/demo — run signal-to-action pipeline with demo data; returns result for all 6 steps. */
export async function GET() {
  try {
    const result = await runDemoPipeline();
    return NextResponse.json(result);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
