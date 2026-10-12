import { defineType } from 'sanity'
import { approvedField, approvalStatusPrefix } from '../lib/workflowFields'

export default defineType({
  name: 'year1981Page',
  title: 'Year 1981 Page',
  type: 'document',
  fields: [
    approvedField,
    {
      name: 'title',
      title: 'Title',
      type: 'text',
      rows: 2,
      description: 'Each line break starts a new line on the page.',
      initialValue: 'THE MICO\nFOUNDATION',
    },
    { name: 'tagline', title: 'Script Tagline', type: 'string', initialValue: 'Service, Donate Create' },
    {
      name: 'body',
      title: 'Body Paragraph',
      type: 'text',
      rows: 4,
      initialValue: 'Be a part of history. Join the community of donors and help to transform The Mico University College and shape the future of education together.',
    },
    {
      name: 'checklist',
      title: 'Checklist Links',
      type: 'array',
      validation: (Rule) => Rule.max(4),
      of: [{
        type: 'object',
        name: 'checkItem',
        fields: [
          { name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() },
          { name: 'link', title: 'Link', type: 'string', description: 'A site path like /donate, or a full URL.', validation: (Rule) => Rule.required() },
        ],
        preview: { select: { title: 'label', subtitle: 'link' } },
      }],
    },
    { name: 'plaqueHeading', title: 'Plaque Heading', type: 'string', initialValue: 'Be a part of history.' },
    {
      name: 'plaqueText',
      title: 'Plaque Text',
      type: 'text',
      rows: 2,
      initialValue: "Get your name, your company, or a family member's name on the historical recognition plaque.",
    },
    {
      name: 'photo',
      title: 'Oval Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Shown inside the gold oval. Use the hotspot tool to keep faces in frame.',
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
    },
  ],
  preview: {
    select: { approved: 'approved' },
    prepare({ approved }) {
      return { title: `${approvalStatusPrefix(approved)}Year 1981 Page` }
    },
  },
})
