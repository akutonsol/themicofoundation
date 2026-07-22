// ============================================================================
// FILE: sanity/schemas/hero.js
// ============================================================================
import { defineType } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'mainHeadline',
      title: 'Main Headline',
      type: 'string',
      description: 'Primary hero headline',
      validation: Rule => Rule.required()
    },
    {
      name: 'subHeadLine',
      title: 'Sub Headline',
      type: 'text',
      description: 'Supporting text under main headline',
      validation: Rule => Rule.required()
    },
    {
      name: 'heroImages',
      title: 'Hero Rotating Images (6 images)',
      type: 'array',
      of: [{ type: 'image' }],
      description: 'Fallback pool used by any hero section left empty below. Upload up to 6 images.',
      validation: Rule => Rule.max(6).warning('Up to 6 images')
    },
    {
      name: 'heroLeftImages',
      title: 'Hero — Left Section Photos',
      type: 'array',
      of: [{ type: 'image' }],
      options: { layout: 'grid' },
      description: 'Photos for the LEFT card (with the “Total Money Donated” stat). Add one, or several to rotate. Leave empty to use the shared rotating images.',
    },
    {
      name: 'heroRightImages',
      title: 'Hero — Right Section Photos',
      type: 'array',
      of: [{ type: 'image' }],
      options: { layout: 'grid' },
      description: 'Photos for the RIGHT card (with the “Completed Projects” stat). Add one, or several to rotate. Leave empty to use the shared rotating images.',
    },
    {
      name: 'heroBottomImages',
      title: 'Hero — Bottom Section Photos (current-target card)',
      type: 'array',
      of: [{ type: 'image' }],
      options: { layout: 'grid' },
      description: 'Photos for the BOTTOM centre card (the “Current target” progress card, under the video). The video area itself is unchanged. Leave empty to use the shared rotating images.',
    },
    {
      name: 'videoId',
      title: 'YouTube Video ID',
      type: 'string',
      description: 'Just the video ID from YouTube URL (e.g., dQw4w9WgXcQ). Used as a fallback if no background MP4 is uploaded.',
      validation: Rule => Rule.required()
    },
    {
      name: 'backgroundVideo',
      title: 'Background Video (MP4)',
      type: 'file',
      options: { accept: 'video/mp4,video/webm' },
      description: 'Upload an MP4 to autoplay (muted) in the hero background — works reliably in Safari, unlike YouTube. Clicking play opens it unmuted from the same spot. Leave empty to fall back to the YouTube video.',
    },
    {
      name: 'locationText',
      title: 'Location Description',
      type: 'string',
      description: 'Location text displayed on images (e.g., "Jamaica, Buxton")',
      validation: Rule => Rule.required(),
      initialValue: 'Jamaica, Buxton'
    },
    {
      name: 'totalMoneyDonated',
      title: 'Total Money Donated',
      type: 'string',
      description: 'Display value for total donations (e.g., "$34M")',
      validation: Rule => Rule.required(),
      initialValue: '$34M'
    },
    {
      name: 'totalMoneyDonatedText',
      title: 'Total Money Donated Label',
      type: 'string',
      description: 'Label text below the amount',
      validation: Rule => Rule.required(),
      initialValue: 'Total money donated.'
    },
    {
      name: 'completedProjects',
      title: 'Completed Projects Count',
      type: 'string',
      description: 'Display value for completed projects (e.g., "45+")',
      validation: Rule => Rule.required(),
      initialValue: '45+'
    },
    {
      name: 'completedProjectsText',
      title: 'Completed Projects Label',
      type: 'string',
      description: 'Label text below the count',
      validation: Rule => Rule.required(),
      initialValue: 'Completed Projects.'
    },
    {
      name: 'currentTargetName',
      title: 'Current Target Name',
      type: 'string',
      description: 'Name of the current target (e.g., "Bruxton College")',
      validation: Rule => Rule.required(),
      initialValue: 'Bruxton College'
    },
    {
      name: 'targetAmount',
      title: 'Target Amount ($)',
      type: 'number',
      description: 'Total target amount in dollars (e.g., 10000000 for $10M)',
      validation: Rule => Rule.required().min(0),
      initialValue: 10000000
    },
    {
      name: 'amountDonated',
      title: 'Amount Donated ($)',
      type: 'number',
      description: 'Current amount donated in dollars (e.g., 6500000 for $6.5M)',
      validation: Rule => Rule.required().min(0),
      initialValue: 6500000
    },
    {
      name: 'donationCount',
      title: 'Total Donations Count',
      type: 'string',
      description: 'Display text for total donations (e.g., "12391+")',
      validation: Rule => Rule.required()
    },
    {
      name: 'donationText',
      title: 'Donation Count Label',
      type: 'string',
      description: 'Text shown next to donation count',
      validation: Rule => Rule.required()
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
          validation: Rule => Rule.required()
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string',
          validation: Rule => Rule.required()
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'mainHeadline',
      subtitle: 'donationCount',
      targetName: 'currentTargetName',
      donated: 'amountDonated',
      target: 'targetAmount'
    },
    prepare(selection) {
      const { title, subtitle, targetName, donated, target } = selection
      const percentage = target > 0 ? Math.round((donated / target) * 100) : 0
      return {
        title: title,
        subtitle: `${subtitle} | ${targetName}: ${percentage}% ($${(donated / 1000000).toFixed(1)}M / $${(target / 1000000).toFixed(1)}M)`
      }
    }
  }
})