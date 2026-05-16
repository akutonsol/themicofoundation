import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01'
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

export const queries = {
  hero: `*[_type == "hero"][0]{
    mainHeadline,
    subHeadLine,
    heroImages,
    videoId,
    locationText,
    totalMoneyDonated,
    totalMoneyDonatedText,
    completedProjects,
    completedProjectsText,
    currentTargetName,
    targetAmount,
    amountDonated,
    donationCount,
    donationText,
    ctaButton
  }`,
  
  trustedBy: `*[_type == "trustedBy"][0]{
    heading,
    logos[]{
      image,
      name,
      width,
      height
    },
    animationSpeed
  }`,
  
  legacyImpact: `*[_type == "legacyImpact"][0]{
    badge,
    headline,
    paragraph1,
    paragraph2,
    button1,
    button2,
    heroImage,
    locationBadge,
    bottomQuote,
    stats[]{
      value,
      label
    }
  }`,
  
  projects: `*[_type == "project"] | order(order asc){
    _id,
    title,
    label,
    location,
    description,
    image,
    status,
    percentage,
    goal,
    raised,
    buttonText,
    completedItems
  }`,
  
  siteSettings: `*[_type == "siteSettings"][0]`
}