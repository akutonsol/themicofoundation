import { createClient } from '@sanity/client'
import { NextResponse } from 'next/server'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

export async function POST() {
  try {
    console.log('Token exists:', !!process.env.SANITY_API_TOKEN)
    console.log('Token prefix:', process.env.SANITY_API_TOKEN?.slice(0, 10))
    // Get or create the stats document
    let stats = await client.fetch(`*[_type == "siteStats"][0]`)

    if (!stats) {
      stats = await client.create({
        _type: 'siteStats',
        visitorCount: 1,
        lastUpdated: new Date().toISOString(),
      })
    } else {
      await client
        .patch(stats._id)
        .inc({ visitorCount: 1 })
        .set({ lastUpdated: new Date().toISOString() })
        .commit()
    }

    const updated = await client.fetch(`*[_type == "siteStats"][0]{ visitorCount }`)
    return NextResponse.json({ count: updated?.visitorCount || 1 })
  } catch (error) {
    console.error('Visit counter error:', error)
    return NextResponse.json({ count: 0 }, { status: 500 })
  }
}

export async function GET() {
  try {
    const stats = await client.fetch(`*[_type == "siteStats"][0]{ visitorCount }`)
    return NextResponse.json({ count: stats?.visitorCount || 0 })
  } catch (error) {
    return NextResponse.json({ count: 0 }, { status: 500 })
  }
}