import { NextResponse } from 'next/server'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mico.themicofoundationja.org'

const html = (url) => `<!DOCTYPE html>
<html>
<head></head>
<body>
<script>
try {
  window.parent.location = '${url}';
} catch(e) {
  try { window.top.location = '${url}'; } catch(e2) { window.location = '${url}'; }
}
</script>
</body>
</html>`

export async function POST(request) {
  try {
    let body = {}
    const contentType = request.headers.get('content-type') || ''

    if (contentType.includes('application/json')) {
      body = await request.json()
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const text = await request.text()
      const params = new URLSearchParams(text)
      for (const [key, value] of params.entries()) {
        try { body = JSON.parse(value); break } catch { body[key] = value }
      }
    } else {
      // Try formData
      try {
        const formData = await request.formData()
        for (const [key, value] of formData.entries()) {
          try { body = JSON.parse(value); break } catch { body[key] = value }
        }
      } catch {
        const text = await request.text()
        try { body = JSON.parse(text) } catch {
          const params = new URLSearchParams(text)
          for (const [key, value] of params.entries()) {
            try { body = JSON.parse(value); break } catch { body[key] = value }
          }
        }
      }
    }

    console.log('Callback body:', JSON.stringify(body).slice(0, 500))

    const spiToken = body.SpiToken || body.spiToken
    const isoCode = body.IsoResponseCode
    const authStatus = body.RiskManagement?.ThreeDSecure?.AuthenticationStatus

console.log('Callback received:', JSON.stringify({ isoCode, authStatus, spiToken: !!spiToken, body }))

if (spiToken && (
  isoCode === '3D0' ||
  isoCode === 'SP4' ||
  isoCode === 'SP1' ||
  authStatus === 'Y' ||
  authStatus === 'A' ||
  authStatus === 'C'
)) {
      const url = `${SITE_URL}/donate-result?spiToken=${encodeURIComponent(spiToken)}&status=3ds_complete`
      return new Response(html(url), { headers: { 'Content-Type': 'text/html' } })
    }

    if (isoCode === '3D0' && !spiToken) {
      return new Response(html(`${SITE_URL}/donate-result?status=declined&message=No+token+received`), { headers: { 'Content-Type': 'text/html' } })
    }

    const errMsg = body.ResponseMessage || 'Authentication failed'
    return new Response(html(`${SITE_URL}/donate-result?status=declined&message=${encodeURIComponent(errMsg)}`), { headers: { 'Content-Type': 'text/html' } })

  } catch (error) {
    console.error('Callback error:', error)
    return new Response(html(`${SITE_URL}/donate-result?status=error`), { headers: { 'Content-Type': 'text/html' } })
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const spiToken = searchParams.get('SpiToken') || searchParams.get('spiToken')

    if (spiToken) {
      const url = `${SITE_URL}/donate-result?spiToken=${encodeURIComponent(spiToken)}&status=3ds_complete`
      return new Response(html(url), { headers: { 'Content-Type': 'text/html' } })
    }

    return new Response(html(`${SITE_URL}/donate-result?status=error`), { headers: { 'Content-Type': 'text/html' } })
  } catch (error) {
    return new Response(html(`${SITE_URL}/donate-result?status=error`), { headers: { 'Content-Type': 'text/html' } })
  }
}