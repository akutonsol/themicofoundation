// ============================================================================
// FILE: sanity/schemas/mission.js
// ============================================================================
export default {
  name: 'mission',
  title: 'Mission Section',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'missionStatement',
      title: 'Mission Statement',
      type: 'text',
      rows: 6,
      validation: Rule => Rule.required()
    },
    {
      name: 'visionStatement',
      title: 'Vision Statement',
      type: 'text',
      rows: 4
    },
    {
      name: 'values',
      title: 'Core Values',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Value Title',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'image'
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description'
            }
          }
        }
      ]
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image'
    }
  ],
  preview: {
    select: {
      title: 'heading'
    }
  }
}