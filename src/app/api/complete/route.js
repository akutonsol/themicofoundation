import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'
import nodemailer from 'nodemailer'

const PT_BASE_URL = process.env.POWERTRANZ_BASE_URL || 'https://staging.ptranz.com'
const SITE_URL    = process.env.NEXT_PUBLIC_SITE_URL || 'https://mico.themicofoundationja.org'

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token:     process.env.SANITY_API_WRITE_TOKEN,
  useCdn:    false,
})

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

// ── Build receipt download URL ────────────────────────────────────────────────
function buildReceiptUrl(receiptData) {
  try {
    const encoded = Buffer.from(JSON.stringify(receiptData)).toString('base64').replace(/\+/g,'_').replace(/\//g,'-').replace(/=/g,'')
    return SITE_URL + '/api/receipt?data=' + encoded
  } catch (_) {
    return null
  }
}

// ── Email: donor confirmation ─────────────────────────────────────────────────
async function sendDonorConfirmation(data, receiptUrl) {
  const { email, name, amount, orderId, transactionId, authCode, cardBrand, projectTitle, donationType } = data
  if (!email) return

  const displayAmount = typeof amount === 'number' ? '$' + amount.toFixed(2) : String(amount || '0')
  const firstName     = (name || 'Donor').split(' ')[0]

  await transporter.sendMail({
    from:    '"The Mico Foundation" <' + process.env.EMAIL_USER + '>',
    to:      email,
    subject: 'Thank you for your donation — ' + displayAmount + ' received',
    html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#F5F3EE;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F3EE;padding:32px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:16px;overflow:hidden;max-width:600px;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

  <tr><td style="background:#FFD900;padding:36px 40px 28px;text-align:center;">
    <h1 style="color:#040617;font-size:28px;font-weight:700;margin:0 0 6px;letter-spacing:-0.5px;">Thank You, ${firstName}!</h1>
    <p style="color:#040617;font-size:15px;margin:0;opacity:0.75;">Your generosity makes a real difference</p>
  </td></tr>

  <tr><td style="padding:36px 40px;">

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F0FDF4;border:1.5px solid #5EDA71;border-radius:12px;margin-bottom:28px;">
      <tr><td style="padding:18px 24px;text-align:center;">
        <p style="font-size:18px;font-weight:700;color:#2F8A45;margin:0 0 4px;">&#10003; Donation Confirmed</p>
        <p style="font-size:14px;color:#6F7181;margin:0;">Your payment has been successfully processed</p>
      </td></tr>
    </table>

    <p style="font-size:15px;color:#040617;margin:0 0 6px;">Dear ${name || 'Donor'},</p>
    <p style="font-size:15px;color:#6F7181;line-height:1.7;margin:0 0 24px;">
      Thank you for your generous ${donationType === 'monthly' ? 'monthly ' : ''}donation of
      <strong style="color:#040617;">${displayAmount}</strong>${projectTitle ? ' to support <strong style="color:#040617;">' + projectTitle + '</strong>' : ''}.
      Your contribution helps us create lasting change in our community.
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#2F8A45,#5EDA71);border-radius:12px;margin-bottom:28px;">
      <tr><td style="padding:20px 24px;">
        <p style="font-size:15px;font-weight:700;color:#FFFFFF;margin:0 0 6px;">Your Impact</p>
        <p style="font-size:14px;color:#FFFFFF;opacity:0.9;margin:0;line-height:1.6;">
          Your ${displayAmount} donation helps equip students with school supplies, access to technology, and a safe learning environment.
        </p>
      </td></tr>
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F3EE;border-radius:10px;margin-bottom:24px;">
      <tr><td style="padding:16px 20px;">
        <p style="font-size:14px;color:#040617;margin:0;">
          <strong>&#128196; Tax Receipt${receiptUrl ? ' Attached' : ''}:</strong>
          Your official tax-deductible receipt is ${receiptUrl ? 'attached to this email' : 'available for download'}.
          Please keep it for your tax records.
        </p>
        ${receiptUrl ? '<p style="margin:10px 0 0;"><a href="' + receiptUrl + '" style="background:#040617;color:#FFD900;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;">Download Receipt PDF</a></p>' : ''}
      </td></tr>
    </table>

    <p style="font-size:14px;color:#6F7181;margin:0 0 4px;"><strong style="color:#040617;">Transaction ID:</strong> ${transactionId || orderId}</p>
    ${authCode ? '<p style="font-size:14px;color:#6F7181;margin:0 0 4px;"><strong style="color:#040617;">Authorization Code:</strong> ' + authCode + '</p>' : ''}

    <p style="font-size:14px;color:#6F7181;margin:24px 0 0;line-height:1.6;">
      If you have any questions, contact us at
      <a href="mailto:donations@themicofoundation.org" style="color:#040617;font-weight:600;">donations@themicofoundation.org</a>
    </p>

    <p style="font-size:15px;color:#040617;margin:24px 0 0;">With gratitude,<br/><strong>The Mico Foundation Team</strong></p>
  </td></tr>

  <tr><td style="background:#040617;padding:20px 40px;text-align:center;">
    <p style="font-size:12px;color:#9CA3AF;margin:0;">The Mico Foundation &middot; 1A Marescaux Road, Kingston 5, Jamaica</p>
    <p style="font-size:12px;color:#9CA3AF;margin:4px 0 0;">
      <a href="https://mico.themicofoundationja.org" style="color:#FFD900;text-decoration:none;">themicofoundation.org</a>
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`,
  })
}

// ── Email: admin notification ─────────────────────────────────────────────────
async function sendAdminNotification(data) {
  const { donorEmail, donorName, amount, orderId, transactionId, authCode, cardBrand, projectTitle, donationType } = data
  if (!process.env.ADMIN_EMAIL) return

  const displayAmount = typeof amount === 'number' ? '$' + amount.toFixed(2) + ' USD' : String(amount || '0')

  await transporter.sendMail({
    from:    '"Mico Foundation Donations" <' + process.env.EMAIL_USER + '>',
    to:      process.env.ADMIN_EMAIL,
    subject: 'New Donation Received — ' + displayAmount + ' from ' + donorName,
    html: `<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif;padding:32px;background:#F5F3EE;">
<div style="background:white;border-radius:12px;padding:32px;max-width:500px;margin:0 auto;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
  <div style="background:#FFD900;border-radius:8px;padding:16px 20px;margin-bottom:24px;">
    <h2 style="color:#040617;margin:0;font-size:20px;">New Donation Received</h2>
  </div>
  <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
    <tr style="border-bottom:1px solid #E5E6EB;"><td style="color:#6F7181;width:40%;">Donor</td><td style="color:#040617;font-weight:600;">${donorName}</td></tr>
    <tr style="border-bottom:1px solid #E5E6EB;"><td style="color:#6F7181;">Email</td><td style="color:#040617;">${donorEmail}</td></tr>
    <tr style="border-bottom:1px solid #E5E6EB;"><td style="color:#6F7181;">Amount</td><td style="color:#040617;font-weight:700;font-size:18px;">${displayAmount}</td></tr>
    ${projectTitle ? '<tr style="border-bottom:1px solid #E5E6EB;"><td style="color:#6F7181;">Project</td><td style="color:#040617;">' + projectTitle + '</td></tr>' : ''}
    ${donationType ? '<tr style="border-bottom:1px solid #E5E6EB;"><td style="color:#6F7181;">Type</td><td style="color:#040617;text-transform:capitalize;">' + donationType + '</td></tr>' : ''}
    <tr style="border-bottom:1px solid #E5E6EB;"><td style="color:#6F7181;">Order ID</td><td style="color:#040617;font-family:monospace;">${orderId}</td></tr>
    <tr style="border-bottom:1px solid #E5E6EB;"><td style="color:#6F7181;">Transaction ID</td><td style="color:#040617;font-family:monospace;font-size:12px;">${transactionId || '-'}</td></tr>
    ${authCode ? '<tr style="border-bottom:1px solid #E5E6EB;"><td style="color:#6F7181;">Auth Code</td><td style="color:#040617;font-family:monospace;">' + authCode + '</td></tr>' : ''}
    ${cardBrand ? '<tr><td style="color:#6F7181;">Card</td><td style="color:#040617;">' + cardBrand + '</td></tr>' : ''}
  </table>
  <p style="color:#9CA3AF;font-size:12px;margin-top:20px;">Automated notification from the Mico Foundation donation system.</p>
</div>
</body>
</html>`,
  })
}

// ── Main handler ──────────────────────────────────────────────────────────────
export async function POST(request) {
  try {
    const { spiToken, donationMeta } = await request.json()
    console.log('SpiToken received length:', spiToken?.length)

    if (!spiToken) {
      return NextResponse.json({ error: 'SpiToken is required' }, { status: 400 })
    }

    const response = await fetch(`${PT_BASE_URL}/Api/spi/payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(spiToken),
    })

    const data = await response.json()
    console.log('PowerTranz payment response:', JSON.stringify(data))

    if (!response.ok) {
      console.error('PowerTranz payment error:', data)
      return NextResponse.json({ error: 'Payment completion failed', details: data }, { status: 500 })
    }

    if (data.Approved && data.IsoResponseCode === '00') {
      const donorName     = donationMeta?.cardholderName || ((donationMeta?.firstName || '') + ' ' + (donationMeta?.lastName || '')).trim() || 'Donor'
      const donorEmail    = donationMeta?.email || ''
      const orderId       = donationMeta?.orderId || data.OrderIdentifier
      const amount        = donationMeta?.amount  || data.TotalAmount
      const authCode      = data.AuthorizationCode
      const cardBrand     = data.CardBrand
      const transactionId = data.TransactionIdentifier
      const processedAt   = new Date().toISOString()

      // Save to Sanity
      try {
        await sanityClient.create({
          _type:             'donation',
          amount:            amount || 0,
          currency:          donationMeta?.currency || 'USD',
          donorName,
          email:             donorEmail,
          donationType:      donationMeta?.donationType || 'general',
          message:           donationMeta?.message || '',
          orderId,
          transactionId,
          authorizationCode: authCode,
          cardBrand,
          rrn:               data.RRN,
          status:            'completed',
          processedAt,
          gateway:           'powertranz',
        })
        console.log('Donation saved to Sanity:', orderId)
      } catch (sanityErr) {
        console.error('Sanity save error:', sanityErr)
      }

      // Build receipt download URL (uses /api/receipt endpoint with pdf-lib)
      const receiptData = {
        donorName,
        donorEmail,
        amount,
        orderId,
        transactionId,
        authCode,
        cardBrand,
        projectTitle:  donationMeta?.projectTitle || '',
        donationType:  donationMeta?.donationType || 'general',
        address:       donationMeta?.address      || '',
        city:          donationMeta?.city         || '',
        state:         donationMeta?.state        || '',
        zip:           donationMeta?.postalCode   || donationMeta?.zip || '',
        country:       donationMeta?.country      || 'Jamaica',
        processedAt,
      }
      const receiptUrl = buildReceiptUrl(receiptData)
      console.log('Receipt URL built:', !!receiptUrl)

      const emailData = {
        email: donorEmail, donorEmail, donorName,
        name:  donorName,  amount,     orderId,
        transactionId, authCode, cardBrand,
        projectTitle: donationMeta?.projectTitle || '',
        donationType: donationMeta?.donationType || '',
      }

      // AWAIT so Vercel doesn't terminate before emails send
      await Promise.all([
        sendDonorConfirmation(emailData, receiptUrl).catch(e => console.error('Donor email error:', e)),
        sendAdminNotification(emailData).catch(e => console.error('Admin email error:', e)),
      ])
      console.log('Emails sent')

      return NextResponse.json({
        success:           true,
        approved:          true,
        authorizationCode: authCode,
        transactionId,
        orderId,
        cardBrand,
        amount:            data.TotalAmount,
        message:           data.ResponseMessage,
        receiptUrl,   // direct download link via /api/receipt
      })
    }

    return NextResponse.json({
      success:         false,
      approved:        false,
      error:           data.ResponseMessage || 'Payment was declined',
      isoResponseCode: data.IsoResponseCode,
    }, { status: 400 })

  } catch (error) {
    console.error('Complete payment error:', error)
    return NextResponse.json({ error: 'Failed to complete payment' }, { status: 500 })
  }
}