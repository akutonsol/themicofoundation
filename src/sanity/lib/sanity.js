import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  perspective: 'published',
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
    "backgroundVideoUrl": backgroundVideo.asset->url,
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

  projectOverview: `*[_type == "projectOverview"][0]{
    heroImage, heroEyebrow, heroTitle, heroSubtitle,
    introEyebrow, introTitle, introBody,
    actionEyebrow, actionTitle,
    ctaEyebrow, ctaTitle, ctaSubtitle, ctaButtonText, ctaButtonLink
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
    videoUrl,
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
    fullMessagePhoto,
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

// about page
 boardMembers: `*[_type == "teamMember" && type == "board" && isActive == true] | order(order asc) {
    _id,
    name,
    role,
    department,
    email,
    tenure,
    bio,
    photo,
    order
  }`,

  trustees: `*[_type == "teamMember" && type == "trustee" && isActive == true] | order(order asc) {
    _id,
    name,
    role,
    department,
    email,
    tenure,
    bio,
    photo,
    order
  }`,
 
  staffMembers: `*[_type == "teamMember" && type == "staff" && isActive == true] | order(order asc) {
    _id,
    name,
    role,
    department,
    email,
    tenure,
    bio,
    photo,
    order
  }`,
 
  formerTrustees: `*[_type == "formerTrustee" && isActive == true] | order(order asc) {
    _id,
    name,
    years,
    description,
    photo,
    order
  }`,
 
trusteeLegacy: `*[_type == "trusteeLegacy"][0]{
  heroEyebrow, heroTitleLine1, heroTitleHighlight,
  heroTitleLine3, heroSubtitle, timelineBlocks,
  ctaEyebrow, ctaTitle, ctaButtonText, ctaButtonLink, ctaBodyText
}`,

trusteeLeader: `*[_type == "trusteeLeader"][0]{
  eyebrow, headingBefore, headingHighlight, headingAfter,
  name, role, org, message, portrait
}`,

historicalPerspective: `*[_type == "historicalPerspective"][0]{ reading, image, leftImage, rightImage, rightNarrative }`,

chairmen: `*[_type == "historicalPerson" && type == "chairman" && isActive == true] | order(order asc) {
    _id,
    name,
    years,
    photo,
    order
  }`,

  secretaryManagers: `*[_type == "historicalPerson" && type == "secretary" && isActive == true] | order(order asc) {
    _id,
    name,
    years,
    photo,
    order
  }`,

aboutContent: `*[_type == "aboutContent"][0]{
  heading, paragraphs, buttonText, buttonLink
}`,

foundationVideo: `*[_type == "foundationVideo"][0]{
  heading, subheading, videoId, decks
}`,

ourMission: `*[_type == "ourMission"][0]{
  eyebrow, title, subtitle, values, ctaText, ctaLink
}`,

mission: `*[_type == "mission"][0]{
  heading, missionStatement, visionStatement, values
}`,

anniversaryPopup: `*[_type == "anniversaryPopup"][0]{
  enabled, eyebrow, description, buttonText,
  "logoUrl": logo.asset->url,
  pageEyebrow, pageHeading, pageBody,
  "pageImageUrl": pageImage.asset->url
}`,

resourceCategories: `*[_type == "resourceCategory" && isActive == true] | order(order asc) {
  _id, title, description,
  date,
  theme, topLabel, bottomLabel, order,
  files[]{ title, date, file{ asset->{ url } } }
}`,

workWithUs: `*[_type == "workWithUs"][0]{
  heading, cardsHeading,
  heroImages, helpCards
}`,

magazines: `*[_type == "magazine" && isActive == true] | order(order desc) {
  _id, title, issue, coverImage,
  pages[]{ image, caption }
}`,

historyPage: `*[_type == "historyPage"][0]{
  heroLabel, heroHeading, heroSubtext, heroImage,
  conversation, storyHeading, storyParagraphs,
  timeline, ctaHeading, ctaButtonText, ctaButtonLink
}`,

contactSettings: `*[_type == "contactSettings"][0]{
  heading, address, email, phones, mapEmbedUrl
}`,

endowment: `*[_type == "endowment"][0]{
  heroHeading, heroCtaText, heroCtaLink, stats,
  photoTopLeft, photoTopRight, photoBottomLeft, photoBottomRight,
  typesHeading, typesIntro, endowmentTypes
}`,

  siteSettings: `*[_type == "siteSettings"][0]`
}