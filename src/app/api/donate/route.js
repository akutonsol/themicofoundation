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
      country = 'Jamaica',
      donationType,
      message,
      projectId,
      projectTitle,
    } = await request.json()

    if (!amount || !cardPan || !cardCvv || !cardExpiration || !cardholderName) {
      return NextResponse.json({ error: 'Missing required payment fields' }, { status: 400 })
    }

    const transactionId = uuidv4()
    const orderId = `MICO-${uuidv4().split('-')[0].toUpperCase()}`

    // Encode donationMeta into the callback URL so the server-side callback
    // has donor info for Sanity save and emails (frictionless 3DS is server-to-server)
    const metaPayload = {
      amount, currency, donationType, message, email,
      cardholderName, firstName, lastName, phone,
      address, city, state, postalCode, country,
      orderId, projectId, projectTitle,
    }
    const metaEncoded = Buffer.from(JSON.stringify(metaPayload))
      .toString('base64')
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
    const callbackUrl = `${SITE_URL}/api/donate-callback?meta=${metaEncoded}`
    console.log('Initiating PowerTranz Sale:', { orderId, amount, currency })
    console.log('PT credentials present — ID:', !!PT_ID, 'PW:', !!PT_PASSWORD, 'Base:', PT_BASE_URL)

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
        State: (state && /^[A-Za-z0-9]{2,3}$/.test(state.trim())) ? state.trim().toUpperCase() : '',
        PostalCode: postalCode || '',
        CountryCode: countryCode,
        EmailAddress: email || '',
        PhoneNumber: phone || '',
      },
      AddressMatch: false,
      ExtendedData: {
        MerchantResponseUrl: callbackUrl,
        ThreeDSecure: {
          ChallengeWindowSize: '04',
          ChallengeIndicator: '01',
        },
      },
    }

    console.log('PT Sale payload:', JSON.stringify({ ...payload, Source: { ...payload.Source, CardPan: payload.Source.CardPan.slice(0,4) + '****' + payload.Source.CardPan.slice(-4), CardCvv: '***' } }, null, 2))

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
      console.error('PowerTranz Sale HTTP error', response.status, ':', JSON.stringify(data))
      return NextResponse.json({ error: data.ResponseMessage || `Gateway HTTP ${response.status}`, details: data }, { status: 502 })
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
        donationMeta: {
          amount, currency, donationType, message, email,
          cardholderName, firstName, lastName, phone,
          address, city, state, postalCode, country,
          orderId, projectId, projectTitle,
        },
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
        donationMeta: {
          amount, currency, donationType, message, email,
          cardholderName, firstName, lastName, phone,
          address, city, state, postalCode, country,
          orderId, projectId, projectTitle,
        },
      })
    }

    console.error('PowerTranz unexpected response — IsoResponseCode:', data.IsoResponseCode, '| ResponseMessage:', data.ResponseMessage, '| Full:', JSON.stringify(data))
    return NextResponse.json({
      error: data.ResponseMessage || `Payment gateway returned code: ${data.IsoResponseCode || 'unknown'}`,
      isoResponseCode: data.IsoResponseCode,
      details: data,
    }, { status: 400 })

  } catch (error) {
    console.error('Donate route error:', error)
    return NextResponse.json({ error: 'Failed to initiate payment' }, { status: 500 })
  }
}