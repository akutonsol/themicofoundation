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

async function importProjects() {
  console.log('🚀 Starting Projects import...\n')

  const imagesPath = path.join(__dirname, '../public/images/home')

  // Project data with slugs for detail page links
  const projectsData = [
    {
      title: 'Buxton College',
      slug: 'buxton-college',
      label: 'Active Project',
      status: 'active',
      location: 'Jamaica, Buxton',
      description: "You'll be joining a community of dedicated supporters who value the preservation of historic landmarks and are helping restore the iconic Buxton Building.",
      image: 'buxton.png',
      targetAmount: 20000000,    // $20M
      amountDonated: 13000000,   // $13M = 65%
      buttonText: 'Rebuild College',
      backgroundColor: '#1A1600',
      order: 0
    },
    {
      title: 'Smart Classroom',
      slug: 'smart-classroom',
      label: 'Active Project',
      status: 'active',
      location: 'Jamaica, Kingston',
      description: "You'll be joining a community of committed donors who believe in advancing education through technology and are helping build a modern Smart Classroom at Mico.",
      image: 'smart.png',
      targetAmount: 200000,      // $200K
      amountDonated: 70000,      // $70K = 35%
      buttonText: 'Install Equipment',
      backgroundColor: '#1A1600',
      order: 1
    },
    {
      title: 'Complete Project №1',
      slug: 'complete-project-1',
      label: 'Complete Project',
      status: 'complete',
      location: 'Jamaica, Kingston',
      completedItems: [
        'Completed statement',
        'Completed statement',
        'Completed statement',
        'Completed statement',
        'Completed statement',
        'Completed statement'
      ],
      image: 'project1.png',
      targetAmount: 200000,      // $200K
      amountDonated: 200000,     // $200K = 100%
      buttonText: 'Donate to other project',
      backgroundColor: '#051507',
      order: 2
    },
    {
      title: 'Complete Project №2',
      slug: 'complete-project-2',
      label: 'Complete Project',
      status: 'complete',
      location: 'Jamaica, Buxton',
      completedItems: [
        'Completed statement',
        'Completed statement',
        'Completed statement',
        'Completed statement'
      ],
      image: 'project1.png',
      targetAmount: 500000,      // $500K
      amountDonated: 500000,     // $500K = 100%
      buttonText: 'Donate to other project',
      backgroundColor: '#051507',
      order: 3
    }
  ]

  try {
    // Upload all unique images
    const uploadedImages = {}
    const uniqueImages = [...new Set(projectsData.map(p => p.image))]

    for (const filename of uniqueImages) {
      const imagePath = path.join(imagesPath, filename)
      
      if (!fs.existsSync(imagePath)) {
        console.log(`⚠️  File not found: ${filename} - skipping`)
        continue
      }

      const asset = await uploadImage(imagePath, filename)
      if (asset) {
        uploadedImages[filename] = asset
      }
    }

    if (Object.keys(uploadedImages).length === 0) {
      console.error('\n❌ No images were uploaded!')
      process.exit(1)
    }

    // Create project documents
    const createdProjects = []

    for (const project of projectsData) {
      const imageAsset = uploadedImages[project.image]
      
      if (!imageAsset) {
        console.log(`⚠️  Skipping project "${project.title}" - image not uploaded`)
        continue
      }

      // Calculate percentage for display
      const percentage = project.targetAmount > 0 
        ? Math.round((project.amountDonated / project.targetAmount) * 100) 
        : 0

      const projectDoc = {
        _type: 'project',
        title: project.title,
        slug: {
          _type: 'slug',
          current: project.slug
        },
        label: project.label,
        status: project.status,
        location: project.location,
        ...(project.status === 'active' && { description: project.description }),
        ...(project.status === 'complete' && { completedItems: project.completedItems }),
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id
          }
        },
        targetAmount: project.targetAmount,
        amountDonated: project.amountDonated,
        buttonText: project.buttonText,
        backgroundColor: project.backgroundColor,
        order: project.order
      }

      const result = await client.create(projectDoc)
      createdProjects.push(result)
      console.log(`✅ Created project: ${project.title} (${percentage}%) - slug: ${project.slug}`)
    }

    console.log(`\n✅ Projects import completed!`)
    console.log(`   Created ${createdProjects.length} projects\n`)
    
    return createdProjects
  } catch (error) {
    console.error('\n❌ Error importing projects:', error.message)
    throw error
  }
}

// Run import
importProjects()
  .then(() => {
    console.log('✅ Import complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Import failed:', error)
    process.exit(1)
  })