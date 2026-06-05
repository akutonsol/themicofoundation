import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'
import nodemailer from 'nodemailer'

const PT_BASE_URL = process.env.POWERTRANZ_BASE_URL || 'https://staging.ptranz.com'

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion:'2024-01-01',
  token:     process.env.SANITY_API_WRITE_TOKEN,
  useCdn:    false,
})

// Gmail SMTP transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

// ── Email: donor confirmation ─────────────────────────────────────────────────
async function sendDonorConfirmation({ email, name, amount, orderId, authCode, cardBrand, projectTitle, donationType }) {
  if (!email) return
  const displayAmount = typeof amount === 'number' ? `$${amount.toFixed(2)} USD` : amount
  await transporter.sendMail({
    from:    `"The Mico Foundation" <${process.env.EMAIL_USER}>`,
    to:      email,
    subject: `Thank you for your donation — Order ${orderId}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"/></head>
      <body style="margin:0;padding:0;background:#F5F3EE;font-family:'Inter',Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F3EE;padding:40px 0;">
          <tr><td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:16px;overflow:hidden;max-width:600px;">
              <!-- Header -->
              <tr><td style="background:#040617;padding:32px 40px;text-align:center;">
                <h1 style="color:#FFD900;font-size:28px;font-weight:700;margin:0;letter-spacing:-0.5px;">The Mico Foundation</h1>
                <p style="color:#9CA3AF;font-size:14px;margin:6px 0 0;">Empowering Jamaica through Education</p>
              </td></tr>
              <!-- Body -->
              <tr><td style="padding:40px;">
                <h2 style="font-size:24px;color:#040617;font-weight:700;margin:0 0 8px;">Thank you, ${name}! 🎉</h2>
                <p style="font-size:16px;color:#6F7181;margin:0 0 32px;line-height:1.6;">Your generous donation has been successfully processed. Your support makes a real difference in the lives of Jamaican students and communities.</p>

                <!-- Receipt box -->
                <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F3EE;border-radius:12px;padding:24px;margin-bottom:32px;">
                  <tr><td style="padding-bottom:12px;">
                    <table width="100%"><tr>
                      <td style="font-size:14px;color:#6F7181;">Donation Amount</td>
                      <td style="font-size:16px;color:#040617;font-weight:700;text-align:right;">${displayAmount}</td>
                    </tr></table>
                  </td></tr>
                  ${projectTitle ? `<tr><td style="padding-bottom:12px;border-top:1px solid #E5E6EB;padding-top:12px;">
                    <table width="100%"><tr>
                      <td style="font-size:14px;color:#6F7181;">Project</td>
                      <td style="font-size:15px;color:#040617;text-align:right;text-transform:capitalize;">${projectTitle}</td>
                    </tr></table>
                  </td></tr>` : ''}
                  ${donationType ? `<tr><td style="padding-bottom:12px;border-top:1px solid #E5E6EB;padding-top:12px;">
                    <table width="100%"><tr>
                      <td style="font-size:14px;color:#6F7181;">Donation Type</td>
                      <td style="font-size:15px;color:#040617;text-align:right;text-transform:capitalize;">${donationType}</td>
                    </tr></table>
                  </td></tr>` : ''}
                  <tr><td style="border-top:1px solid #E5E6EB;padding-top:12px;">
                    <table width="100%">
                      <tr><td style="font-size:14px;color:#6F7181;padding-bottom:8px;">Order ID</td><td style="font-size:14px;color:#040617;font-weight:600;text-align:right;">${orderId}</td></tr>
                      ${authCode ? `<tr><td style="font-size:14px;color:#6F7181;padding-bottom:8px;">Authorization Code</td><td style="font-size:14px;color:#040617;font-weight:600;text-align:right;">${authCode}</td></tr>` : ''}
                      ${cardBrand ? `<tr><td style="font-size:14px;color:#6F7181;">Card</td><td style="font-size:14px;color:#040617;font-weight:600;text-align:right;">${cardBrand}</td></tr>` : ''}
                    </table>
                  </td></tr>
                </table>

                <p style="font-size:15px;color:#6F7181;line-height:1.6;margin:0 0 24px;">This receipt serves as confirmation of your donation. Please keep it for your records. All donations over $2 are tax deductible.</p>

                <div style="text-align:center;margin:32px 0;">
                  <a href="https://mico.themicofoundationja.org" style="background:#FFD900;color:#040617;font-size:16px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:12px;display:inline-block;">Visit Our Website</a>
                </div>
              </td></tr>
              <!-- Footer -->
              <tr><td style="background:#F5F3EE;padding:24px 40px;text-align:center;">
                <p style="font-size:13px;color:#9CA3AF;margin:0;">The Mico Foundation · Jamaica</p>
                <p style="font-size:13px;color:#9CA3AF;margin:4px 0 0;">Questions? Contact us at <a href="mailto:${process.env.ADMIN_EMAIL}" style="color:#040617;">${process.env.ADMIN_EMAIL}</a></p>
              </td></tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `,
  })
}

