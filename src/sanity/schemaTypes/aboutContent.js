import { defineType } from 'sanity'

export default defineType({
  name: 'aboutContent',
  title: 'About — Our History',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Our History',
    },
    {
      name: 'paragraphs',
      title: 'Paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
      description: 'Each item is one paragraph of text',
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'Read Full History',
    },
    {
      name: 'buttonLink',
      title: 'Button Link',
      type: 'string',
      initialValue: '/history',
    },
  ],
  preview: {
    prepare() {
      return { title: 'About — Our History' }
    }
  }
})
