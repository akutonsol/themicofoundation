import { completePayment } from '@/lib/completePayment'

// HTML sent back to the browser for challenge 3DS flow.
// For frictionless (server-to-server), this HTML is consumed by PowerTranz and ignored.
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
  var sent = false;
  try { if (window.parent && window.parent !== window) { window.parent.postMessage(msg, '*'); sent = true; } } catch(e) {}
  if (!sent) { try { window.top.postMessage(msg, '*'); sent = true; } catch(e) {} }
  if (!sent) { try { if (window.opener && !window.opener.closed) { window.opener.postMessage(msg, '*'); } } catch(e) {} }
})();
</script>
</body>
</html>`
}

function decodeMeta(b64url) {
  try {
    const b64 = b64url.replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(Buffer.from(b64, 'base64').toString('utf8'))
  } catch { return {} }
}

export async function POST(request) {
  try {
    // Decode donationMeta from URL (encoded by the donate route)
    const { searchParams } = new URL(request.url)
    const donationMeta = searchParams.get('meta') ? decodeMeta(searchParams.get('meta')) : {}

    // Parse body — PowerTranz may send form-encoded or JSON
    let body = {}
    const contentType = request.headers.get('content-type') || ''

    if (contentType.includes('application/json')) {
      body = await request.json()
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const text = await request.text()
      new URLSearchParams(text).forEach((v, k) => { body[k] = v })
    } else {
      try {
        const fd = await request.formData()
        fd.forEach((v, k) => { body[k] = v })
      } catch {
        const text = await request.text()
        try { body = JSON.parse(text) } catch {
          new URLSearchParams(text).forEach((v, k) => { body[k] = v })
        }
      }
    }

    let parsed = { ...body }
    if (body.Response && typeof body.Response === 'string') {
      try { parsed = { ...body, ...JSON.parse(body.Response) } } catch {}
    }

    const spiToken   = parsed.SpiToken || parsed.spiToken
    const isoCode    = parsed.IsoResponseCode
    const authStatus = parsed.RiskManagement?.ThreeDSecure?.AuthenticationStatus
      || parsed['RiskManagement.ThreeDSecure.AuthenticationStatus']
      || parsed['AuthenticationStatus']

    console.log('[callback] isoCode:', isoCode, '| authStatus:', authStatus, '| hasSpiToken:', !!spiToken, '| orderId:', donationMeta?.orderId)

    const is3dsComplete = spiToken && (
      isoCode === '3D0' || isoCode === 'SP4' || isoCode === 'SP1' ||
      authStatus === 'Y' || authStatus === 'A' || authStatus === 'C'
    )

    if (is3dsComplete) {
      // Complete the payment using the post-3DS SpiToken.
      // For frictionless 3DS: this call arrives from PowerTranz's server.
      // For challenge 3DS: this call arrives from the browser (via iframe redirect).
      const result = await completePayment(spiToken, donationMeta)

      if (result.success && result.approved) {
        return new Response(
          makeHtml({
            status:            'payment_complete',
            orderId:           result.orderId,
            authorizationCode: result.authorizationCode,
            transactionId:     result.transactionId,
            cardBrand:         result.cardBrand,
            amount:            result.amount,
            message:           result.message,
          }),
          { headers: { 'Content-Type': 'text/html' } },
        )
      }

      return new Response(
        makeHtml({
          status:  'declined',
          message: result.error || 'Payment was declined',
          errors:  result.errors,
        }),
        { headers: { 'Content-Type': 'text/html' } },
      )
    }

    const fieldErr = parsed.Errors?.[0]?.Message
    const errMsg   = fieldErr || parsed.ResponseMessage || 'Authentication failed'
    return new Response(
      makeHtml({ status: 'declined', message: errMsg }),
      { headers: { 'Content-Type': 'text/html' } },
    )

  } catch (error) {
    console.error('[callback] Error:', error.message)
    return new Response(
      makeHtml({ status: 'error', message: 'An error occurred' }),
      { headers: { 'Content-Type': 'text/html' } },
    )
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const spiToken     = searchParams.get('SpiToken') || searchParams.get('spiToken')
    const donationMeta = searchParams.get('meta') ? decodeMeta(searchParams.get('meta')) : {}

    if (spiToken) {
      const result = await completePayment(spiToken, donationMeta)
      if (result.success && result.approved) {
        return new Response(
          makeHtml({
            status:            'payment_complete',
            orderId:           result.orderId,
            authorizationCode: result.authorizationCode,
            transactionId:     result.transactionId,
            cardBrand:         result.cardBrand,
            amount:            result.amount,
          }),
          { headers: { 'Content-Type': 'text/html' } },
        )
      }
      return new Response(
        makeHtml({ status: 'declined', message: result.error || 'Payment was declined' }),
        { headers: { 'Content-Type': 'text/html' } },
      )
    }

    return new Response(
      makeHtml({ status: 'error', message: 'No token received' }),
      { headers: { 'Content-Type': 'text/html' } },
    )
  } catch (e) {
    return new Response(
      makeHtml({ status: 'error', message: 'An error occurred' }),
      { headers: { 'Content-Type': 'text/html' } },
    )
  }
}
