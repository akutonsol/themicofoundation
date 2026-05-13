// ============================================================================
// FILE: sanity/schemas/community.js
// ============================================================================
export default {
  name: 'community',
  title: 'Community Section',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 3
    },
    {
      name: 'stats',
      title: 'Community Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'number',
              title: 'Number',
              type: 'string',
              description: 'E.g., "1000+" or "50K"',
              validation: Rule => Rule.required()
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'E.g., "Volunteers" or "Students Helped"',
              validation: Rule => Rule.required()
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'image',
              description: 'Optional icon/image for this stat'
            }
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'number'
            }
          }
        }
      ],
      validation: Rule => Rule.min(1).max(6)
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image'
    },
    {
      name: 'ctaButton',
      title: 'Call to Action',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string'
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'heading'
    }
  }
}