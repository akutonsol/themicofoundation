import { createClient } from '@sanity/client'
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const client = createClient({
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

function formatAmount(amount, currency = 'USD') {
  const symbols = { USD:'$', JMD:'J$', GBP:'L', CAD:'CA$', EUR:'EUR' }
  const sym = symbols[currency] || '$'
  return `${sym}${parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits:2, maximumFractionDigits:2 })}`
}

function buildPledgeConfirmationEmail({ firstName, lastName, email, amount, currency, commitment, projectTitle, paymentMethod, country }) {
  const displayName   = [firstName, lastName].filter(Boolean).join(' ')
  const displayAmount = formatAmount(amount, currency)
  const project       = projectTitle || 'The Mico Foundation'

  const commitmentLabels = {
    monthly:    'Monthly',
    quarterly:  'Quarterly',
    annually:   'Annually',
    one_time:   'One-Time',
  }
  const commitmentDisplay = commitmentLabels[commitment] || commitment || 'Scheduled'

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Thank You for Your Pledge</title>
</head>
<body style="margin:0;padding:0;background:#F5F3EE;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F3EE;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#040617;padding:36px 40px;text-align:center;">
              <img src="https://mico.themicofoundationja.org/images/home/mico-logo-footer.png" alt="The Mico Foundation" style="height:56px;margin-bottom:16px;display:block;margin-left:auto;margin-right:auto;"/>
              <div style="display:inline-block;background:#FFD900;border-radius:100px;padding:6px 20px;margin-bottom:8px;">
                <span style="font-size:13px;font-weight:700;color:#040617;letter-spacing:0.06em;text-transform:uppercase;">Pledge Confirmed</span>
              </div>
              <h1 style="font-size:32px;font-weight:800;color:#ffffff;margin:12px 0 0;letter-spacing:-0.5px;line-height:1.1;">
                Thank You, ${firstName}!
              </h1>
            </td>
          </tr>

          <!-- Confirmation box -->
          <tr>
            <td style="padding:32px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#F0FBF2;border:1px solid #5EDA71;border-radius:14px;padding:24px;">
                <tr>
                  <td style="padding:24px;">
                    <p style="font-size:14px;font-weight:600;color:#1D7C2B;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 6px;">Pledge Amount</p>
                    <p style="font-size:42px;font-weight:800;color:#13531D;margin:0 0 4px;letter-spacing:-1px;line-height:1;">${displayAmount}</p>
                    <p style="font-size:15px;color:#2F8A45;margin:0;">${commitmentDisplay} commitment</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:28px 40px 0;">
              <p style="font-size:17px;color:#040617;line-height:1.7;margin:0;">
                Your pledge of <strong>${displayAmount}</strong> ${commitmentDisplay.toLowerCase()} toward <strong>${project}</strong> has been received. We are deeply grateful for your commitment to advancing education and opportunity across Jamaica and the Caribbean.
              </p>
              <p style="font-size:17px;color:#040617;line-height:1.7;margin:16px 0 0;">
                Our team will be in touch with next steps to help you fulfill your pledge at your convenience.
              </p>
            </td>
          </tr>

          <!-- Pledge details -->
          <tr>
            <td style="padding:28px 40px 0;">
              <p style="font-size:13px;font-weight:700;color:#6F7181;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 14px;">Pledge Details</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E5E6EB;border-radius:12px;overflow:hidden;">
                ${[
                  ['Donor Name',       displayName],
                  ['Email',            email],
                  ['Project',          project],
                  ['Amount',           displayAmount],
                  ['Commitment',       commitmentDisplay],
                  paymentMethod ? ['Payment Method', paymentMethod] : null,
                  country       ? ['Country',         country]       : null,
                ].filter(Boolean).map((row, i) => `
                <tr style="background:${i % 2 === 0 ? '#FFFFFF' : '#FAFAFA'};">
                  <td style="padding:12px 18px;font-size:14px;color:#6F7181;font-weight:500;width:40%;">${row[0]}</td>
                  <td style="padding:12px 18px;font-size:14px;color:#040617;font-weight:600;">${row[1]}</td>
                </tr>`).join('')}
              </table>
            </td>
          </tr>

          <!-- Impact section -->
          <tr>
            <td style="padding:28px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#040617;border-radius:14px;">
                <tr>
                  <td style="padding:24px 28px;">
                    <p style="font-size:13px;font-weight:700;color:#FFD900;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 10px;">Your Impact</p>
                    <p style="font-size:16px;color:rgba(255,255,255,0.85);line-height:1.65;margin:0;">
                      Pledges like yours directly fund scholarships, heritage restoration, and community programmes that transform lives across Jamaica and the wider Caribbean. Every commitment matters.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:28px 40px 0;text-align:center;">
              <a href="https://mico.themicofoundationja.org/projects" style="display:inline-block;background:#FFD900;color:#040617;font-size:15px;font-weight:700;padding:14px 32px;border-radius:14px;text-decoration:none;letter-spacing:-0.2px;">
                View Our Projects
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:32px 40px;text-align:center;border-top:1px solid #E5E6EB;margin-top:32px;">
              <p style="font-size:13px;color:#9CA3AF;margin:0 0 6px;">The Mico Foundation &bull; 1A Marescaux Road, Kingston, Jamaica</p>
              <p style="font-size:13px;color:#9CA3AF;margin:0;">
                <a href="https://mico.themicofoundationja.org" style="color:#6F7181;text-decoration:underline;">themicofoundationja.org</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  return html
}

function buildAdminNotification({ firstName, lastName, email, amount, currency, commitment, projectTitle, paymentMethod, country, phone }) {
  const displayAmount = formatAmount(amount, currency)
  const displayName   = [firstName, lastName].filter(Boolean).join(' ')
  return `
    <div style="font-family:Arial,sans-serif;padding:20px;background:#f9f9f9;">
      <h2 style="color:#040617;">New Pledge Received</h2>
      <table style="background:#fff;border-radius:8px;padding:20px;width:100%;border:1px solid #e5e5e5;">
        <tr><td style="padding:8px;color:#6F7181;">Name</td><td style="padding:8px;font-weight:600;">${displayName}</td></tr>
        <tr><td style="padding:8px;color:#6F7181;">Email</td><td style="padding:8px;">${email}</td></tr>
        <tr><td style="padding:8px;color:#6F7181;">Phone</td><td style="padding:8px;">${phone || 'N/A'}</td></tr>
        <tr><td style="padding:8px;color:#6F7181;">Amount</td><td style="padding:8px;font-weight:600;color:#13531D;">${displayAmount}</td></tr>
        <tr><td style="padding:8px;color:#6F7181;">Commitment</td><td style="padding:8px;">${commitment || 'N/A'}</td></tr>
        <tr><td style="padding:8px;color:#6F7181;">Project</td><td style="padding:8px;">${projectTitle || 'N/A'}</td></tr>
        <tr><td style="padding:8px;color:#6F7181;">Payment Method</td><td style="padding:8px;">${paymentMethod || 'N/A'}</td></tr>
        <tr><td style="padding:8px;color:#6F7181;">Country</td><td style="padding:8px;">${country || 'N/A'}</td></tr>
      </table>
    </div>`
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, amount, currency, country, paymentMethod, commitment, projectTitle } = body

    if (!firstName?.trim() || !email?.trim() || !amount) {
      return NextResponse.json({ error: 'First name, email and amount are required' }, { status: 400 })
    }

    // Save to Sanity
    await client.create({
      _type:         'pledgeSubmission',
      firstName:     firstName.trim(),
      lastName:      lastName?.trim() || '',
      email:         email.trim(),
      phone:         phone?.trim() || '',
      amount:        parseFloat(amount),
      currency:      currency || 'USD',
      country:       country || '',
      paymentMethod: paymentMethod || '',
      commitment:    commitment || '',
      projectTitle:  projectTitle || '',
      submittedAt:   new Date().toISOString(),
    })

    console.log('Pledge submission saved:', email, amount)

    // Send emails
    const emailData = { firstName, lastName, email, phone, amount, currency, country, paymentMethod, commitment, projectTitle }

    await Promise.all([
      // Donor confirmation
      transporter.sendMail({
        from:    `"The Mico Foundation" <${process.env.EMAIL_USER}>`,
        to:      email.trim(),
        subject: `Thank You for Your Pledge, ${firstName}!`,
        html:    buildPledgeConfirmationEmail(emailData),
      }),
      // Admin notification
      transporter.sendMail({
        from:    `"The Mico Foundation" <${process.env.EMAIL_USER}>`,
        to:      process.env.ADMIN_EMAIL,
        subject: `New Pledge: ${formatAmount(amount, currency)} from ${firstName} ${lastName || ''}`.trim(),
        html:    buildAdminNotification(emailData),
      }),
    ])

    console.log('Pledge emails sent to:', email)
    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Pledge form error:', error)
    return NextResponse.json({ error: 'Failed to submit. Please try again.' }, { status: 500 })
  }
}