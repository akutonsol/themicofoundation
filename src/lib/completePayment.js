import { after } from 'next/server'
import { createClient } from '@sanity/client'
import nodemailer from 'nodemailer'

const PT_BASE_URL = process.env.POWERTRANZ_BASE_URL || 'https://staging.ptranz.com'
const SITE_URL    = process.env.NEXT_PUBLIC_SITE_URL || 'https://mico.themicofoundationja.org'

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token:     process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN,
  useCdn:    false,
})

const mailer = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD },
})

function buildReceiptUrl(data) {
  try {
    const encoded = Buffer.from(JSON.stringify(data)).toString('base64')
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
    return `${SITE_URL}/api/receipt?data=${encoded}`
  } catch { return null }
}

async function sendDonorConfirmation(data, receiptUrl) {
  const { email, name, amount, orderId, transactionId, authCode, cardBrand, projectTitle, donationType } = data
  if (!email) return

  const displayAmount = typeof amount === 'number' ? '$' + amount.toFixed(2) : String(amount || '0')
  const firstName     = (name || 'Donor').split(' ')[0]

  await mailer.sendMail({
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

async function sendAdminNotification(data) {
  const { donorEmail, donorName, amount, orderId, transactionId, authCode, cardBrand, projectTitle, donationType } = data
  if (!process.env.ADMIN_EMAIL) return

  const displayAmount = typeof amount === 'number' ? '$' + amount.toFixed(2) + ' USD' : String(amount || '0')

  await mailer.sendMail({
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

export async function completePayment(spiToken, donationMeta = {}) {
  const ptRes = await fetch(`${PT_BASE_URL}/Api/spi/payment`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(spiToken),
    signal:  AbortSignal.timeout(10000),
  })

  const pt = await ptRes.json()
  console.log('[completePayment] PowerTranz response:', JSON.stringify(pt))

  if (!ptRes.ok) {
    return {
      success: false, approved: false,
      error:   pt.ResponseMessage || `Gateway HTTP ${ptRes.status}`,
      errors:  pt.Errors,
    }
  }

  if (!pt.Approved || pt.IsoResponseCode !== '00') {
    return {
      success:         false,
      approved:        false,
      error:           pt.ResponseMessage || 'Payment was declined',
      isoResponseCode: pt.IsoResponseCode,
      errors:          pt.Errors,
    }
  }

  const donorName     = ((donationMeta?.firstName || '') + ' ' + (donationMeta?.lastName || '')).trim()
                        || donationMeta?.cardholderName || 'Donor'
  const donorEmail    = donationMeta?.email || ''
  const orderId       = donationMeta?.orderId || pt.OrderIdentifier
  const amount        = donationMeta?.amount  ?? pt.TotalAmount
  const authCode      = pt.AuthorizationCode
  const cardBrand     = pt.CardBrand
  const transactionId = pt.TransactionIdentifier
  const processedAt   = new Date().toISOString()

  try {
    const doc = {
      _type:             'donation',
      donorName,
      email:             donorEmail,
      phone:             donationMeta?.phone        || '',
      amount:            parseFloat(amount) || 0,
      currency:          donationMeta?.currency     || 'USD',
      donationType:      donationMeta?.donationType || 'once',
      message:           donationMeta?.message      || '',
      address:           donationMeta?.address      || '',
      city:              donationMeta?.city         || '',
      state:             donationMeta?.state        || '',
      postalCode:        donationMeta?.postalCode   || '',
      country:           donationMeta?.country      || '',
      orderId,
      transactionId,
      authorizationCode: authCode,
      cardBrand,
      rrn:               pt.RRN || '',
      status:            'completed',
      processedAt,
      gateway:           'powertranz',
      projectTitle:      donationMeta?.projectTitle || '',
    }
    if (donationMeta?.projectId) {
      doc.project = { _type: 'reference', _ref: donationMeta.projectId }
    }
    await sanity.create(doc)
    console.log('[completePayment] Saved to Sanity:', orderId)
  } catch (err) {
    console.error('[completePayment] Sanity error:', err.message)
  }

  const receiptUrl = buildReceiptUrl({
    donorName, donorEmail, amount, orderId, transactionId,
    authCode, cardBrand,
    projectTitle:  donationMeta?.projectTitle || '',
    donationType:  donationMeta?.donationType || 'general',
    address:       donationMeta?.address      || '',
    city:          donationMeta?.city         || '',
    state:         donationMeta?.state        || '',
    zip:           donationMeta?.postalCode   || '',
    country:       donationMeta?.country      || 'Jamaica',
    processedAt,
  })

  const emailData = {
    email: donorEmail, donorEmail, donorName, name: donorName,
    amount, orderId, transactionId, authCode, cardBrand,
    projectTitle: donationMeta?.projectTitle || '',
    donationType: donationMeta?.donationType || '',
  }

  after(async () => {
    try {
      await Promise.all([
        sendDonorConfirmation(emailData, receiptUrl).catch(e => console.error('[completePayment] Donor email:', e.message)),
        sendAdminNotification(emailData).catch(e => console.error('[completePayment] Admin email:', e.message)),
      ])
      console.log('[completePayment] Emails sent for:', orderId)
    } catch (e) {
      console.error('[completePayment] Email batch error:', e.message)
    }
  })

  return {
    success:           true,
    approved:          true,
    authorizationCode: authCode,
    transactionId,
    orderId,
    cardBrand,
    amount:            pt.TotalAmount,
    message:           pt.ResponseMessage,
    receiptUrl,
  }
}
