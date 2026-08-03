import { createClient } from '@sanity/client'
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

function buildEndowmentConfirmationEmail({ firstName, fullName, endowmentType, giftDesignation, recognitionName, honorMemoryOf, email }) {
  const rows = [
    ['Donor Name', fullName],
    ['Email', email],
    endowmentType   ? ['Endowment Type', endowmentType]   : null,
    giftDesignation ? ['Gift Designation', giftDesignation] : null,
    recognitionName ? ['Recognition Name', recognitionName] : null,
    honorMemoryOf   ? ['In Honor / Memory Of', honorMemoryOf] : null,
  ].filter(Boolean)
  return `
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>Thank You for Your Endowment</title></head>
<body style="margin:0;padding:0;background:#F5F3EE;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F3EE;padding:40px 0;"><tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
      <tr><td style="background:#040617;padding:36px 40px;text-align:center;">
        <img src="https://mico.themicofoundationja.org/images/home/mico-logo-footer.png" alt="The Mico Foundation" style="height:56px;margin:0 auto 16px;display:block;"/>
        <div style="display:inline-block;background:#FFD900;border-radius:100px;padding:6px 20px;margin-bottom:8px;"><span style="font-size:13px;font-weight:700;color:#040617;letter-spacing:0.06em;text-transform:uppercase;">Endowment Received</span></div>
        <h1 style="font-size:32px;font-weight:800;color:#ffffff;margin:12px 0 0;letter-spacing:-0.5px;line-height:1.1;">Thank You, ${firstName}!</h1>
      </td></tr>
      <tr><td style="padding:28px 40px 0;">
        <p style="font-size:17px;color:#040617;line-height:1.7;margin:0;">Thank you for your interest in supporting The Mico University College through your endowment. We have received your commitment, and a member of our team will contact you shortly to discuss the next steps.</p>
      </td></tr>
      <tr><td style="padding:28px 40px 0;">
        <p style="font-size:13px;font-weight:700;color:#6F7181;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 14px;">Your Submission</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E5E6EB;border-radius:12px;overflow:hidden;">
          ${rows.map((row, i) => `<tr style="background:${i % 2 === 0 ? '#FFFFFF' : '#FAFAFA'};"><td style="padding:12px 18px;font-size:14px;color:#6F7181;font-weight:500;width:45%;">${row[0]}</td><td style="padding:12px 18px;font-size:14px;color:#040617;font-weight:600;">${row[1]}</td></tr>`).join('')}
        </table>
      </td></tr>
      <tr><td style="padding:32px 40px;text-align:center;border-top:1px solid #E5E6EB;">
        <p style="font-size:13px;color:#9CA3AF;margin:0 0 6px;">The Mico Foundation &bull; 1A Marescaux Road, Kingston, Jamaica</p>
        <p style="font-size:13px;color:#9CA3AF;margin:0;"><a href="https://mico.themicofoundationja.org" style="color:#6F7181;text-decoration:underline;">themicofoundationja.org</a></p>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`
}

export async function POST(request) {
  try {
    const body = await request.json()
    const firstName = (body.firstName || '').trim()
    const lastName = (body.lastName || '').trim()
    const email = (body.email || '').trim()
    const endowmentType = (body.endowmentType || '').trim()
    const giftDesignation = (body.giftDesignation || '').trim()
    const recognitionName = (body.recognitionName || '').trim()
    const honorMemoryOf = (body.honorMemoryOf || '').trim()
    // Backward compatible: accept a single `name` too.
    const fullName = [firstName, lastName].filter(Boolean).join(' ') || (body.name || '').trim()

    if (!fullName || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    await client.create({
      _type: 'endowmentSubmission',
      firstName,
      lastName,
      name: fullName,
      email,
      endowmentType,
      giftDesignation,
      recognitionName,
      honorMemoryOf,
      submittedAt: new Date().toISOString(),
    })

    console.log('✅ Endowment submission saved:', email)

    // Send confirmation to the donor + notification to admin (best-effort; don't fail the request on email errors).
    try {
      const emailData = { firstName, fullName, endowmentType, giftDesignation, recognitionName, honorMemoryOf, email }
      await Promise.all([
        transporter.sendMail({
          from:    `"The Mico Foundation" <${process.env.EMAIL_USER}>`,
          to:      email,
          subject: `Thank You for Your Endowment, ${firstName || fullName}!`,
          html:    buildEndowmentConfirmationEmail(emailData),
        }),
        process.env.ADMIN_EMAIL && transporter.sendMail({
          from:    `"The Mico Foundation" <${process.env.EMAIL_USER}>`,
          to:      process.env.ADMIN_EMAIL,
          subject: `New Endowment Commitment from ${fullName}`,
          html:    `<div style="font-family:Arial,sans-serif;padding:20px;"><h2>New Endowment Commitment</h2>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Endowment Type:</strong> ${endowmentType || 'N/A'}</p>
            <p><strong>Gift Designation:</strong> ${giftDesignation || 'N/A'}</p>
            <p><strong>Recognition Name:</strong> ${recognitionName || 'N/A'}</p>
            <p><strong>In Honor / Memory Of:</strong> ${honorMemoryOf || 'N/A'}</p></div>`,
        }),
      ])
      console.log('✅ Endowment emails sent to:', email)
    } catch (mailErr) {
      console.error('Endowment email error (submission still saved):', mailErr)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Endowment form error:', error)
    return NextResponse.json({ error: 'Failed to submit. Please try again.' }, { status: 500 })
  }
}