import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

const PT_ID = process.env.POWERTRANZ_ID
const PT_PASSWORD = process.env.POWERTRANZ_PASSWORD
const PT_BASE_URL = process.env.POWERTRANZ_BASE_URL || 'https://staging.ptranz.com'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mico.themicofoundationja.org'

export async function POST(request) {
  try {
    const {
      amount,
      currency = '840',
      cardPan,
      cardCvv,
      cardExpiration,
      cardholderName,
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      postalCode,
      countryCode = '840',
      donationType,
      message,
    } = await request.json()

    if (!amount || !cardPan || !cardCvv || !cardExpiration || !cardholderName) {
      return NextResponse.json({ error: 'Missing required payment fields' }, { status: 400 })
    }

    const transactionId = uuidv4()
    const orderId = `MICO-${uuidv4().split('-')[0].toUpperCase()}`
const callbackUrl = `${SITE_URL}/donate-callback`

    const payload = {
      TransactionIdentifier: transactionId,
      TotalAmount: parseFloat(amount),
      CurrencyCode: currency,
      ThreeDSecure: true,
      Source: {
        CardPan: cardPan.replace(/\s/g, ''),
        CardCvv: cardCvv,
        CardExpiration: cardExpiration.replace('/', ''),
        CardholderName: cardholderName,
      },
      OrderIdentifier: orderId,
      BillingAddress: {
        FirstName: firstName || cardholderName.split(' ')[0] || '',
        LastName: lastName || cardholderName.split(' ').slice(1).join(' ') || '',
        Line1: address || '',
        City: city || '',
        State: state || '',
        PostalCode: postalCode || '',
        CountryCode: countryCode,
        EmailAddress: email || '',
        PhoneNumber: phone || '',
      },
      AddressMatch: false,
      ExtendedData: {
        ThreeDSecure: {
          ChallengeWindowSize: 4,
          ChallengeIndicator: '01',
        },
        MerchantResponseUrl: callbackUrl,
      },
    }

    const response = await fetch(`${PT_BASE_URL}/Api/spi/Sale`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'PowerTranz-PowerTranzId': PT_ID,
        'PowerTranz-PowerTranzPassword': PT_PASSWORD,
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('PowerTranz Sale error:', data)
      return NextResponse.json({ error: 'Payment gateway error', details: data }, { status: 500 })
    }

    // SP4 = SPI preprocessing complete, 3DS initiated
    if (data.IsoResponseCode === 'SP4' && data.RedirectData && data.SpiToken) {
      return NextResponse.json({
        success: true,
        requiresRedirect: true,
        redirectData: data.RedirectData,
        spiToken: data.SpiToken,
        transactionId: data.TransactionIdentifier,
        orderId,
        // Store donation metadata for after payment completes
        donationMeta: { amount, currency, donationType, message, email, cardholderName, orderId },
      })
    }

    // SP1 = card doesn't support 3DS, proceed directly
    if (data.IsoResponseCode === 'SP1' && data.SpiToken) {
      return NextResponse.json({
        success: true,
        requiresRedirect: false,
        spiToken: data.SpiToken,
        transactionId: data.TransactionIdentifier,
        orderId,
        donationMeta: { amount, currency, donationType, message, email, cardholderName, orderId },
      })
    }

    console.error('PowerTranz unexpected response:', JSON.stringify(data))
    return NextResponse.json({
     error: data.ResponseMessage || 'Payment initiation failed',
    isoResponseCode: data.IsoResponseCode,
    details: data,
    }, { status: 400 })

  } catch (error) {
    console.error('Donate route error:', error)
    return NextResponse.json({ error: 'Failed to initiate payment' }, { status: 500 })
  }
}