import { defineType } from 'sanity'

export default defineType({
  name: 'communityImpact',
  title: 'Community Impact',
  type: 'document',
  fields: [
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Main headline text (e.g., "Join our community for donating...")',
      validation: Rule => Rule.required()
    },
    {
      name: 'counterTarget',
      title: 'Counter Target Number',
      type: 'number',
      description: 'Target number for animated counter (e.g., 98765)',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'counterLabel',
      title: 'Counter Label',
      type: 'string',
      description: 'Label below counter (e.g., "People already joined")',
      validation: Rule => Rule.required()
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'CTA button text (e.g., "Join the community")',
      validation: Rule => Rule.required()
    },
    {
      name: 'buttonLink',
      title: 'Button Link',
      type: 'string',
      description: 'URL for the button (e.g., "/community")',
      validation: Rule => Rule.required()
    },
    {
      name: 'photoLeftTop',
      title: 'Photo - Left Top',
      type: 'image',
      description: 'Desktop: Left column, top image (240x402px)',
      validation: Rule => Rule.required()
    },
    {
      name: 'photoLeftBottom',
      title: 'Photo - Left Bottom',
      type: 'image',
      description: 'Desktop: Left column, bottom image (240x191px)',
      validation: Rule => Rule.required()
    },
    {
      name: 'photoRightTop',
      title: 'Photo - Right Top',
      type: 'image',
      description: 'Desktop: Right column, top image (240x309px)',
      validation: Rule => Rule.required()
    },
    {
      name: 'photoRightBottom',
      title: 'Photo - Right Bottom',
      type: 'image',
      description: 'Desktop: Right column, bottom image (375x309px)',
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'headline',
      counter: 'counterTarget',
      label: 'counterLabel'
    },
    prepare(selection) {
      const { title, counter, label } = selection
      return {
        title: title,
        subtitle: `${counter?.toLocaleString()}+ ${label || ''}`
      }
    }
  }
})