import { createClient } from '@sanity/client'
import { NextResponse } from 'next/server'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

export async function POST(request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, address1, address2, country, city, zip, state, subject, message } = body

    if (!firstName?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'First name, email and message are required' }, { status: 400 })
    }

    await client.create({
      _type: 'sponsorshipSubmission',
      firstName: firstName.trim(),
      lastName: lastName?.trim() || '',
      email: email.trim(),
      address1: address1?.trim() || '',
      address2: address2?.trim() || '',
      country: country?.trim() || '',
      city: city?.trim() || '',
      zip: zip?.trim() || '',
      state: state?.trim() || '',
      subject: subject?.trim() || '',
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    })

    console.log('✅ Sponsorship submission saved:', email)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Sponsorship form error:', error)
    return NextResponse.json({ error: 'Failed to submit. Please try again.' }, { status: 500 })
  }
}