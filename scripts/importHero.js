// scripts/importContent.js
// Run this script to import existing hardcoded content into Sanity CMS

import dotenv from 'dotenv'
import { createClient } from '@sanity/client'

// Load environment variables
dotenv.config({ path: '.env.local' })
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN, // You'll need to create this
  apiVersion: '2024-01-01'
})

// Helper function to upload image to Sanity
async function uploadImage(imagePath) {
  try {
    const fullPath = path.join(__dirname, '..', 'public', imagePath)
    
    if (!fs.existsSync(fullPath)) {
      console.warn(`⚠️  Image not found: ${imagePath}`)
      return null
    }

    const imageBuffer = fs.readFileSync(fullPath)
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath)
    })
    
    console.log(`✅ Uploaded: ${imagePath}`)
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id
      }
    }
  } catch (error) {
    console.error(`❌ Failed to upload ${imagePath}:`, error.message)
    return null
  }
}

// Site Settings Data
const siteSettingsData = {
  _type: 'siteSettings',
  _id: 'siteSettings',
  siteName: 'The Mico Foundation',
  siteDescription: 'Empowering education and community development in Jamaica',
  contactInfo: {
    phones: ['+1 876-xxx-xxxx', '+1 876-xxx-xxxx'],
    emails: ['info@micofoundation.org', 'contact@micofoundation.org'],
    address: {
      street: '1A Marescaux Road',
      city: 'Kingston',
      country: 'Jamaica'
    },
    openingHours: {
      weekdays: 'Monday - Friday, 9:00 AM - 5:00 PM',
      weekend: 'Closed'
    }
  },
  socialMedia: {
    facebook: 'https://facebook.com/micofoundation',
    twitter: 'https://twitter.com/micofoundation',
    instagram: 'https://instagram.com/micofoundation',
    linkedin: 'https://linkedin.com/company/micofoundation',
    youtube: 'https://youtube.com/@micofoundation'
  },
  footerSettings: {
    aboutText: 'The Mico Foundation is dedicated to empowering communities through education and sustainable development initiatives across Jamaica.',
    copyrightText: '© 2026 The Mico Foundation. All rights reserved.',
    developerCredit: {
      text: 'Designed & Developed by Akuton Solutions',
      url: 'https://akutonsolutions.com'
    }
  }
}

// Hero Section Data
const heroData = {
  _type: 'hero',
  _id: 'hero',
  mainHeadline: 'Transforming Lives Through Education',
  subHeadline: 'Building stronger communities and empowering the next generation of leaders in Jamaica',
  donationCount: '12391+',
  donationText: 'donation already sented',
  videoId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
  ctaButton: {
    text: 'Donate Now',
    link: '/donate'
  }
}

// Projects Data
const projectsData = [
  {
    _type: 'project',
    title: 'Rebuild Buxton College',
    label: 'Active Project',
    location: 'Jamaica, Buxton',
    description: 'Restoring educational infrastructure to provide quality learning environments for students.',
    status: 'active',
    percentage: 70,
    goal: '$20M',
    raised: '$14M',
    buttonText: 'Rebuild College',
    order: 0
  },
  {
    _type: 'project',
    title: 'Smart Classroom Initiative',
    label: 'Active Project',
    location: 'Jamaica, Kingston',
    description: 'Equipping classrooms with modern technology to enhance digital literacy and learning outcomes.',
    status: 'active',
    percentage: 45,
    goal: '$500K',
    raised: '$225K',
    buttonText: 'Support Technology',
    order: 1
  },
  {
    _type: 'project',
    title: 'Community Library Expansion',
    label: 'Complete Project',
    location: 'Jamaica, Kingston',
    description: 'Successfully expanded library facilities and resources.',
    status: 'complete',
    percentage: 100,
    goal: '$200K',
    raised: '$200K',
    buttonText: 'View Project',
    completedItems: [
      'New library wing constructed',
      '5,000+ books added to collection',
      'Computer lab established',
      'Reading programs launched'
    ],
    order: 2
  }
]

// Donation Settings Data
const donationSettingsData = {
  _type: 'donationSettings',
  _id: 'donationSettings',
  heading: 'Make a Donation',
  description: 'Your contribution helps us continue our mission of empowering communities through education.',
  presetAmounts: [10, 25, 50, 100, 250, 500],
  defaultFrequency: 'once',
  paymentMethods: {
    card: true,
    paypal: true,
    inPerson: true
  },
  projectLocation: 'Jamaica, Buxton',
  successMessage: 'Thank you for your generous donation! Your support makes a real difference.'
}

