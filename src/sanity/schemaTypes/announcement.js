// Add these two queries inside your queries object in src/sanity/lib/sanity.js
// Place them before the closing siteSettings line

  // Get single announcement by slug
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
