// ============================================================================
// FILE: sanity/schemas/trustedBy.js
// ============================================================================
export default {
  name: 'trustedBy',
  title: 'Trusted By Section',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'Trusted By'
    },
    {
      name: 'partners',
      title: 'Partner Organizations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Organization Name',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'logo',
              title: 'Logo',
              type: 'image',
              validation: Rule => Rule.required(),
              options: {
                hotspot: true
              }
            },
            {
              name: 'website',
              title: 'Website URL',
              type: 'url'
            },
            {
              name: 'order',
              title: 'Display Order',
              type: 'number'
            }
          ],
          preview: {
            select: {
              title: 'name',
              media: 'logo'
            }
          }
        }
      ]
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Hex color code (e.g., #FFFDF9)'
    }
  ],
  preview: {
    select: {
      title: 'heading',
      partners: 'partners'
    },
    prepare({ title, partners }) {
      return {
        title,
        subtitle: `${partners?.length || 0} partner(s)`
      }
    }
  }
}