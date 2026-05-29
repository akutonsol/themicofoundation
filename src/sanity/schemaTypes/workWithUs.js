import { defineType } from 'sanity'

export default defineType({
  name: 'workWithUs',
  title: 'Work With Us — Hero',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Page Heading',
      type: 'string',
      initialValue: 'Work With Us',
    },
    {
      name: 'cardsHeading',
      title: 'Cards Section Heading',
      type: 'string',
      initialValue: 'We Appreciate Your Help In This Fields',
    },
    {
      name: 'heroImages',
      title: 'Hero Background Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Images cycle automatically every 4.5 seconds',
    },
    {
      name: 'helpCards',
      title: 'Help Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Equipment', value: 'clipboard' },
                  { title: 'Construction', value: 'badge' },
                  { title: 'Media & Outreach', value: 'globe' },
                  { title: 'Professional Training', value: 'calendar' },
                  { title: 'Health & Wellness', value: 'heart' },
                  { title: 'Tech Collaboration', value: 'handshake' },
                  { title: 'Education', value: 'book' },
                  { title: 'Community', value: 'users' },
                ],
              },
              initialValue: 'globe',
            },
          ],
          preview: {
            select: { title: 'title', subtitle: 'icon' },
          },
        },
      ],
    },
  ],
  preview: {
    prepare() { return { title: 'Work With Us — Hero' } }
  }
})
