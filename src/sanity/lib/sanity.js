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
    "slug": slug.current,
    order
  }`,
 

 
  messageBySlug: (slug) => `*[_type == "teamMessage" && slug.current == "${slug}"][0] {
    _id,
    name,
    role,
    photo,
    quote,
    fullMessage,
    "slug": slug.current,
    order
  }`,
 
  allMessages: `*[_type == "teamMessage" && isActive == true] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
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

  // FIX: slug returned as plain string
  newsEventsFeatured: `*[_type == "newsEvent" && isActive == true && isFeatured == true] | order(order asc)[0] {
    _id,
    title,
    "slug": slug.current,
    type,
    date,
    location,
    excerpt,
    "featuredImage": featuredImage.asset->url,
    order
  }`,

  // FIX: slug returned as plain string
  newsEventsSide: `*[_type == "newsEvent" && isActive == true && isFeatured == false] | order(order asc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    type,
    date,
    excerpt,
    "thumbnailImage": coalesce(thumbnailImage.asset->url, featuredImage.asset->url),
    order
  }`,

  // FIX: slug returned as plain string
  newsArticleBySlug: (slug) => `*[_type == "newsEvent" && slug.current == "${slug}"][0] {
    _id,
    title,
    "slug": slug.current,
    type,
    date,
    location,
    excerpt,
    content,
    "image": featuredImage.asset->url,
    order
  }`,

  allNewsArticles: `*[_type == "newsEvent" && isActive == true] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    type,
    date
  }`,

  upcomingEventBySlug: (slug) => `*[_type == "newsEvent" && slug.current == "${slug}" && type == "upcoming"][0] {
    _id,
    title,
    "slug": slug.current,
    type,
    date,
    time,
    location,
    contactName,
    "email": contactEmail,
    "phone": contactPhone,
    "image": featuredImage.asset->url,
    description,
    "details": eventDetails
  }`,

  allUpcomingEvents: `*[_type == "newsEvent" && isActive == true && type == "upcoming"] | order(date asc) {
    _id,
    title,
    "slug": slug.current,
    date
  }`,


  announcementBySlug: (slug) => `*[_type == "announcement" && slug.current == "${slug}"][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    date,
    excerpt,
    content,
    "image": featuredImage.asset->url,
  }`,
 
  // Get all announcements for prev/next navigation
  allAnnouncements: `*[_type == "announcement" && isActive == true] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    date,
  }`,
 
faqs: `*[_type == "faq" && isActive == true] | order(order asc) {
  _id,
  question,
  answer,
  order
}`,


  siteSettings: `*[_type == "siteSettings"][0]`
}