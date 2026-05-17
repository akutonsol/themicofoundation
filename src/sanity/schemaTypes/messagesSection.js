import { defineType } from 'sanity'

export default defineType({
  name: 'messagesSection',
  title: 'Messages Section Settings',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      description: 'Main heading (e.g., "Messages for you")',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Text shown below the heading',
      validation: Rule => Rule.required()
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'CTA button text (e.g., "Read full message")',
      validation: Rule => Rule.required()
    },
    {
      name: 'buttonLink',
      title: 'Button Link',
      type: 'string',
      description: 'URL for button (e.g., "/messages")',
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'heading'
    },
    prepare(selection) {
      return {
        title: selection.title || 'Messages Section Settings'
      }
    }
  }
})