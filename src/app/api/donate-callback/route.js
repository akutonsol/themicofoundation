import { NextResponse } from 'next/server'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mico.themicofoundationja.org'

function makeRedirectHtml(path) {
  const url = SITE_URL + path
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body>
<script>
(function(){
  // Navigate the top-level page (parent of the 3DS iframe) to the result page
  try {
    if (window.parent && window.parent !== window) {
      window.parent.location = ${JSON.stringify(url)};
    } else {
      window.location = ${JSON.stringify(url)};
    }
  } catch(e) {
    // If cross-origin, fall back to window.top
    try { window.top.location = ${JSON.stringify(url)}; } catch(e2) {
      window.location = ${JSON.stringify(url)};
    }
  }
})();
</script>
</body>
</html>`
}

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
        body[key] = value
      }
    } else {
      // Try form data first, then raw text
      try {
        const formData = await request.formData()
        for (const [key, value] of formData.entries()) {
          body[key] = value
        }
      } catch {
        const text = await request.text()
        try { body = JSON.parse(text) } catch {
          const params = new URLSearchParams(text)
          for (const [key, value] of params.entries()) {
            body[key] = value
          }
        }
      }
    }

    console.log('3DS callback raw body keys:', Object.keys(body))
    console.log('3DS callback — IsoResponseCode:', body.IsoResponseCode, '| ResponseMessage:', body.ResponseMessage, '| SpiToken:', !!body.SpiToken, '| AuthStatus:', body.RiskManagement?.ThreeDSecure?.AuthenticationStatus)
    console.log('3DS callback full body:', JSON.stringify(body).slice(0, 1000))

    const spiToken   = body.SpiToken   || body.spiToken
    const isoCode    = body.IsoResponseCode
    // Handle both nested JSON object and dot-notation URL-encoded keys
    const authStatus = body.RiskManagement?.ThreeDSecure?.AuthenticationStatus
      || body['RiskManagement.ThreeDSecure.AuthenticationStatus']
      || body['AuthenticationStatus']

    const is3dsComplete = spiToken && (
      isoCode === '3D0' || isoCode === 'SP4' || isoCode === 'SP1' ||
      authStatus === 'Y' || authStatus === 'A' || authStatus === 'C'
    )

    if (is3dsComplete) {
      const path = `/donate-result?spiToken=${encodeURIComponent(spiToken)}&status=3ds_complete`
      return new Response(makeRedirectHtml(path), { headers: { 'Content-Type': 'text/html' } })
    }

    const errMsg = encodeURIComponent(body.ResponseMessage || 'Authentication failed')
    return new Response(
      makeRedirectHtml(`/donate-result?status=declined&message=${errMsg}`),
      { headers: { 'Content-Type': 'text/html' } }
    )

  } catch (error) {
    console.error('Callback error:', error)
    return new Response(
      makeRedirectHtml('/donate-result?status=error&message=An+error+occurred'),
      { headers: { 'Content-Type': 'text/html' } }
    )
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const spiToken = searchParams.get('SpiToken') || searchParams.get('spiToken')
    if (spiToken) {
      const path = `/donate-result?spiToken=${encodeURIComponent(spiToken)}&status=3ds_complete`
      return new Response(makeRedirectHtml(path), { headers: { 'Content-Type': 'text/html' } })
    }
    return new Response(
      makeRedirectHtml('/donate-result?status=error&message=No+token+received'),
      { headers: { 'Content-Type': 'text/html' } }
    )
  } catch (error) {
    return new Response(
      makeRedirectHtml('/donate-result?status=error&message=An+error+occurred'),
      { headers: { 'Content-Type': 'text/html' } }
    )
  }
}
