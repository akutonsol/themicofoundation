import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token:     process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN,
  useCdn:    false,
})

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const oid = searchParams.get('oid')

  if (!oid) {
    return NextResponse.json({ status: 'error', error: 'Missing oid' }, { status: 400 })
  }

  try {
    const doc = await sanity.fetch(
      `*[_type == "donation" && orderId == $oid][0]{
        orderId, transactionId, authorizationCode, cardBrand, amount, donorName, processedAt, status, message
      }`,
      { oid },
    )

    if (doc && doc.status === 'completed') {
      return NextResponse.json({ status: 'completed', ...doc })
    }
    if (doc && doc.status === 'declined') {
      return NextResponse.json({ status: 'declined', error: doc.message || 'Payment was declined' })
    }
    return NextResponse.json({ status: 'pending' })
  } catch (err) {
    console.error('[payment-status] Sanity error:', err.message)
    return NextResponse.json({ status: 'pending' })
  }
}
