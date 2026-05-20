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
  "slug": slug.current,
  label,
  status,
  location,
  description,
  completedItems,
  image,
  targetAmount,
  amountDonated,
  buttonText,
  order
}`,
  
   communityImpact: `*[_type == "communityImpact"][0]{
    headline,
    counterTarget,
    counterLabel,
    buttonText,
    buttonLink,
    photoLeftTop,
    photoLeftBottom,
    photoRightTop,
    photoRightBottom
  }`,
  
messagesSection: `*[_type == "messagesSection"][0]{
    heading,
    description,
    buttonText,
    buttonLink
  }`,
  
  messages: `*[_type == "teamMessage" && isActive == true] | order(order asc){
    _id,
    name,
    role,
    photo,
    quote,
    fullMessage,
    order
  }`,

  peopleImpact: `*[_type == "peopleImpact" && isActive == true] | order(order asc) {
    _id,
    name,
    role,
    quote,
    "photo": photo.asset->url,
    "mobilePhoto": coalesce(mobilePhoto.asset->url, photo.asset->url),
    order
  }`,
  
  siteSettings: `*[_type == "siteSettings"][0]`
}