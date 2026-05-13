// ============================================================================
// FILE: sanity/schemas/faq.js
// ============================================================================
export default {
  name: 'faq',
  title: 'FAQs',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Donations', value: 'donations' },
          { title: 'Projects', value: 'projects' },
          { title: 'Volunteering', value: 'volunteering' },
          { title: 'Other', value: 'other' }
        ]
      }
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which FAQ appears',
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
      title: 'question',
      subtitle: 'category'
    }
  }
}
 