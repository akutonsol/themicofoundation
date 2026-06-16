import { NextResponse } from 'next/server'
import { completePayment } from '@/lib/completePayment'

export async function POST(request) {
  try {
    const { spiToken, donationMeta } = await request.json()
    console.log('[complete] SpiToken length:', spiToken?.length, '| orderId:', donationMeta?.orderId)

    if (!spiToken) {
      return NextResponse.json({ error: 'SpiToken is required' }, { status: 400 })
    }

    const result = await completePayment(spiToken, donationMeta || {})

    if (result.success && result.approved) {
      return NextResponse.json(result)
    }

    return NextResponse.json(
      { success: false, approved: false, error: result.error, isoResponseCode: result.isoResponseCode },
      { status: 400 },
    )

  } catch (error) {
    console.error('[complete] Error:', error.message)
    return NextResponse.json({ error: 'Failed to complete payment' }, { status: 500 })
  }
}
