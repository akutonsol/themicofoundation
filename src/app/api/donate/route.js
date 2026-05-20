import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'
import nodemailer from 'nodemailer'
import { generateDonationReceipt } from '@/lib/generateReceipt'

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01'
})

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
})

export async function POST(request) {
  try {
    const data = await request.json()
    
    const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    
    // Prepare data for Sanity
    const donationData = {
      _type: 'donation',
      donorFirstName: data.firstName,
      donorLastName: data.lastName,
      email: data.email,
      address1: data.address1,
      address2: data.address2 || '',
      city: data.city,
      state: data.state,
      zip: data.zip,
      country: data.country,
      donationAmount: data.amount,
      donationType: data.donationType,
      project: {
        _type: 'reference',
        _ref: data.projectId
      },
      paymentMethod: data.paymentMethod,
      paymentStatus: 'completed',
      transactionId: transactionId,
      donationDate: new Date().toISOString(),
      emailSent: false
    }
    
   // Save to Sanity
const savedDonation = await sanityClient.create(donationData)
console.log('✅ Donation saved to Sanity:', savedDonation._id)

// Generate PDF receipt
console.log('📄 Starting PDF generation...')
const receiptData = {
  firstName: data.firstName,
  lastName: data.lastName,
  email: data.email,
  address1: data.address1,
  address2: data.address2 || '',
  city: data.city,
  state: data.state,
  zip: data.zip,
  country: data.country,
  amount: data.amount,
  donationType: data.donationType,
  projectTitle: data.projectTitle,
  paymentMethod: data.paymentMethod,
  transactionId: transactionId,
  donationDate: new Date().toISOString()
}

let pdfBuffer // Declare outside try block
try {
  pdfBuffer = await generateDonationReceipt(receiptData)
  console.log('✅ PDF Receipt generated successfully, size:', pdfBuffer.length, 'bytes')
} catch (pdfError) {
  console.error('❌ PDF Generation Error:', pdfError)
  throw new Error(`PDF generation failed: ${pdfError.message}`)
}

console.log('📧 Starting email send...')

try {
  // Send emails...
} catch (emailError) {
  console.error('❌ Email Error:', emailError)
  throw new Error(`Email sending failed: ${emailError.message}`)
}
    
    // Prepare email variables
    const donorName = `${data.firstName} ${data.lastName}`
    const projectName = data.projectTitle
    const amountFormatted = `$${data.amount}`
    const donationTypeText = data.donationType === 'monthly' ? 'Monthly' : 'One-Time'
    
    // Admin Email HTML
    const adminEmailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #040617; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #FFD900; padding: 30px; text-align: center; border-radius: 12px; }
          .header h1 { margin: 0; color: #040617; font-size: 28px; }
          .content { background: #FFFDF9; padding: 30px; margin-top: 20px; border: 1px solid #E5E6EB; border-radius: 12px; }
          .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #E5E6EB; }
          .detail-label { font-weight: 600; color: #6F7181; }
          .detail-value { color: #040617; }
          .highlight { background: #F0FDF4; border-left: 4px solid #5EDA71; padding: 15px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #6F7181; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 New Donation Received!</h1>
          </div>
          <div class="content">
            <div class="highlight">
              <h2 style="margin: 0 0 10px; color: #040617;">${amountFormatted} ${donationTypeText} Donation</h2>
              <p style="margin: 0; color: #6F7181;">for ${projectName}</p>
            </div>
            <h3>Donor Information</h3>
            <div class="detail-row"><span class="detail-label">Name:</span><span class="detail-value">${donorName}</span></div>
            <div class="detail-row"><span class="detail-label">Email:</span><span class="detail-value">${data.email}</span></div>
            <div class="detail-row"><span class="detail-label">Amount:</span><span class="detail-value" style="color: #5EDA71; font-weight: 600;">${amountFormatted}</span></div>
            <div class="detail-row"><span class="detail-label">Project:</span><span class="detail-value">${projectName}</span></div>
            <div class="detail-row"><span class="detail-label">Transaction ID:</span><span class="detail-value">${transactionId}</span></div>
            <p style="margin-top: 20px;">📎 Official receipt PDF is attached.</p>
          </div>
          <div class="footer">
            <p>The Mico Foundation Donation System</p>
          </div>
        </div>
      </body>
      </html>
    `
    
    // Donor Email HTML
    const donorEmailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #040617; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #FFD900; padding: 40px; text-align: center; border-radius: 12px; }
          .header h1 { margin: 0 0 10px; color: #040617; font-size: 32px; }
          .content { background: #FFFDF9; padding: 30px; margin-top: 20px; border: 1px solid #E5E6EB; border-radius: 12px; }
          .success-badge { background: #F0FDF4; border: 2px solid #5EDA71; border-radius: 12px; padding: 20px; text-align: center; margin: 20px 0; }
          .success-badge h2 { margin: 0 0 5px; color: #5EDA71; font-size: 24px; }
          .impact-section { background: linear-gradient(135deg, #5EDA71 0%, #FFD900 100%); padding: 25px; border-radius: 12px; color: #040617; margin: 25px 0; }
          .footer { text-align: center; margin-top: 30px; color: #6F7181; font-size: 14px; padding-top: 20px; border-top: 1px solid #E5E6EB; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You, ${data.firstName}!</h1>
            <p style="margin: 0; color: #040617; font-size: 18px;">Your generosity makes a real difference</p>
          </div>
          <div class="content">
            <div class="success-badge">
              <h2>✓ Donation Confirmed</h2>
              <p style="margin: 5px 0 0; color: #6F7181;">Your payment has been successfully processed</p>
            </div>
            <p>Dear ${donorName},</p>
            <p>Thank you for your generous ${donationTypeText.toLowerCase()} donation of <strong>${amountFormatted}</strong> to support <strong>${projectName}</strong>. Your contribution helps us create lasting change in our community.</p>
            <div class="impact-section">
              <h3 style="margin: 0 0 10px;">Your Impact</h3>
              <p style="margin: 0;">Your ${amountFormatted} donation helps equip students with school supplies, access to technology, and a safe learning environment.</p>
            </div>
            <p style="background: #FFF9E6; padding: 15px; border-radius: 8px;">
              <strong>📎 Tax Receipt Attached:</strong> Your official tax-deductible receipt is attached to this email. Please keep it for your tax records.
            </p>
            <p><strong>Transaction ID:</strong> ${transactionId}</p>
            <p>If you have any questions, contact us at <a href="mailto:donations@themicofoundation.org" style="color: #5EDA71;">donations@themicofoundation.org</a></p>
            <p>With gratitude,<br><strong>The Mico Foundation Team</strong></p>
          </div>
          <div class="footer">
            <p><strong>The Mico Foundation</strong></p>
            <p>1A Marescaux Road, Kingston 5, Jamaica</p>
            <p><a href="https://themicofoundation.org" style="color: #5EDA71;">themicofoundation.org</a></p>
          </div>
        </div>
      </body>
      </html>
    `
    
    // Send email to admin with PDF attachment
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || 'donations@themicofoundation.org',
      subject: `🎉 New ${donationTypeText} Donation: ${amountFormatted} from ${donorName}`,
      html: adminEmailHTML,
      attachments: [
        {
          filename: `Receipt-${transactionId}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    })
    
    // Send confirmation email to donor with PDF attachment
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: data.email,
      subject: `Thank you for your donation to The Mico Foundation`,
      html: donorEmailHTML,
      attachments: [
        {
          filename: `Mico-Foundation-Receipt-${transactionId}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    })
    
    // Update Sanity to mark email as sent
    await sanityClient
      .patch(savedDonation._id)
      .set({ emailSent: true })
      .commit()
    
    console.log('✅ Emails sent with PDF attachments')
    
    // Return success with PDF for browser download
    return NextResponse.json({ 
      success: true, 
      donationId: savedDonation._id,
      transactionId: transactionId,
      receipt: pdfBuffer.toString('base64') // For browser download
    })
    
  } catch (error) {
    console.error('❌ Error processing donation:', error)
    return NextResponse.json(
      { error: 'Failed to process donation', details: error.message }, 
      { status: 500 }
    )
  }
}
/**
 What This Does:
 1. Saves donation to Sanity
2. Generates professional PDF receipt
3.Sends email to admin with PDF attached
4. Sends email to donor with PDF attached
5. Automatically downloads PDF in browser
6.Updates Sanity that email was sent


Email Features:
Admin Email:

Notification of new donation
All donor details
PDF receipt attached
Goes to: ADMIN_EMAIL in .env.local

Donor Email:

Thank you message
Donation confirmation
Impact statement
PDF receipt attached
Tax deductibility notice
 * 

 PDF downloads automatically in browser
- Email with PDF attached to donor
- Email with PDF attached to admin
-  Success message on screen


Now your donors get the PDF 3 ways:

📥 Automatic browser download
📧 Email attachment (donor)
📧 Email attachment (admin)
 */