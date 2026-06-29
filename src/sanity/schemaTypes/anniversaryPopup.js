import { defineType } from 'sanity'

export default defineType({
  name: 'anniversaryPopup',
  title: 'Anniversary Popup',
  type: 'document',
  groups: [
    { name: 'popup', title: 'Popup' },
    { name: 'page',  title: 'Detail Page' },
  ],
  fields: [
    {
      name: 'enabled',
      title: 'Show Popup',
      type: 'boolean',
      description: 'Turn the site-entry popup on or off.',
      initialValue: true,
      group: 'popup',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      description: 'Anniversary logo shown in the popup and on the detail page.',
      group: 'popup',
    },
    {
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      initialValue: 'Honouring Our Legacy · 1836–2026',
      group: 'popup',
    },
    {
      name: 'description',
      title: 'Popup Description',
      type: 'text',
      rows: 3,
      initialValue: 'Join us as Mico University College proudly celebrates 190 years of excellence in education, leadership, and nation-building.',
      group: 'popup',
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'Learn More',
      group: 'popup',
    },

    // ── Detail page ──────────────────────────────────────────────────────────
    {
      name: 'pageEyebrow',
      title: 'Page Eyebrow',
      type: 'string',
      initialValue: '190 Years · 1836–2026',
      group: 'page',
    },
    {
      name: 'pageHeading',
      title: 'Page Heading',
      type: 'string',
      initialValue: '190 Years of Excellence',
      group: 'page',
    },
    {
      name: 'pageBody',
      title: 'Page Content',
      type: 'text',
      rows: 14,
      description: 'Separate paragraphs with a blank line.',
      group: 'page',
    },
    {
      name: 'pageImage',
      title: 'Page Image (optional)',
      type: 'image',
      options: { hotspot: true },
      group: 'page',
    },
  ],
  preview: {
    select: { title: 'pageHeading', media: 'logo' },
    prepare: ({ title, media }) => ({ title: title || 'Anniversary Popup', media }),
  },
})
