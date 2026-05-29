import { defineType } from 'sanity'

export default defineType({
  name: 'endowment',
  title: 'Endowments Page',
  type: 'document',
  fields: [
    // ── HERO ──
    {
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      initialValue: 'Join our community of active Endowments and change education with other awesome people',
    },
    {
      name: 'heroCtaText',
      title: 'Hero CTA Button Text',
      type: 'string',
      initialValue: 'Fill Endowment Form',
    },
    {
      name: 'heroCtaLink',
      title: 'Hero CTA Button Link',
      type: 'string',
      initialValue: '#endowment-form',
    },
    {
      name: 'stats',
      title: 'Stats (4 counters)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'value', title: 'Counter Target Number', type: 'number' },
          { name: 'label', title: 'Label', type: 'string' },
        ],
        preview: { select: { title: 'label', subtitle: 'value' } }
      }],
      initialValue: [
        { value: 165, label: 'Active Family Endowments' },
        { value: 479, label: 'Active Research Endowments' },
        { value: 1980, label: 'Active Individual Endowments' },
        { value: 174, label: 'Active Corporate Endowments' },
      ]
    },
    {
      name: 'photoTopLeft',
      title: 'Photo — Top Left',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'photoTopRight',
      title: 'Photo — Top Right',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'photoBottomLeft',
      title: 'Photo — Bottom Left',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'photoBottomRight',
      title: 'Photo — Bottom Right',
      type: 'image',
      options: { hotspot: true },
    },

    // ── TYPES SECTION ──
    {
      name: 'typesHeading',
      title: 'Types Section Heading',
      type: 'string',
      initialValue: 'Support the Future with an Endowment',
    },
    {
      name: 'typesIntro',
      title: 'Types Section Intro Text',
      type: 'text',
    },
    {
      name: 'endowmentTypes',
      title: 'Endowment Types',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'desc', title: 'Description', type: 'text' },
          { name: 'icon', title: 'Icon (emoji or symbol)', type: 'string' },
        ],
        preview: { select: { title: 'title', subtitle: 'desc' } }
      }]
    },
  ],
  preview: {
    prepare() { return { title: 'Endowments Page' } }
  }
})