// ── Email: admin notification ─────────────────────────────────────────────────
async function sendAdminNotification({ donorEmail, donorName, amount, orderId, authCode, cardBrand, projectTitle, donationType }) {
  if (!process.env.ADMIN_EMAIL) return
  const displayAmount = typeof amount === 'number' ? `$${amount.toFixed(2)} USD` : amount
  await transporter.sendMail({
    from:    `"Mico Foundation Donations" <${process.env.EMAIL_USER}>`,
    to:      process.env.ADMIN_EMAIL,
    subject: `💛 New Donation Received — ${displayAmount} from ${donorName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family:Arial,sans-serif;padding:32px;background:#F5F3EE;">
        <div style="background:white;border-radius:12px;padding:32px;max-width:500px;margin:0 auto;">
          <h2 style="color:#040617;margin:0 0 24px;">💛 New Donation Received</h2>
          <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;">
            <tr style="border-bottom:1px solid #E5E6EB;"><td style="color:#6F7181;font-size:14px;">Donor</td><td style="color:#040617;font-weight:600;">${donorName}</td></tr>
            <tr style="border-bottom:1px solid #E5E6EB;"><td style="color:#6F7181;font-size:14px;">Email</td><td style="color:#040617;">${donorEmail}</td></tr>
            <tr style="border-bottom:1px solid #E5E6EB;"><td style="color:#6F7181;font-size:14px;">Amount</td><td style="color:#040617;font-weight:700;font-size:18px;">${displayAmount}</td></tr>
            ${projectTitle ? `<tr style="border-bottom:1px solid #E5E6EB;"><td style="color:#6F7181;font-size:14px;">Project</td><td style="color:#040617;text-transform:capitalize;">${projectTitle}</td></tr>` : ''}
            ${donationType ? `<tr style="border-bottom:1px solid #E5E6EB;"><td style="color:#6F7181;font-size:14px;">Type</td><td style="color:#040617;text-transform:capitalize;">${donationType}</td></tr>` : ''}
            <tr style="border-bottom:1px solid #E5E6EB;"><td style="color:#6F7181;font-size:14px;">Order ID</td><td style="color:#040617;font-family:monospace;">${orderId}</td></tr>
            ${authCode ? `<tr style="border-bottom:1px solid #E5E6EB;"><td style="color:#6F7181;font-size:14px;">Auth Code</td><td style="color:#040617;font-family:monospace;">${authCode}</td></tr>` : ''}
            ${cardBrand ? `<tr><td style="color:#6F7181;font-size:14px;">Card Brand</td><td style="color:#040617;">${cardBrand}</td></tr>` : ''}
          </table>
          <p style="color:#9CA3AF;font-size:12px;margin-top:24px;">This is an automated notification from the Mico Foundation donation system.</p>
        </div>
      </body>
      </html>
    `,
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
      const donorName  = donationMeta?.cardholderName || `${donationMeta?.firstName || ''} ${donationMeta?.lastName || ''}`.trim() || 'Donor'
      const donorEmail = donationMeta?.email || ''
      const orderId    = donationMeta?.orderId || data.OrderIdentifier
      const amount     = donationMeta?.amount || data.TotalAmount
      const authCode   = data.AuthorizationCode
      const cardBrand  = data.CardBrand

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
          transactionId:     data.TransactionIdentifier,
          authorizationCode: authCode,
          cardBrand,
          rrn:               data.RRN,
          status:            'completed',
          processedAt:       new Date().toISOString(),
          gateway:           'powertranz',
        })
        console.log('✅ Donation saved to Sanity:', orderId)
      } catch (sanityErr) {
        console.error('Sanity save error:', sanityErr)
      }

      // Send emails (non-blocking — don't fail payment if email fails)
      const emailData = {
        email:         donorEmail,
        donorEmail,
        donorName,
        name:          donorName,
        amount,
        orderId,
        authCode,
        cardBrand,
        projectTitle:  donationMeta?.projectTitle || '',
        donationType:  donationMeta?.donationType || '',
      }

      Promise.all([
        sendDonorConfirmation(emailData).catch(e => console.error('Donor email error:', e)),
        sendAdminNotification(emailData).catch(e => console.error('Admin email error:', e)),
      ])

      return NextResponse.json({
        success:           true,
        approved:          true,
        authorizationCode: authCode,
        transactionId:     data.TransactionIdentifier,
        orderId,
        cardBrand,
        amount:            data.TotalAmount,
        message:           data.ResponseMessage,
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