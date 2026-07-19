import { createClient } from '@sanity/client'

const readClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Pages the maintenance system pings each run. `critical` pages failing → site "down".
const PAGES = [
  { path: '/', label: 'Home', critical: true },
  { path: '/about', label: 'About' },
  { path: '/trustees', label: 'Trustees' },
  { path: '/team', label: 'Team' },
  { path: '/project-overview', label: 'Projects Overview' },
  { path: '/projects', label: 'Projects' },
  { path: '/endowments', label: 'Endowments' },
  { path: '/news', label: 'News & Events' },
  { path: '/messages', label: 'Messages' },
  { path: '/contact', label: 'Contact' },
  { path: '/donate', label: 'Donate' },
  { path: '/pledge', label: 'Pledge' },
  { path: '/resourcecenter', label: 'Resource Center' },
]

// Env vars grouped by concern. `critical` groups failing → site "down".
const ENV_GROUPS = [
  { category: 'CMS', critical: true, vars: ['NEXT_PUBLIC_SANITY_PROJECT_ID', 'SANITY_API_WRITE_TOKEN'] },
  { category: 'Email', vars: ['EMAIL_USER', 'EMAIL_PASSWORD', 'ADMIN_EMAIL'] },
  { category: 'Payments', vars: ['POWERTRANZ_ID', 'POWERTRANZ_PASSWORD', 'POWERTRANZ_BASE_URL'] },
  { category: 'Site', vars: ['NEXT_PUBLIC_SITE_URL'] },
]

const PAGE_TIMEOUT_MS = 7000
const SLOW_MS = 3500

export function getBaseUrl(request) {
  const env = process.env.NEXT_PUBLIC_SITE_URL
  if (env) return env.replace(/\/$/, '')
  try {
    const u = new URL(request.url)
    return `${u.protocol}//${u.host}`
  } catch { /* ignore */ }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'http://localhost:3000'
}

async function timedFetch(url) {
  const started = Date.now()
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), PAGE_TIMEOUT_MS)
  try {
    const res = await fetch(url, { signal: controller.signal, redirect: 'manual', cache: 'no-store' })
    const ms = Date.now() - started
    // 2xx and 3xx (redirects) both count as reachable
    const ok = res.status < 400
    return { ok, status: res.status, ms }
  } catch (err) {
    return { ok: false, status: 0, ms: Date.now() - started, error: err.name === 'AbortError' ? 'timeout' : err.message }
  } finally {
    clearTimeout(timer)
  }
}

export async function runHealthChecks({ baseUrl, source = 'manual' }) {
  const runAt = new Date().toISOString()
  const started = Date.now()
  const checks = []

  // 1) Sanity CMS connectivity
  {
    const t = Date.now()
    try {
      const count = await readClient.fetch('count(*[_type == "project"])')
      checks.push({ name: 'Sanity CMS', category: 'CMS', ok: true, critical: true, ms: Date.now() - t, detail: `Connected · ${count} project docs` })
    } catch (err) {
      checks.push({ name: 'Sanity CMS', category: 'CMS', ok: false, critical: true, ms: Date.now() - t, detail: `Unreachable: ${err.message}` })
    }
  }

  // 2) Pages (in parallel)
  const pageResults = await Promise.all(
    PAGES.map(async p => {
      const r = await timedFetch(baseUrl + p.path)
      const slow = r.ok && r.ms > SLOW_MS
      return {
        name: p.label,
        category: 'Pages',
        ok: r.ok,
        critical: !!p.critical,
        ms: r.ms,
        slow,
        detail: r.ok
          ? `${r.status} · ${r.ms}ms${slow ? ' · slow' : ''}`
          : `Failed (${r.error || r.status})`,
        path: p.path,
      }
    })
  )
  checks.push(...pageResults)

  // 3) Env / configuration presence
  for (const g of ENV_GROUPS) {
    const missing = g.vars.filter(v => !process.env[v] || !String(process.env[v]).trim())
    checks.push({
      name: `${g.category} config`,
      category: 'Config',
      ok: missing.length === 0,
      critical: !!g.critical,
      ms: 0,
      detail: missing.length === 0 ? `${g.vars.length}/${g.vars.length} set` : `Missing: ${missing.join(', ')}`,
    })
  }

  const durationMs = Date.now() - started
  const failed = checks.filter(c => !c.ok)
  const criticalFailed = failed.filter(c => c.critical)
  const slowCount = checks.filter(c => c.slow).length

  let status = 'healthy'
  if (criticalFailed.length > 0) status = 'down'
  else if (failed.length > 0 || slowCount > 0) status = 'degraded'

  const passed = checks.filter(c => c.ok).length
  const summary = `${passed}/${checks.length} checks passed` +
    (failed.length ? ` · ${failed.length} failing` : '') +
    (slowCount ? ` · ${slowCount} slow` : '')

  return { runAt, status, durationMs, source, summary, checks }
}
