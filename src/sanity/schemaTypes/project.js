// ============================================================================
// FILE: sanity/schemas/project.js
// ============================================================================
export default {
  name: 'project',
  title: 'Projects',
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
      description: 'E.g., "Active Project" or "Complete Project"',
      validation: Rule => Rule.required()
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'E.g., "Jamaica, Kingston"',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Project description for active projects'
    },
    {
      name: 'image',
      title: 'Project Image',
      type: 'image',
      validation: Rule => Rule.required()
    },
    {
      name: 'status',
      title: 'Status',
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
      name: 'percentage',
      title: 'Completion Percentage',
      type: 'number',
      validation: Rule => Rule.required().min(0).max(100),
      description: 'Project completion percentage (0-100)'
    },
    {
      name: 'goal',
      title: 'Funding Goal',
      type: 'string',
      description: 'E.g., "$20M" or "$200K"',
      validation: Rule => Rule.required()
    },
    {
      name: 'raised',
      title: 'Amount Raised',
      type: 'string',
      description: 'E.g., "$14M" or "$70K"',
      validation: Rule => Rule.required()
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'CTA button text (e.g., "Rebuild College")',
      validation: Rule => Rule.required()
    },
    {
      name: 'completedItems',
      title: 'Completed Items',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of completed items (only for completed projects)',
      hidden: ({ document }) => document?.status !== 'complete'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which project appears in carousel',
      validation: Rule => Rule.required()
    }
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'status',
      media: 'image'
    }
  }
}