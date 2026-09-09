import { defineType } from 'sanity'

export default defineType({
  name: 'historyPage',
  title: 'History Page',
  type: 'document',
  fields: [
    // ── HERO ──
    {
      name: 'heroLabel',
      title: 'Hero Label',
      type: 'string',
      initialValue: 'The Mico Foundation History',
    },
    {
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'text',
      initialValue: 'A Legacy Built\nTo Protect The Future.',
    },
    {
      name: 'heroSubtext',
      title: 'Hero Image Subtext',
      type: 'string',
      initialValue: 'From historic stewardship to future impact.',
    },
    {
      name: 'heroNarrative',
      title: 'Hero Image Narrative (shown below the Subtext)',
      type: 'text',
      rows: 4,
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Large banner image (sepia-toned)',
    },

    // ── CONVERSATION ──
    {
      name: 'conversation',
      title: 'History Chat Boxes',
      description: 'One box per era. Alternate Left/Right for visual rhythm. Add a photo to show it beside the box.',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Title (e.g. "1950s and 60s — Principal Glenville H. Owen")', type: 'string' },
          { name: 'side', title: 'Side', type: 'string', options: { list: [{ title: 'Left', value: 'left' }, { title: 'Right', value: 'right' }] } },
          { name: 'paragraphs', title: 'Paragraphs', type: 'array', of: [{ type: 'text' }], description: 'Each entry is one paragraph.' },
          { name: 'image', title: 'Photo (optional — shown to the right of the box)', type: 'image', options: { hotspot: true } },
        ],
        preview: { select: { title: 'title', subtitle: 'side', media: 'image' } }
      }]
    },

    // ── STORY SECTION ──
    {
      name: 'storyHeading',
      title: 'Story Section Heading',
      type: 'string',
      initialValue: 'The Story Behind The Foundation',
    },
    {
      name: 'storyParagraphs',
      title: 'Story Paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
    },

    // ── TIMELINE ──
    {
      name: 'timeline',
      title: 'Historical Timeline',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'year', title: 'Year / Era', type: 'string' },
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'text', title: 'Description', type: 'text' },
        ],
        preview: { select: { title: 'year', subtitle: 'title' } }
      }]
    },

    // ── CTA ──
    {
      name: 'ctaHeading',
      title: 'CTA Heading',
      type: 'string',
      initialValue: 'Help continue the legacy.',
    },
    {
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Explore Projects',
    },
    {
      name: 'ctaButtonLink',
      title: 'CTA Button Link',
      type: 'string',
      initialValue: '/projects',
    },
  ],
  preview: {
    prepare() { return { title: 'History Page' } }
  }
})
