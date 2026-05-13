// ============================================================================
// FILE: sanity/schemas/peopleImpact.js
// ============================================================================
export default {
  name: 'peopleImpact',
  title: 'People Impact Section',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'stories',
      title: 'Impact Stories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Person Name',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'role',
              title: 'Role/Connection',
              type: 'string',
              description: 'E.g., "Scholarship Recipient", "Volunteer"'
            },
            {
              name: 'story',
              title: 'Story',
              type: 'text',
              rows: 4,
              validation: Rule => Rule.required()
            },
            {
              name: 'image',
              title: 'Photo',
              type: 'image',
              validation: Rule => Rule.required()
            },
            {
              name: 'location',
              title: 'Location',
              type: 'string'
            },
            {
              name: 'year',
              title: 'Year',
              type: 'string',
              description: 'E.g., "2023" or "Class of 2023"'
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
      ]
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