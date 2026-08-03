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
      name: 'videoUrl',
      title: 'Project Video — YouTube link (optional)',
      type: 'url',
      description: 'Paste a YouTube link to enable a "Watch Video" button on the project banner. Leave empty for no video.',
    },
    {
      name: 'videoFile',
      title: 'Project Video — Upload a file (optional)',
      type: 'file',
      options: { accept: 'video/*' },
      description: 'Upload a video file (MP4/WebM) to play it directly on the project page. If both this and a YouTube link are set, the uploaded file is used.',
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
      name: 'heroDescription',
      title: 'Hero Description (short line under the title on the detail page)',
      type: 'text',
      rows: 3,
    },
    {
      name: 'showTitle',
      title: 'Show project title text on the detail page',
      type: 'boolean',
      initialValue: true,
      description: 'ON = show the project title as text. OFF = replace the title with a logo image + description below (set the two fields below).',
    },
    {
      name: 'titleLogo',
      title: 'Title Logo (used when "Show project title text" is OFF)',
      type: 'image',
      options: { hotspot: true },
      description: 'Displayed in place of the title text when the title is disabled.',
      hidden: ({ document }) => document?.showTitle !== false,
    },
    {
      name: 'titleLogoDescription',
      title: 'Title Description (shown below the logo, replaces the title)',
      type: 'text',
      rows: 3,
      hidden: ({ document }) => document?.showTitle !== false,
    },
    {
      name: 'pledgeDescription',
      title: 'Pledge Form — Custom description',
      type: 'text',
      rows: 5,
      description: 'Custom text shown for this project on the Pledge form. If empty, the main Project Description is used.',
    },
    {
      name: 'furtherDetailsImage',
      title: 'Further Details — Image (left column of the popup)',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional. When Further Details blocks are added below, a "Further Details" button appears on this project\'s detail page and opens a popup showing this image alongside the blocks.',
    },
    {
      name: 'furtherDetailsBlocks',
      title: 'Further Details — Content Blocks (right column of the popup)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'body', title: 'Description', type: 'text', rows: 6 },
        ],
        preview: { select: { title: 'title', subtitle: 'body' } },
      }],
      description: 'Each block has a title and a description. Adding one or more blocks enables the "Further Details" button on this project.',
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