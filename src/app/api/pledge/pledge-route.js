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
    const { firstName, lastName, email, phone, amount, currency, country, paymentMethod, commitment, projectTitle } = body

    if (!firstName?.trim() || !email?.trim() || !amount) {
      return NextResponse.json({ error: 'First name, email and amount are required' }, { status: 400 })
    }

    await client.create({
      _type: 'pledgeSubmission',
      firstName: firstName.trim(),
      lastName: lastName?.trim() || '',
      email: email.trim(),
      phone: phone?.trim() || '',
      amount: parseFloat(amount),
      currency: currency || 'USD',
      country: country || '',
      paymentMethod: paymentMethod || '',
      commitment: commitment || '',
      projectTitle: projectTitle || '',
      submittedAt: new Date().toISOString(),
    })

    console.log('✅ Pledge submission saved:', email, amount)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Pledge form error:', error)
    return NextResponse.json({ error: 'Failed to submit. Please try again.' }, { status: 500 })
  }
}