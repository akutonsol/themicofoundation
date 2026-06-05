import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const PT_BASE_URL = process.env.POWERTRANZ_BASE_URL || 'https://staging.ptranz.com'

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

export async function POST(request) {
  try {
    const { spiToken, donationMeta } = await request.json()

    if (!spiToken) {
      return NextResponse.json({ error: 'SpiToken is required' }, { status: 400 })
    }

    // Complete the payment - body is just the SpiToken string, no auth headers needed
    const response = await fetch(`${PT_BASE_URL}/Api/spi/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(spiToken),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('PowerTranz payment error:', data)
      return NextResponse.json({ error: 'Payment completion failed', details: data }, { status: 500 })
    }

    // IsoResponseCode 00 = approved
    if (data.Approved && data.IsoResponseCode === '00') {
      // Save donation to Sanity
      try {
        await sanityClient.create({
          _type: 'donation',
          amount: donationMeta?.amount || 0,
          currency: donationMeta?.currency || 'USD',
          donorName: donationMeta?.cardholderName || '',
          email: donationMeta?.email || '',
          donationType: donationMeta?.donationType || 'general',
          message: donationMeta?.message || '',
          orderId: donationMeta?.orderId || data.OrderIdentifier,
          transactionId: data.TransactionIdentifier,
          authorizationCode: data.AuthorizationCode,
          cardBrand: data.CardBrand,
          rrn: data.RRN,
          status: 'completed',
          processedAt: new Date().toISOString(),
          gateway: 'powertranz',
        })
      } catch (sanityErr) {
        console.error('Sanity save error:', sanityErr)
        // Don't fail the payment if Sanity save fails
      }

      return NextResponse.json({
        success: true,
        approved: true,
        authorizationCode: data.AuthorizationCode,
        transactionId: data.TransactionIdentifier,
        orderId: data.OrderIdentifier,
        cardBrand: data.CardBrand,
        amount: data.TotalAmount,
        message: data.ResponseMessage,
      })
    }

    return NextResponse.json({
      success: false,
      approved: false,
      error: data.ResponseMessage || 'Payment was declined',
      isoResponseCode: data.IsoResponseCode,
    }, { status: 400 })

  } catch (error) {
    console.error('Complete payment error:', error)
    return NextResponse.json({ error: 'Failed to complete payment' }, { status: 500 })
  }
}
