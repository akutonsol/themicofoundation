import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

console.log('Testing Sanity API Token...\n')
console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET)
console.log('Token (first 10 chars):', process.env.SANITY_API_TOKEN?.substring(0, 10))
console.log('\n')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01'
})

async function testToken() {
  try {
    console.log('Testing READ permission...')
    const docs = await client.fetch('*[_type == "hero"][0]')
    console.log('✓ READ works!\n')
    
    console.log('Testing CREATE permission...')
    const testDoc = await client.create({
      _type: 'hero',
      _id: 'test-token-check',
      mainHeadline: 'Test'
                            CR                            CR             ng DELETE permission...')
    await client.delete('test-token-check')
    console.log('✓ DELETE works!\n')
    
    console.log('🎉 All permissions verified! Token is working correctly.\n')
  } catch (error) {
    console.error('❌ Token test failed:', error.message)
    console.error('\nThis means your token does NOT have Editor permissions.')
  }
}

testToken()
