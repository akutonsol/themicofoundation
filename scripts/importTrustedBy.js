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
  console.error('   Please create .env.local with:\n')
  console.error('   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id')
  console.error('   NEXT_PUBLIC_SANITY_DATASET=production')
  console.error('   SANITY_API_TOKEN=your_token\n')
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

async function importTrustedBy() {
  console.log('🚀 Starting Trusted By import...\n')

  // Path to sponsor logos
  const logosPath = path.join(__dirname, '../public/images/home')
  
  console.log(`📁 Looking for images in: ${logosPath}\n`)
  
  // Check if directory exists
  if (!fs.existsSync(logosPath)) {
    console.error(`❌ Directory not found: ${logosPath}`)
    console.error('   Please create the directory and add your sponsor logos\n')
    process.exit(1)
  }

  // Sponsor logos data (matching your current setup)
  const logosData = [
    { file: 'spons-logo1.png', name: 'Sponsor 1', width: 150, height: 52 },
    { file: 'spons-logo1.png', name: 'Sponsor 2', width: 150, height: 36 },
    { file: 'spons-logo1.png', name: 'Sponsor 3', width: 150, height: 52 },
    { file: 'spons-logo1.png', name: 'Sponsor 4', width: 150, height: 22 },
    { file: 'spons-logo1.png', name: 'Sponsor 5', width: 150, height: 22 },
    { file: 'spons-logo1.png', name: 'Sponsor 6', width: 150, height: 52 },
    { file: 'spons-logo1.png', name: 'Sponsor 7', width: 150, height: 36 },
    { file: 'spons-logo1.png', name: 'Sponsor 8', width: 150, height: 22 },
    { file: 'spons-logo1.png', name: 'Sponsor 9', width: 150, height: 52 },
    { file: 'spons-logo1.png', name: 'Sponsor 10', width: 150, height: 22 },
    { file: 'spons-logo1.png', name: 'Sponsor 11', width: 150, height: 36 },
    { file: 'spons-logo1.png', name: 'Sponsor 12', width: 150, height: 36 },
  ]

  try {
    // Upload all logos
    const uploadedLogos = []
    const uniqueFiles = [...new Set(logosData.map(l => l.file))]
    const uploadedAssets = {}

    for (const filename of uniqueFiles) {
      const imagePath = path.join(logosPath, filename)
      
      if (!fs.existsSync(imagePath)) {
        console.log(`⚠️  File not found: ${filename} - skipping`)
        continue
      }

      const asset = await uploadImage(imagePath, filename)
      if (asset) {
        uploadedAssets[filename] = asset
      }
    }

    if (Object.keys(uploadedAssets).length === 0) {
      console.error('\n❌ No images were uploaded!')
      console.error('   Please check that sponsor logos exist in: public/images/home/\n')
      process.exit(1)
    }

    // Create logo objects with references to uploaded images
    for (const logo of logosData) {
      const asset = uploadedAssets[logo.file]
      if (asset) {
        uploadedLogos.push({
          _type: 'object',
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id
            }
          },
          name: logo.name,
          width: logo.width,
          height: logo.height
        })
      }
    }

    // Create or update Trusted By document
    const trustedByDoc = {
      _id: 'trusted-by-section',
      _type: 'trustedBy',
      heading: 'Trusted By',
      logos: uploadedLogos,
      animationSpeed: 30
    }

    const result = await client.createOrReplace(trustedByDoc)
    console.log('\n✅ Trusted By section created successfully!')
    console.log(`   Uploaded ${uploadedLogos.length} sponsor logos`)
    console.log(`   Document ID: ${result._id}\n`)
    
    return result
  } catch (error) {
    console.error('\n❌ Error importing Trusted By:', error.message)
    throw error
  }
}

// Run import
importTrustedBy()
  .then(() => {
    console.log('✅ Import complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Import failed:', error)
    process.exit(1)
  })