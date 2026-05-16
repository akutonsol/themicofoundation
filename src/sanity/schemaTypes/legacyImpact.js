import { defineType } from 'sanity'

export default defineType({
  name: 'legacyImpact',
  title: 'Legacy Impact Section',
  type: 'document',
  fields: [
    {
      name: 'badge',
      title: 'Section Badge',
      type: 'string',
      description: 'Small badge text above the headline',
      validation: Rule => Rule.required(),
      initialValue: 'Why The Foundation Exists'
    },
    {
      name: 'headline',
      title: 'Main Headline',
      type: 'string',
      description: 'Large headline text',
      validation: Rule => Rule.required(),
      initialValue: 'Preserving Legacy. Empowering Futures.'
    },
    {
      name: 'paragraph1',
      title: 'First Paragraph',
      type: 'text',
      description: 'First paragraph of body text',
      validation: Rule => Rule.required()
    },
    {
      name: 'paragraph2',
      title: 'Second Paragraph',
      type: 'text',
      description: 'Second paragraph of body text',
      validation: Rule => Rule.required()
    },
    {
      name: 'button1',
      title: 'Primary Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          validation: Rule => Rule.required(),
          initialValue: 'Explore Projects'
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string',
          validation: Rule => Rule.required(),
          initialValue: '/projects'
        }
      ]
    },
    {
      name: 'button2',
      title: 'Secondary Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          validation: Rule => Rule.required(),
          initialValue: 'Become a Donor'
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string',
          validation: Rule => Rule.required(),
          initialValue: '/donate'
        }
      ]
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description: 'Main image for the section',
      validation: Rule => Rule.required()
    },
    {
      name: 'locationBadge',
      title: 'Location Badge Text',
      type: 'string',
      description: 'Badge text on the image',
      validation: Rule => Rule.required(),
      initialValue: 'Jamaica • Education • Legacy'
    },
    {
      name: 'bottomQuote',
      title: 'Bottom Quote',
      type: 'text',
      description: 'Large quote at the bottom of image',
      validation: Rule => Rule.required(),
      initialValue: 'Every generation deserves access to educational opportunity.'
    },
    {
      name: 'stats',
      title: 'Statistics Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'Stat Value',
              type: 'string',
              description: 'Number or text',
              validation: Rule => Rule.required()
            },
            {
              name: 'label',
              title: 'Stat Label',
              type: 'string',
              description: 'Description text',
              validation: Rule => Rule.required()
            }
          ],
          preview: {
            select: {
              title: 'value',
              subtitle: 'label'
            }
          }
        }
      ],
      validation: Rule => Rule.required().length(3)
    }
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'badge'
    }
  }
})