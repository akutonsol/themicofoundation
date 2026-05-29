import { defineType } from 'sanity'

export default defineType({
  name: 'foundationVideo',
  title: 'About — Foundation Video',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'About The Foundation',
    },
    {
      name: 'subheading',
      title: 'Section Subheading',
      type: 'text',
      initialValue: 'Discover the legacy, mission, and continued impact of The Mico Foundation through education, philanthropy, and community transformation across generations.',
    },
    {
      name: 'videoId',
      title: 'YouTube Video ID',
      type: 'string',
      description: 'e.g. dQw4w9WgXcQ from https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
    {
      name: 'decks',
      title: 'Content Decks',
      description: 'Deck 1 is always the hero card. Add more decks here for additional reading content.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'body', title: 'Body Text', type: 'text' },
          ],
          preview: {
            select: { title: 'title' },
          },
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: 'About — Foundation Video' }
    }
  }
})