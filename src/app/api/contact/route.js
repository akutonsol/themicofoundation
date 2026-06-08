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
    const { firstName, lastName, email, subject, message } = await request.json()

    if (!firstName?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'First name, email and message are required' }, { status: 400 })
    }

    await client.create({
      _type: 'contactSubmission',
      firstName: firstName.trim(),
      lastName: lastName?.trim() || '',
      email: email.trim(),
      subject: subject?.trim() || '',
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    })

    console.log('✅ Contact submission saved:', email)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to submit. Please try again.' }, { status: 500 })
  }
}