import { defineType } from 'sanity'
import { approvedField, approvalStatusPrefix } from '../lib/workflowFields'

export default defineType({
  name: 'donateHero',
  title: 'Donate Page Hero',
  type: 'document',
  fields: [
    approvedField,
    { name: 'title', title: 'Title', type: 'string', initialValue: 'The Mico' },
    { name: 'subtitle', title: 'Subtitle', type: 'string', initialValue: 'University College' },
    {
      name: 'logo',
      title: 'Centre Logo',
      type: 'image',
      options: { hotspot: true },
      description: 'Logo shown in the middle of the navy panel (e.g. Project Buxton). Leave empty to use the default.',
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
    },
    { name: 'script', title: 'Script Word', type: 'string', initialValue: 'Donate' },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
      rows: 2,
      description: 'Each line break starts a new line.',
      initialValue: 'Save the 135-year-old\nepicenter of teacher education',
    },
    { name: 'buttonText', title: 'Button Text (optional)', type: 'string', description: 'Leave empty for no button.' },
    { name: 'buttonLink', title: 'Button Link', type: 'string' },
    {
      name: 'leftImage',
      title: 'Left Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
    },
    {
      name: 'rightImage',
      title: 'Right Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
    },
  ],
  preview: {
    select: { title: 'title', approved: 'approved' },
    prepare({ title, approved }) {
      return { title: `${approvalStatusPrefix(approved)}Donate Page Hero`, subtitle: title }
    },
  },
})
