import { defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'URL-friendly identifier (e.g., "buxton-college")',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: input => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '')
          .replace(/\-\-+/g, '-')
          .replace(/^-+/, '')
          .replace(/-+$/, '')
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'label',
      title: 'Project Label',
      type: 'string',
      description: 'e.g., "Active Project" or "Complete Project"',
      validation: Rule => Rule.required()
    },
    {
      name: 'status',
      title: 'Project Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Complete', value: 'complete' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., "Jamaica, Buxton"',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Project Description',
      type: 'text',
      description: 'Description shown for active projects',
      hidden: ({ document }) => document?.status === 'complete'
    },
    {
      name: 'completedItems',
      title: 'Completed Items',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Checklist items shown for complete projects',
      hidden: ({ document }) => document?.status === 'active'
    },
    {
      name: 'image',
      title: 'Project Image',
      type: 'image',
      validation: Rule => Rule.required()
    },
    {
      name: 'targetAmount',
      title: 'Target Amount ($)',
      type: 'number',
      description: 'Total target amount in dollars (e.g., 20000000 for $20M)',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'amountDonated',
      title: 'Amount Donated ($)',
      type: 'number',
      description: 'Current amount donated in dollars (e.g., 14000000 for $14M)',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'CTA button text',
      validation: Rule => Rule.required()
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Auto-set based on status: Active (#1A1600) or Complete (#051507)',
      readOnly: true,
      hidden: true,
      initialValue: '#1A1600'
    },
{
  name: 'gallery',
  title: 'Photo Gallery',
  description: 'Select multiple images at once: click Add item → hold Cmd/Ctrl and select all photos → Upload',
  type: 'array',
  of: [
    {
      type: 'image',
      options: { 
        hotspot: true,
        accept: 'image/*',
        storeOriginalFilename: true,
      },
      fields: [
        { 
          name: 'alt', 
          title: 'Alt Text', 
          type: 'string',
          description: 'Optional caption for this photo'
        }
      ]
    }
  ],
  options: {
    layout: 'grid',
  },
},

    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in carousel (0, 1, 2, 3...)',
      validation: Rule => Rule.required().min(0)
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'label',
      media: 'image',
      status: 'status',
      donated: 'amountDonated',
      target: 'targetAmount',
      slug: 'slug'
    },
    prepare(selection) {
      const { title, subtitle, media, status, donated, target, slug } = selection
      const percentage = target > 0 ? Math.round((donated / target) * 100) : 0
      
      // Format currency
      const formatCurrency = (amount) => {
        if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`
        if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`
        return `$${amount}`
      }
      
      return {
        title: title,
        subtitle: `${subtitle} • ${status} • ${percentage}% • /${slug?.current || 'no-slug'}`,
        media: media
      }
    }
  }
})