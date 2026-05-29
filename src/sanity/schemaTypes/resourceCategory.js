import { defineType } from 'sanity'

export default defineType({
  name: 'resourceCategory',
  title: 'Resource Categories',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Category Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
   {
  name: 'date',
  title: 'Display Date',
  type: 'datetime',
  options: {
    dateFormat: 'DD MMMM YYYY',
    timeFormat: 'HH:mm',
    calendarTodayLabel: 'Today',
  },
},
    {
      name: 'theme',
      title: 'Card Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Dark Navy', value: 'dark' },
          { title: 'Yellow / Gold', value: 'yellow' },
          { title: 'Green', value: 'green' },
          { title: 'Grey', value: 'grey' },
        ],
        layout: 'radio'
      },
      initialValue: 'yellow',
      validation: Rule => Rule.required()
    },
    {
      name: 'topLabel',
      title: 'Top Label (thumbnail)',
      type: 'string',
      description: 'e.g. "ANNUAL"',
      validation: Rule => Rule.required()
    },
    {
      name: 'bottomLabel',
      title: 'Bottom Label (thumbnail)',
      type: 'string',
      description: 'e.g. "REPORT"',
      validation: Rule => Rule.required()
    },
    {
      name: 'files',
      title: 'Documents',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Document Title',
              type: 'string',
              validation: Rule => Rule.required()
            },
           {
  name: 'date',
  title: 'Date',
  type: 'datetime',
  options: {
    dateFormat: 'DD MMMM YYYY',
    timeFormat: 'HH:mm',
    calendarTodayLabel: 'Today',
  },
},
            {
              name: 'file',
              title: 'Upload File',
              type: 'file',
              options: {
                accept: '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx'
              }
            },
          ],
          preview: {
            select: { title: 'title', subtitle: 'date' }
          }
        }
      ]
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'theme' },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ]
})