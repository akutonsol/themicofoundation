import { defineType } from 'sanity'

const sectionFields = [
  { name: 'linkText', title: 'Link Text', type: 'string' },
  { name: 'title', title: 'Pop-up Title', type: 'string' },
  {
    name: 'body',
    title: 'Narrative',
    type: 'text',
    rows: 20,
    description: 'Separate paragraphs with a blank line. Start list items with a marker like "a)" or "1)" and they will be indented as a list.',
  },
]

export default defineType({
  name: 'leadershipNarratives',
  title: 'About — Chairmen & Secretary Managers Narratives',
  type: 'document',
  fields: [
    { name: 'chairmen', title: 'Chairmen Narrative', type: 'object', fields: sectionFields },
    { name: 'secretaries', title: 'Secretary Managers Narrative', type: 'object', fields: sectionFields },
  ],
  preview: {
    prepare() { return { title: 'Chairmen & Secretary Managers Narratives' } },
  },
})
