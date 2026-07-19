import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Gate for the /controlcenter console. If CONTROLCENTER_KEY is not configured,
// access is open (with a warning surfaced in the UI) so it works out of the box.
export async function POST(request) {
  const key = process.env.CONTROLCENTER_KEY
  if (!key) {
    return NextResponse.json({ ok: true, unprotected: true })
  }
  let passcode = ''
  try { ({ passcode } = await request.json()) } catch { /* ignore */ }
  if (passcode && passcode === key) {
    return NextResponse.json({ ok: true, unprotected: false })
  }
  return NextResponse.json({ ok: false }, { status: 401 })
}
