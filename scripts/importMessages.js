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

async function importMessages() {
  console.log('🚀 Starting Messages import...\n')

  const imagesPath = path.join(__dirname, '../public/images/home')

  // Messages section settings
  const sectionData = {
    heading: 'Messages for you',
    description: 'These short notes were shared by members of our team to give you a glimpse into who we are and why we care. We hope they help you feel more connected to our mission.',
    buttonText: 'Read full message',
    buttonLink: '/messages'
  }

  // Team member messages
  const messagesData = [
    {
      name: 'Dr. R. Karl James CD.',
      role: 'Trustee',
      photo: 'karl.png',
      quote: 'The Mico Foundation has been instrumental in preserving the legacy and future of Mico University College. Our commitment to education is unwavering and we continue to serve our community with dedication.',
      fullMessage: 'The Mico Foundation has been instrumental in preserving the legacy and future of Mico University College. Our commitment to education is unwavering and we continue to serve our community with dedication. Throughout my tenure as Trustee, I have witnessed the transformative power of education and the dedication of our team to ensure that every student has access to quality learning opportunities.',
      order: 0,
      isActive: true
    },
    {
      name: 'Mr. Burchell Duhaney J.P.',
      role: 'Secretary Manager',
      photo: 'burchell.png',
      quote: 'I am indeed happy to lead the management team of The Mico Foundation at this time when The Mico University College is on the verge of changing its status to full university...',
      fullMessage: 'I am indeed happy to lead the management team of The Mico Foundation at this time when The Mico University College is on the verge of changing its status to full university. This is a historic moment for our institution and our country. The Foundation continues to play a crucial role in supporting the development of educational infrastructure and programs that benefit our students and community.',
      order: 1,
      isActive: true
    },
    {
      name: 'Dr. Sylvester Tulloch, CD.',
      role: 'Chairman',
      photo: 'tulloch.png',
      quote: 'Our foundation stands as a testament to the enduring legacy of Lady Mico. We are committed to ensuring that every student has access to quality education and opportunities for growth.',
      fullMessage: 'Our foundation stands as a testament to the enduring legacy of Lady Mico. We are committed to ensuring that every student has access to quality education and opportunities for growth. As Chairman, I am proud of the work we have accomplished and excited about the future as we continue to expand our reach and impact in the educational sector.',
      order: 2,
      isActive: true
    }
  ]

  try {
    // Upload all team photos
    const uploadedImages = {}

    for (const message of messagesData) {
      const imagePath = path.join(imagesPath, message.photo)
      
      if (!fs.existsSync(imagePath)) {
        console.log(`⚠️  File not found: ${message.photo} - skipping`)
        continue
      }

      const asset = await uploadImage(imagePath, message.photo)
      if (asset) {
        uploadedImages[message.photo] = asset
      }
    }

    if (Object.keys(uploadedImages).length !== messagesData.length) {
      console.error('\n❌ Not all images were uploaded!')
      process.exit(1)
    }

    // Create/update Messages Section Settings (singleton)
    const existingSection = await client.fetch(`*[_type == "messagesSection"][0]._id`)
    if (existingSection) {
      await client.delete(existingSection)
      console.log('🗑️  Deleted existing Messages Section Settings\n')
    }

    const sectionDoc = {
      _type: 'messagesSection',
      _id: 'messagesSection',
      ...sectionData
    }

    await client.create(sectionDoc)
    console.log('✅ Created Messages Section Settings\n')

    // Create team message documents
    const createdMessages = []

    for (const message of messagesData) {
      const imageAsset = uploadedImages[message.photo]
      
      if (!imageAsset) {
        console.log(`⚠️  Skipping message for "${message.name}" - image not uploaded`)
        continue
      }

      const messageDoc = {
        _type: 'message',
        name: message.name,
        role: message.role,
        photo: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id
          }
        },
        quote: message.quote,
        fullMessage: message.fullMessage,
        order: message.order,
        isActive: message.isActive
      }

      const result = await client.create(messageDoc)
      createdMessages.push(result)
      console.log(`✅ Created message: ${message.name} (${message.role})`)
    }

    console.log(`\n✅ Messages import completed!`)
    console.log(`   Section settings: Created`)
    console.log(`   Team messages: ${createdMessages.length} created\n`)
    
    return { section: sectionDoc, messages: createdMessages }
  } catch (error) {
    console.error('\n❌ Error importing messages:', error.message)
    throw error
  }
}

// Run import
importMessages()
  .then(() => {
    console.log('✅ Import complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Import failed:', error)
    process.exit(1)
  })
