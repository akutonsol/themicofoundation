// ============================================================================
// FILE: sanity/schemas/trustedBy.js
// ============================================================================
import { defineType } from 'sanity'

export default defineType({
  name: 'trustedBy',
  title: 'Trusted By Section',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Section Heading (Mobile Only)',
      type: 'string',
      description: 'Heading shown on mobile devices',
      validation: Rule => Rule.required(),
      initialValue: 'Trusted By'
    },
    {
      name: 'logos',
      title: 'Sponsor Logos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Logo Image',
              type: 'image',
              validation: Rule => Rule.required()
            },
            {
              name: 'name',
              title: 'Company Name',
              type: 'string',
              description: 'Name of the sponsor (for alt text)',
              validation: Rule => Rule.required()
            },
            {
              name: 'width',
              title: 'Display Width (px)',
              type: 'number',
              description: 'Width in pixels (e.g., 150)',
              validation: Rule => Rule.required().min(50).max(300),
              initialValue: 150
            },
            {
              name: 'height',
              title: 'Display Height (px)',
              type: 'number',
              description: 'Height in pixels (e.g., 52)',
              validation: Rule => Rule.required().min(20).max(200),
              initialValue: 52
            }
          ],
          preview: {
            select: {
              title: 'name',
              media: 'image',
              width: 'width',
              height: 'height'
            },
            prepare(selection) {
              const { title, media, width, height } = selection
              return {
                title: title,
                subtitle: `${width}px × ${height}px`,
                media: media
              }
            }
          }
        }
      ],
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'animationSpeed',
      title: 'Marquee Animation Speed (seconds)',
      type: 'number',
      description: 'Duration for one complete scroll (default: 30 seconds)',
      validation: Rule => Rule.required().min(10).max(120),
      initialValue: 30
    }
  ],
  preview: {
    select: {
      title: 'heading',
      logoCount: 'logos'
    },
    prepare(selection) {
      const { title, logoCount } = selection
      const count = logoCount?.length || 0
      return {
        title: title || 'Trusted By',
        subtitle: `${count} sponsor logo${count !== 1 ? 's' : ''}`
      }
    }
  }
})