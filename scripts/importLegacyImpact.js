import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables from .env.local
const envPath = path.join(__dirname, '../.env.local')
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath })
  console.log('✅ Loaded environment variables from .env.local\n')
} else {
  console.error('❌ .env.local file not found!')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01'
})

console.log(`📋 Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
console.log(`📋 Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}\n`)

// Helper function to upload image to Sanity
async function uploadImage(imagePath, filename) {
  try {
    const imageBuffer = fs.readFileSync(imagePath)
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: filename
    })
    console.log(`✅ Uploaded: ${filename}`)
    return asset
  } catch (error) {
    console.error(`❌ Error uploading ${filename}:`, error.message)
    return null
  }
}

async function importLegacyImpact() {
  console.log('🚀 Starting Legacy Impact import...\n')

  const imagePath = path.join(__dirname, '../public/images/home/holness.jpg')
  
  if (!fs.existsSync(imagePath)) {
    console.error(`❌ Image not found: ${imagePath}`)
    process.exit(1)
  }

  try {
    // Upload hero image
    console.log('📸 Uploading hero image...')
    const heroImageAsset = await uploadImage(imagePath, 'holness.jpg')
    
    if (!heroImageAsset) {
      console.error('\n❌ Failed to upload hero image!')
      process.exit(1)
    }

    // Create Legacy Impact document
    const legacyImpactDoc = {
      _id: 'legacy-impact-section',
      _type: 'legacyImpact',
      badge: 'Why The Foundation Exists',
      headline: 'Preserving Legacy. Empowering Futures.',
      paragraph1: 'The Mico Foundation exists to preserve the educational heritage of The Mico University College while advancing opportunities for future generations.',
      paragraph2: 'Through restoration projects, scholarships, institutional development, and community partnerships, every contribution helps strengthen a legacy that has transformed lives for nearly two centuries.',
      button1: {
        text: 'Explore Projects',
        link: '/projects'
      },
      button2: {
        text: 'Become a Donor',
        link: '/donate'
      },
      heroImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: heroImageAsset._id
        }
      },
      locationBadge: 'Jamaica • Education • Legacy',
      bottomQuote: 'Every generation deserves access to educational opportunity.',
      stats: [
        {
          _type: 'object',
          value: '1836',
          label: 'Educational legacy established'
        },
        {
          _type: 'object',
          value: '45+',
          label: 'Completed and active projects'
        },
        {
          _type: 'object',
          value: 'Global',
          label: 'Donor and alumni support network'
        }
      ]
    }

    const result = await client.createOrReplace(legacyImpactDoc)
    console.log('\n✅ Legacy Impact section created successfully!')
    console.log(`   Document ID: ${result._id}\n`)
    
    return result
  } catch (error) {
    console.error('\n❌ Error importing Legacy Impact:', error.message)
    throw error
  }
}

// Run import
importLegacyImpact()
  .then(() => {
    console.log('✅ Import complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Import failed:', error)
    process.exit(1)
  })
