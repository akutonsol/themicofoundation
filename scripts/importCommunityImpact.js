import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables
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

// Helper function to upload image
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

async function importCommunityImpact() {
  console.log('🚀 Starting Community Impact import...\n')

  const imagesPath = path.join(__dirname, '../public/images/home')

  // Community Impact data
  const communityData = {
    headline: 'Join our community for donating and be a part of a positive changes in education',
    counterTarget: 98765,
    counterLabel: 'People already joined',
    buttonText: 'Join the community',
    buttonLink: '/community',
    images: {
      photoLeftTop: 'com0.png',
      photoLeftBottom: 'com3.png',
      photoRightTop: 'com2.png',
      photoRightBottom: 'com1.png'
    }
  }

  try {
    // Upload all images
    const uploadedImages = {}
    const imageKeys = Object.keys(communityData.images)

    for (const key of imageKeys) {
      const filename = communityData.images[key]
      const imagePath = path.join(imagesPath, filename)
      
      if (!fs.existsSync(imagePath)) {
        console.log(`⚠️  File not found: ${filename} - skipping`)
        continue
      }

      const asset = await uploadImage(imagePath, filename)
      if (asset) {
        uploadedImages[key] = asset
      }
    }

    if (Object.keys(uploadedImages).length !== imageKeys.length) {
      console.error('\n❌ Not all images were uploaded!')
      process.exit(1)
    }

    // Delete existing community impact document (singleton)
    const existing = await client.fetch(`*[_type == "communityImpact"][0]._id`)
    if (existing) {
      await client.delete(existing)
      console.log('🗑️  Deleted existing Community Impact document\n')
    }

    // Create community impact document
    const communityDoc = {
      _type: 'communityImpact',
      _id: 'communityImpact', // Singleton ID
      headline: communityData.headline,
      counterTarget: communityData.counterTarget,
      counterLabel: communityData.counterLabel,
      buttonText: communityData.buttonText,
      buttonLink: communityData.buttonLink,
      photoLeftTop: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: uploadedImages.photoLeftTop._id
        }
      },
      photoLeftBottom: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: uploadedImages.photoLeftBottom._id
        }
      },
      photoRightTop: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: uploadedImages.photoRightTop._id
        }
      },
      photoRightBottom: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: uploadedImages.photoRightBottom._id
        }
      }
    }

    const result = await client.create(communityDoc)
    console.log(`✅ Created Community Impact document`)
    console.log(`   Counter: ${communityData.counterTarget.toLocaleString()}+`)
    console.log(`   Photos: 4 images uploaded\n`)
    
    return result
  } catch (error) {
    console.error('\n❌ Error importing Community Impact:', error.message)
    throw error
  }
}

// Run import
importCommunityImpact()
  .then(() => {
    console.log('✅ Import complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Import failed:', error)
    process.exit(1)
  })
