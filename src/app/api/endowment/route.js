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
    const { name, email, endowmentType } = await request.json()

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    await client.create({
      _type: 'endowmentSubmission',
      name: name.trim(),
      email: email.trim(),
      endowmentType: endowmentType?.trim() || '',
      submittedAt: new Date().toISOString(),
    })

    console.log('✅ Endowment submission saved:', email)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Endowment form error:', error)
    return NextResponse.json({ error: 'Failed to submit. Please try again.' }, { status: 500 })
  }
}