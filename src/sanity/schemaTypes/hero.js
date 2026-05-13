// ============================================================================
// FILE: sanity/schemas/hero.js
// ============================================================================
export default {
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'heroImages',
      title: 'Hero Rotating Images (6 images)',
      type: 'array',
      of: [{ type: 'image' }],
      validation: Rule => Rule.required().min(6).max(6),
      description: 'Upload exactly 6 images that will rotate in the hero section'
    },
    {
      name: 'videoId',
      title: 'YouTube Video ID',
      type: 'string',
      description: 'Just the video ID from YouTube URL (e.g., dQw4w9WgXcQ)',
      validation: Rule => Rule.required()
    },
    {
      name: 'mainHeadline',
      title: 'Main Headline',
      type: 'string',
      description: 'Primary hero headline',
      validation: Rule => Rule.required()
    },
    {
      name: 'subHeadline',
      title: 'Sub Headline',
      type: 'text',
      rows: 3,
      description: 'Supporting text under main headline'
    },
    {
      name: 'donationCount',
      title: 'Total Donations Count',
      type: 'string',
      description: 'Display text for total donations (e.g., "12391+")',
      initialValue: '12391+'
    },
    {
      name: 'donationText',
      title: 'Donation Stats Text',
      type: 'string',
      description: 'Text shown below donation count',
      initialValue: 'donation already sented'
    },
    {
      name: 'ctaButton',
      title: 'Call to Action Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Donate Now'
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string',
          initialValue: '/donate'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'mainHeadline',
      subtitle: 'donationCount'
    }
  }
}
 