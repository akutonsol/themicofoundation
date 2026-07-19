import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'
import { runHealthChecks, getBaseUrl } from '@/lib/health'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

// Scheduled health check (Vercel Cron). Runs the suite, stores a healthCheck
// document, and prunes old runs. Vercel Cron sends `Authorization: Bearer
// <CRON_SECRET>` automatically when CRON_SECRET is set in the environment.
async function handle(request) {
  const secret = process.env.CRON_SECRET
  if (secret) {
    const auth = request.headers.get('authorization')
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  const baseUrl = getBaseUrl(request)
  const result = await runHealthChecks({ baseUrl, source: 'cron' })

  try {
    await writeClient.create({
      _type: 'healthCheck',
      runAt: result.runAt,
      status: result.status,
      durationMs: result.durationMs,
      source: result.source,
      summary: result.summary,
      checks: result.checks.map(c => ({
        _key: `${c.category}-${c.name}`.replace(/[^a-z0-9]/gi, '').toLowerCase(),
        name: c.name,
        category: c.category,
        ok: c.ok,
        critical: !!c.critical,
        ms: c.ms || 0,
        detail: c.detail || '',
      })),
    })

    // Prune runs older than 30 days to keep the dataset tidy.
    const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    await writeClient.delete({ query: '*[_type == "healthCheck" && runAt < $cutoff]', params: { cutoff } })
  } catch (err) {
    // Persistence failure shouldn't hide the health result.
    return NextResponse.json({ ...result, persisted: false, persistError: err.message }, { status: 200 })
  }

  return NextResponse.json({ ...result, persisted: true }, { status: 200 })
}

export async function GET(request) { return handle(request) }
export async function POST(request) { return handle(request) }
