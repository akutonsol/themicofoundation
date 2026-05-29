import { defineType } from 'sanity'

export default defineType({
  name: 'siteStats',
  title: 'Site Statistics',
  type: 'document',
  fields: [
    {
      name: 'visitorCount',
      title: 'Total Visitor Count',
      type: 'number',
      initialValue: 0,
      readOnly: true,
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'string',
      readOnly: true,
    },
  ],
  preview: {
    select: { title: 'visitorCount' },
    prepare({ title }) {
      return { title: `Total Visitors: ${title || 0}` }
    }
  }
})