// Newsletter Settings Data
const newsletterSettingsData = {
  _type: 'newsletterSettings',
  _id: 'newsletterSettings',
  heading: 'Subscribe to Our Newsletter',
  description: 'Stay updated with our latest projects, events, and impact stories.',
  successMessage: '🎉 You\'re subscribed! Thank you for joining.',
  buttonText: 'Subscribe'
}

// FAQs Data
const faqsData = [
  {
    _type: 'faq',
    question: 'How can I make a donation?',
    answer: 'You can donate through our website using credit/debit card, PayPal, or visit our office for in-person donations.',
    category: 'donations',
    order: 0
  },
  {
    _type: 'faq',
    question: 'Are donations tax-deductible?',
    answer: 'Yes, The Mico Foundation is a registered non-profit organization. All donations are tax-deductible to the extent allowed by law.',
    category: 'donations',
    order: 1
  },
  {
    _type: 'faq',
    question: 'How are donations used?',
    answer: 'Donations directly fund our education programs, infrastructure projects, and community development initiatives. We maintain full transparency with quarterly reports.',
    category: 'donations',
    order: 2
  },
  {
    _type: 'faq',
    question: 'Can I volunteer with The Mico Foundation?',
    answer: 'Yes! We welcome volunteers. Visit our Work With Us page to learn about current volunteer opportunities and application process.',
    category: 'volunteering',
    order: 3
  },
  {
    _type: 'faq',
    question: 'Where are your projects located?',
    answer: 'Our projects are primarily located throughout Jamaica, with a focus on underserved communities in Kingston and surrounding areas.',
    category: 'projects',
    order: 4
  }
]

// Main import function
async function importContent() {
  console.log('🚀 Starting Sanity content import...\n')

  try {
    // 1. Import Site Settings
    console.log('📝 Importing Site Settings...')
    await client.createOrReplace(siteSettingsData)
    console.log('✅ Site Settings imported\n')

    // 2. Import Hero Section with images
    console.log('📝 Importing Hero Section...')
    const heroImages = [
      '/images/home-hero/students-classroom.png',
      '/images/home-hero/children-smiling.png',
      '/images/home-hero/volunteer-sorting.png',
      '/images/home-hero/campus-building.png',
      '/images/home/buxton.png',
      '/images/home/smart.png'
    ]

    const uploadedHeroImages = []
    for (const imagePath of heroImages) {
      const uploaded = await uploadImage(imagePath)
      if (uploaded) uploadedHeroImages.push(uploaded)
    }

    const heroWithImages = {
      ...heroData,
      heroImages: uploadedHeroImages
    }
    await client.createOrReplace(heroWithImages)
    console.log('✅ Hero Section imported\n')

    // 3. Import Projects with images
    console.log('📝 Importing Projects...')
    const projectImages = [
      '/images/home/buxton.png',
      '/images/home/smart.png',
      '/images/home/project1.png'
    ]

    for (let i = 0; i < projectsData.length; i++) {
      const project = projectsData[i]
      const imageAsset = await uploadImage(projectImages[i])
      
      if (imageAsset) {
        project.image = imageAsset
      }

      await client.create(project)
      console.log(`✅ Project "${project.title}" imported`)
    }
    console.log('')

    // 4. Import Donation Settings
    console.log('📝 Importing Donation Settings...')
    const donationImage = await uploadImage('/images/home/donate-buxton.png')
    if (donationImage) {
      donationSettingsData.projectImage = donationImage
    }
    await client.createOrReplace(donationSettingsData)
    console.log('✅ Donation Settings imported\n')

    // 5. Import Newsletter Settings
    console.log('📝 Importing Newsletter Settings...')
    await client.createOrReplace(newsletterSettingsData)
    console.log('✅ Newsletter Settings imported\n')

    // 6. Import FAQs
    console.log('📝 Importing FAQs...')
    for (const faq of faqsData) {
      await client.create(faq)
    }
    console.log(`✅ ${faqsData.length} FAQs imported\n`)

    console.log('🎉 Import completed successfully!')
    console.log('\n📊 Summary:')
    console.log('  ✅ Site Settings')
    console.log('  ✅ Hero Section (with 6 images)')
    console.log(`  ✅ ${projectsData.length} Projects`)
    console.log('  ✅ Donation Settings')
    console.log('  ✅ Newsletter Settings')
    console.log(`  ✅ ${faqsData.length} FAQs`)
    console.log('\n🌐 Visit http://localhost:3001/studio to see your content!')

  } catch (error) {
    console.error('❌ Import failed:', error)
    process.exit(1)
  }
}

// Run the import
importContent()
