// ============================================================================
// FILE: sanity/schemas/marquee.js
// ============================================================================
export default {
  name: 'marquee',
  title: 'Marquee Lines',
  type: 'document',
  fields: [
    {
      name: 'lines',
      title: 'Scrolling Text Lines',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Text',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'speed',
              title: 'Scroll Speed',
              type: 'string',
              options: {
                list: [
                  { title: 'Slow', value: 'slow' },
                  { title: 'Normal', value: 'normal' },
                  { title: 'Fast', value: 'fast' }
                ]
              },
              initialValue: 'normal'
            },
            {
              name: 'direction',
              title: 'Direction',
              type: 'string',
              options: {
                list: [
                  { title: 'Left to Right', value: 'ltr' },
                  { title: 'Right to Left', value: 'rtl' }
                ]
              },
              initialValue: 'ltr'
            }
          ],
          preview: {
            select: {
              title: 'text',
              subtitle: 'speed'
            }
          }
        }
      ],
      validation: Rule => Rule.min(1).max(3),
      description: 'Add 1-3 scrolling text lines'
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Hex color code (e.g., #FFD900)'
    },
    {
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      description: 'Hex color code (e.g., #040617)'
    }
  ],
  preview: {
    select: {
      lines: 'lines'
    },
    prepare({ lines }) {
      return {
        title: 'Marquee Lines',
        subtitle: `${lines?.length || 0} line(s)`
      }
    }
  }
}
 