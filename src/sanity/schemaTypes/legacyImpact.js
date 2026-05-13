export default {
  name: 'legacyImpact',
  title: 'Legacy & Impact Section',
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
      name: 'impactStats',
      title: 'Impact Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'number',
              title: 'Number',
              type: 'string',
              description: 'E.g., "50K+", "200", "95%"',
              validation: Rule => Rule.required()
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'E.g., "Students Educated", "Projects Completed"',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              description: 'Optional additional context'
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