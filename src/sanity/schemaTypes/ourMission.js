import { defineType } from 'sanity'

export default defineType({
  name: 'ourMission',
  title: 'About — Our Mission',
  type: 'document',
  fields: [
    {
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      initialValue: 'Our Mission',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Values That Guide Us',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      initialValue: 'The principles that define how we operate, lead, and serve — anchored in a commitment to education, community, and lasting impact.',
    },
    {
      name: 'values',
      title: 'Values',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'word', title: 'Value Name', type: 'string' },
            { name: 'desc', title: 'Description', type: 'text' },
          ],
          preview: {
            select: { title: 'word', subtitle: 'desc' },
          },
        },
      ],
    },
    {
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
      initialValue: 'Support Our Mission',
    },
    {
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'string',
      initialValue: '/donate',
    },
  ],
  preview: {
    prepare() {
      return { title: 'About — Our Mission' }
    }
  }
})