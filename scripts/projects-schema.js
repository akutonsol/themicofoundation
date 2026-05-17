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
      name: 'percentage',
      title: 'Progress Percentage',
      type: 'number',
      description: 'Progress percentage (0-100)',
      validation: Rule => Rule.required().min(0).max(100)
    },
    {
      name: 'goal',
      title: 'Funding Goal',
      type: 'string',
      description: 'e.g., "$20M", "$200K"',
      validation: Rule => Rule.required()
    },
    {
      name: 'raised',
      title: 'Amount Raised',
      type: 'string',
      description: 'e.g., "$14M", "$70K"',
      validation: Rule => Rule.required()
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
      description: 'Hex color for project background',
      validation: Rule => Rule.required(),
      initialValue: '#1A1600'
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
      percentage: 'percentage'
    },
    prepare(selection) {
      const { title, subtitle, media, status, percentage } = selection
      return {
        title: title,
        subtitle: `${subtitle} • ${status} • ${percentage}%`,
        media: media
      }
    }
  }
})
