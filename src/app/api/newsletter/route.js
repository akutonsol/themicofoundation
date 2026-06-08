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
    const { firstName, lastName, email } = await request.json()

    if (!firstName?.trim() || !email?.trim()) {
      return NextResponse.json({ error: 'First name and email are required' }, { status: 400 })
    }

    // Check if email already subscribed
    const existing = await client.fetch(
      `*[_type == "newsletterSubscriber" && email == $email][0]`,
      { email: email.toLowerCase().trim() }
    )

    if (existing) {
      return NextResponse.json({ error: 'This email is already subscribed' }, { status: 409 })
    }

    // Save to Sanity
    await client.create({
      _type: 'newsletterSubscriber',
      firstName: firstName.trim(),
      lastName: lastName?.trim() || '',
      email: email.toLowerCase().trim(),
      subscribedAt: new Date().toISOString(),
      isActive: true,
    })

    console.log('✅ Newsletter subscriber saved:', email)
    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Newsletter error:', error)
    return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 500 })
  }
}
