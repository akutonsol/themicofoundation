import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'trusteeLegacy',
  title: 'Trustee Legacy Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow Text',
      type: 'string',
      initialValue: 'The Mico Foundation — Trustee Legacy',
    }),
    defineField({
      name: 'heroTitleLine1',
      title: 'Hero Title Line 1',
      type: 'string',
      initialValue: 'Nearly Two',
    }),
    defineField({
      name: 'heroTitleHighlight',
      title: 'Hero Title Highlight Word (gold italic)',
      type: 'string',
      initialValue: 'Centuries',
    }),
    defineField({
      name: 'heroTitleLine3',
      title: 'Hero Title Line 3',
      type: 'string',
      initialValue: 'of Education',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      initialValue: 'A continuing story of leadership, stewardship, and educational transformation that has shaped generations across the Caribbean.',
    }),
    defineField({
      name: 'timelineBlocks',
      title: 'Timeline Blocks',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'year', title: 'Year', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'text', title: 'Text', type: 'text' },
          ],
          preview: {
            select: { title: 'year', subtitle: 'label' },
          },
        },
      ],
    }),
    defineField({
      name: 'ctaTitle',
      title: 'CTA Title',
      type: 'string',
      initialValue: 'Continue to Learn About Our History',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Explore History',
    }),
    defineField({
      name: 'ctaButtonLink',
      title: 'CTA Button Link',
      type: 'string',
      initialValue: '/history',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Trustee Legacy Section' }
    }
  }
})
