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
    const firstName = (body.firstName || '').trim()
    const lastName = (body.lastName || '').trim()
    const email = (body.email || '').trim()
    const endowmentType = (body.endowmentType || '').trim()
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
      submittedAt: new Date().toISOString(),
    })

    console.log('✅ Endowment submission saved:', email)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Endowment form error:', error)
    return NextResponse.json({ error: 'Failed to submit. Please try again.' }, { status: 500 })
  }
}