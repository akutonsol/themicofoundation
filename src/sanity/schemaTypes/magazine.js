import { defineType } from 'sanity'

export default defineType({
  name: 'magazine',
  title: 'Magazine',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Magazine Title',
      type: 'string',
      initialValue: 'The Mico Foundation Magazine',
      validation: Rule => Rule.required()
    },
    {
      name: 'issue',
      title: 'Issue / Year',
      type: 'string',
      description: 'e.g. "Annual Report 2025" or "Issue 31"',
    },
    {
      name: 'coverImage',
      title: 'Cover Image (thumbnail shown on page)',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'pages',
      title: 'Magazine Pages',
      description: '⬆️ To bulk upload: click "Add item", then in the image picker click the upload area and select ALL 49 images at once using Cmd/Ctrl+click. They will be added in order.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Page Image',
              type: 'image',
              options: { hotspot: true },
              validation: Rule => Rule.required()
            },
            {
              name: 'caption',
              title: 'Caption (optional)',
              type: 'string',
            },
          ],
          preview: {
            select: { title: 'caption', media: 'image' },
            prepare({ title, media }) {
              return { title: title || 'Page', media }
            }
          }
        }
      ]
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'issue', media: 'coverImage' },
  },
  orderings: [
    { title: 'Newest First', name: 'orderDesc', by: [{ field: 'order', direction: 'desc' }] }
  ]
})
