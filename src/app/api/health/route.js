import { NextResponse } from 'next/server'
import { runHealthChecks, getBaseUrl } from '@/lib/health'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

// Live health check — runs the suite and returns JSON (no persistence).
export async function GET(request) {
  const baseUrl = getBaseUrl(request)
  try {
    const result = await runHealthChecks({ baseUrl, source: 'manual' })
    return NextResponse.json(result, { status: 200 })
  } catch (err) {
    return NextResponse.json(
      { status: 'down', error: err.message, runAt: new Date().toISOString(), checks: [] },
      { status: 500 }
    )
  }
}
