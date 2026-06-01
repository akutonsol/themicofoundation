import { defineType } from 'sanity'

export default defineType({
  name: 'endowmentproject',
  title: 'Projects',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required()
    },
    {
      name: 'label',
      title: 'Status Label',
      type: 'string',
      description: 'e.g. "Active Project", "Completed", "Upcoming"',
      initialValue: 'Active Project',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Completed', value: 'completed' },
          { title: 'Upcoming', value: 'upcoming' },
        ],
        layout: 'radio',
      },
      initialValue: 'active',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Project Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'raised',
      title: 'Amount Raised',
      type: 'number',
    },
    {
      name: 'goal',
      title: 'Funding Goal',
      type: 'number',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    },
    // ── PLEDGE PAGE ──
    {
      name: 'showOnPledgePage',
      title: 'Show on Pledge Page',
      type: 'boolean',
      description: '⚠️ Only one project should have this enabled at a time. This project will appear on the /pledge page.',
      initialValue: false,
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'status', media: 'image' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle?.toUpperCase(), media }
    }
  },
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }
  ]
})
