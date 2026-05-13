// ============================================================================
// FILE: sanity/schemas/publication.js
// ============================================================================
export default {
  name: 'publication',
  title: 'Publications',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'type',
      title: 'Publication Type',
      type: 'string',
      options: {
        list: [
          { title: 'Annual Report', value: 'annual-report' },
          { title: 'Newsletter', value: 'newsletter' },
          { title: 'Brochure', value: 'brochure' },
          { title: 'Research Paper', value: 'research' },
          { title: 'Case Study', value: 'case-study' },
          { title: 'Other', value: 'other' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'publishDate',
      title: 'Publish Date',
      type: 'date',
      validation: Rule => Rule.required()
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      validation: Rule => Rule.required()
    },
    {
      name: 'file',
      title: 'PDF File',
      type: 'file',
      options: {
        accept: '.pdf'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show on homepage',
      initialValue: false
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number'
    }
  ],
  orderings: [
    {
      title: 'Publish Date (Newest)',
      name: 'dateDesc',
      by: [{ field: 'publishDate', direction: 'desc' }]
    },
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
      media: 'coverImage'
    }
  }
}
 