import { NextResponse } from 'next/server'

// Signal the parent page via three mechanisms (most-to-least reliable)
function makeHtml(payload) {
  const msg = JSON.stringify(payload)
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body>
<script>
(function(){
  var msg = ${msg};
  var msgStr = JSON.stringify(msg);
  // 1. localStorage — parent polls this; works even when postMessage is blocked
  try { localStorage.setItem('mf_3ds_result', msgStr); } catch(e) {}
  // 2. postMessage — primary channel
  var sent = false;
  try { if (window.parent && window.parent !== window) { window.parent.postMessage(msg, '*'); sent = true; } } catch(e) {}
  if (!sent) { try { window.top.postMessage(msg, '*'); sent = true; } catch(e) {} }
  if (!sent) { try { if (window.opener && !window.opener.closed) { window.opener.postMessage(msg, '*'); } } catch(e) {} }
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
      try {
        const formData = await request.formData()
        for (const [key, value] of formData.entries()) { body[key] = value }
      } catch {
        const text = await request.text()
        try { body = JSON.parse(text) } catch {
          const params = new URLSearchParams(text)
          for (const [key, value] of params.entries()) { body[key] = value }
        }
      }
    }

    // PowerTranz sends the full response JSON as a string inside body.Response,
    // with SpiToken and TransactionIdentifier also at the top level.
    let parsed = { ...body }
    if (body.Response && typeof body.Response === 'string') {
      try { parsed = { ...body, ...JSON.parse(body.Response) } } catch {}
    }

    console.log('3DS callback — IsoResponseCode:', parsed.IsoResponseCode, '| ResponseMessage:', parsed.ResponseMessage, '| SpiToken:', !!parsed.SpiToken, '| AuthStatus:', parsed.RiskManagement?.ThreeDSecure?.AuthenticationStatus, '| Errors:', JSON.stringify(parsed.Errors))

    const spiToken   = parsed.SpiToken || parsed.spiToken
    const isoCode    = parsed.IsoResponseCode
    const authStatus = parsed.RiskManagement?.ThreeDSecure?.AuthenticationStatus
      || parsed['RiskManagement.ThreeDSecure.AuthenticationStatus']
      || parsed['AuthenticationStatus']

    const is3dsComplete = spiToken && (
      isoCode === '3D0' || isoCode === 'SP4' || isoCode === 'SP1' ||
      authStatus === 'Y' || authStatus === 'A' || authStatus === 'C'
    )

    if (is3dsComplete) {
      return new Response(makeHtml({ status: '3ds_complete', spiToken }), {
        headers: { 'Content-Type': 'text/html' },
      })
    }

    const fieldErr = parsed.Errors?.[0]?.Message
    const errMsg   = fieldErr || parsed.ResponseMessage || 'Authentication failed'
    return new Response(makeHtml({ status: 'declined', message: errMsg }), {
      headers: { 'Content-Type': 'text/html' },
    })

  } catch (error) {
    console.error('Callback error:', error)
    return new Response(makeHtml({ status: 'error', message: 'An error occurred' }), {
      headers: { 'Content-Type': 'text/html' },
    })
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const spiToken = searchParams.get('SpiToken') || searchParams.get('spiToken')
    if (spiToken) {
      return new Response(makeHtml({ status: '3ds_complete', spiToken }), {
        headers: { 'Content-Type': 'text/html' },
      })
    }
    return new Response(makeHtml({ status: 'error', message: 'No token received' }), {
      headers: { 'Content-Type': 'text/html' },
    })
  } catch {
    return new Response(makeHtml({ status: 'error', message: 'An error occurred' }), {
      headers: { 'Content-Type': 'text/html' },
    })
  }
}
