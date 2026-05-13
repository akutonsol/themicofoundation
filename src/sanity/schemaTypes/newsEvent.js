// ============================================================================
// FILE: sanity/schemas/message.js
// ============================================================================
export default {
  name: 'message',
  title: 'Messages/Testimonials',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Person Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'role',
      title: 'Role/Title',
      type: 'string',
      description: 'E.g., "Donor", "Volunteer", "Board Member"',
      validation: Rule => Rule.required()
    },
    {
      name: 'message',
      title: 'Message/Quote',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      validation: Rule => Rule.required()
    },
    {
      name: 'organization',
      title: 'Organization',
      type: 'string',
      description: 'Optional organization affiliation'
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show in featured carousel',
      initialValue: false
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
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
      title: 'name',
      subtitle: 'role',
      media: 'image'
    }
  }
}