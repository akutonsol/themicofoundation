import { NextResponse } from 'next/server'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mico.themicofoundationja.org'

// Returns HTML that posts a message to the parent frame (DonationForm iframe listener)
// Falls back to window.location redirect if postMessage fails
const makeHtml = (payload) => `<!DOCTYPE html>
<html><head></head><body><script>
(function(){
  var msg = ${JSON.stringify(payload)};
  try { if (window.parent && window.parent !== window) { window.parent.postMessage(msg, '*'); } } catch(e) {}
  try { window.top.postMessage(msg, '*'); } catch(e) {}
})();
</script></body></html>`


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

    const spiToken   = body.SpiToken || body.spiToken
    const isoCode    = body.IsoResponseCode
    const authStatus = body.RiskManagement?.ThreeDSecure?.AuthenticationStatus

    console.log('Callback received:', JSON.stringify({ isoCode, authStatus, spiToken: !!spiToken }))

    if (spiToken && (
      isoCode === '3D0' || isoCode === 'SP4' || isoCode === 'SP1' ||
      authStatus === 'Y' || authStatus === 'A' || authStatus === 'C'
    )) {
      return new Response(
        makeHtml({ status: '3ds_complete', spiToken }),
        { headers: { 'Content-Type': 'text/html' } }
      )
    }

    const errMsg = body.ResponseMessage || 'Authentication failed'
    return new Response(
      makeHtml({ status: 'declined', message: errMsg }),
      { headers: { 'Content-Type': 'text/html' } }
    )

  } catch (error) {
    console.error('Callback error:', error)
    return new Response(
      makeHtml({ status: 'error', message: 'An error occurred' }),
      { headers: { 'Content-Type': 'text/html' } }
    )
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const spiToken = searchParams.get('SpiToken') || searchParams.get('spiToken')
    if (spiToken) {
      return new Response(
        makeHtml({ status: '3ds_complete', spiToken }),
        { headers: { 'Content-Type': 'text/html' } }
      )
    }
    return new Response(
      makeHtml({ status: 'error', message: 'No token received' }),
      { headers: { 'Content-Type': 'text/html' } }
    )
  } catch (error) {
    return new Response(
      makeHtml({ status: 'error', message: 'An error occurred' }),
      { headers: { 'Content-Type': 'text/html' } }
    )
  }
}