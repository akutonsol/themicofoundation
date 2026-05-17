import { defineType } from 'sanity'

export default defineType({
  name: 'teamMessage',        // ← Changed from 'message'
  title: 'Team Message',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      description: 'e.g., "Dr. R. Karl James CD."',
      validation: Rule => Rule.required()
    },
    {
      name: 'role',
      title: 'Role/Position',
      type: 'string',
      description: 'e.g., "Trustee", "Chairman", "Secretary Manager"',
      validation: Rule => Rule.required()
    },
    {
      name: 'photo',
      title: 'Profile Photo',
      type: 'image',
      description: 'Professional headshot photo',
      validation: Rule => Rule.required()
    },
    {
      name: 'quote',
      title: 'Short Quote',
      type: 'text',
      description: 'Brief message shown in carousel (keep under 200 characters)',
      validation: Rule => Rule.required().max(300)
    },
    {
      name: 'fullMessage',
      title: 'Full Message',
      type: 'text',
      description: 'Complete message shown on detail page',
      validation: Rule => Rule.required()
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in carousel (0, 1, 2...)',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Show this message in the carousel?',
      initialValue: true
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
      order: 'order'
    },
    prepare(selection) {
      const { title, subtitle, media, order } = selection
      return {
        title: title,
        subtitle: `${subtitle} • Order: ${order}`,
        media: media
      }
    }
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' }
      ]
    }
  ]
})