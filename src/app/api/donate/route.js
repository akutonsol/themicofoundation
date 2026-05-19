import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'
import nodemailer from 'nodemailer'

// ADD THIS DEBUG BLOCK AT THE TOP
console.log('=== ROUTE LOADED - CHECKING ENV ===')
console.log('EMAIL_USER:', process.env.EMAIL_USER)
console.log('EMAIL_PASSWORD exists?', !!process.env.EMAIL_PASSWORD)
console.log('EMAIL_PASSWORD length:', process.env.EMAIL_PASSWORD?.length)
console.log('====================================')


const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01'
})

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or 'smtp', 'sendgrid', etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
})

export async function POST(request) {
  try {
    const data = await request.json()
    
    // Generate unique transaction ID
    const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    
    // Prepare donation data for Sanity
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
      paymentStatus: 'completed', // Update based on actual payment processing
      transactionId: transactionId,
      donationDate: new Date().toISOString(),
      emailSent: false
    }
    
    // Save to Sanity
    const savedDonation = await sanityClient.create(donationData)
    console.log('Donation saved to Sanity:', savedDonation._id)
    
    // Prepare email content
    const donorName = `${data.firstName} ${data.lastName}`
    const projectName = data.projectTitle
    const amountFormatted = `$${data.amount}`
    const donationTypeText = data.donationType === 'monthly' ? 'Monthly' : 'One-Time'
    
    // Email to Admin (Foundation)
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
            <div class="detail-row">
              <span class="detail-label">Name:</span>
              <span class="detail-value">${donorName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Email:</span>
              <span class="detail-value">${data.email}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Address:</span>
              <span class="detail-value">${data.address1}${data.address2 ? ', ' + data.address2 : ''}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">City, State:</span>
              <span class="detail-value">${data.city}, ${data.state} ${data.zip}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Country:</span>
              <span class="detail-value">${data.country}</span>
            </div>
            
            <h3 style="margin-top: 30px;">Donation Details</h3>
            <div class="detail-row">
              <span class="detail-label">Amount:</span>
              <span class="detail-value" style="color: #5EDA71; font-weight: 600; font-size: 18px;">${amountFormatted}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Type:</span>
              <span class="detail-value">${donationTypeText}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Project:</span>
              <span class="detail-value">${projectName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Payment Method:</span>
              <span class="detail-value">${data.paymentMethod.charAt(0).toUpperCase() + data.paymentMethod.slice(1)}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Transaction ID:</span>
              <span class="detail-value">${transactionId}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Date:</span>
              <span class="detail-value">${new Date().toLocaleString()}</span>
            </div>
          </div>
          
          <div class="footer">
            <p>This notification was sent from The Mico Foundation donation system</p>
          </div>
        </div>
      </body>
      </html>
    `
    
    // Email to Donor (Receipt/Confirmation)
    const donorEmailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #040617; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #FFD900; padding: 40px; text-align: center; border-radius: 12px; }
          .header h1 { margin: 0 0 10px; color: #040617; font-size: 32px; }
          .header p { margin: 0; color: #040617; font-size: 18px; }
          .content { background: #FFFDF9; padding: 30px; margin-top: 20px; border: 1px solid #E5E6EB; border-radius: 12px; }
          .success-badge { background: #F0FDF4; border: 2px solid #5EDA71; border-radius: 12px; padding: 20px; text-align: center; margin: 20px 0; }
          .success-badge h2 { margin: 0 0 5px; color: #5EDA71; font-size: 24px; }
          .detail-box { background: #F9FAFB; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .detail-row { padding: 8px 0; display: flex; justify-content: space-between; }
          .detail-label { color: #6F7181; }
          .detail-value { color: #040617; font-weight: 500; }
          .impact-section { background: linear-gradient(135deg, #5EDA71 0%, #FFD900 100%); padding: 25px; border-radius: 12px; color: #040617; margin: 25px 0; }
          .impact-section h3 { margin: 0 0 10px; }
          .cta-button { display: inline-block; background: #FFD900; color: #040617; padding: 15px 30px; border-radius: 12px; text-decoration: none; font-weight: 600; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #6F7181; font-size: 14px; padding-top: 20px; border-top: 1px solid #E5E6EB; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You, ${data.firstName}!</h1>
            <p>Your generosity makes a real difference</p>
          </div>
          
          <div class="content">
            <div class="success-badge">
              <h2>✓ Donation Confirmed</h2>
              <p style="margin: 5px 0 0; color: #6F7181;">Your payment has been successfully processed</p>
            </div>
            
            <p>Dear ${donorName},</p>
            <p>Thank you for your generous ${donationTypeText.toLowerCase()} donation of <strong>${amountFormatted}</strong> to support <strong>${projectName}</strong>. Your contribution helps us create lasting change in our community.</p>
            
            <div class="impact-section">
              <h3>Your Impact</h3>
              <p style="margin: 0;">Your ${amountFormatted} donation helps equip students with school supplies, access to technology, and a safe learning environment — giving them the chance to thrive and build a better future.</p>
            </div>
            
            <h3>Donation Receipt</h3>
            <div class="detail-box">
              <div class="detail-row">
                <span class="detail-label">Donation Amount:</span>
                <span class="detail-value" style="color: #5EDA71; font-size: 18px;">${amountFormatted}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Donation Type:</span>
                <span class="detail-value">${donationTypeText}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Project:</span>
                <span class="detail-value">${projectName}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Transaction ID:</span>
                <span class="detail-value">${transactionId}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span class="detail-value">${new Date().toLocaleDateString()}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Payment Method:</span>
                <span class="detail-value">${data.paymentMethod.charAt(0).toUpperCase() + data.paymentMethod.slice(1)}</span>
              </div>
            </div>
            
            <p style="background: #FFF9E6; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <strong>Tax Deductible:</strong> All donations over $2 are tax deductible. Please keep this email as your official receipt for tax purposes. Our Tax ID: XX-XXXXXXX
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://themicofoundation.org/projects" class="cta-button">View Project Progress</a>
            </div>
            
            <p>If you have any questions about your donation, please don't hesitate to contact us at <a href="mailto:donations@themicofoundation.org" style="color: #5EDA71;">donations@themicofoundation.org</a></p>
            
            <p>With gratitude,<br><strong>The Mico Foundation Team</strong></p>
          </div>
          
          <div class="footer">
            <p><strong>The Mico Foundation</strong></p>
            <p>1A Marescaux Road, Kingston 5, Jamaica</p>
            <p><a href="https://themicofoundation.org" style="color: #5EDA71;">themicofoundation.org</a></p>
            <p style="margin-top: 15px; font-size: 12px;">This is an automated receipt. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `
    
    // Send email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || 'donations@themicofoundation.org',
      subject: `🎉 New ${donationTypeText} Donation: ${amountFormatted} from ${donorName}`,
      html: adminEmailHTML
    })
    
    // Send confirmation email to donor
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: data.email,
      subject: `Thank you for your donation to The Mico Foundation`,
      html: donorEmailHTML
    })
    
    // Update Sanity document to mark email as sent
    await sanityClient
      .patch(savedDonation._id)
      .set({ emailSent: true })
      .commit()
    
    console.log('Emails sent successfully')
    
    return NextResponse.json({ 
      success: true, 
      donationId: savedDonation._id,
      transactionId: transactionId
    })
    
  } catch (error) {
    console.error('Error processing donation:', error)
    return NextResponse.json(
      { error: 'Failed to process donation', details: error.message }, 
      { status: 500 }
    )
  }
}