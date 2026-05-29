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
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Large banner image (sepia-toned)',
    },

    // ── CONVERSATION ──
    {
      name: 'conversation',
      title: 'Conversation Bubbles',
      description: 'Chat-style bubbles shown in pairs. Must be even number. Left = first person, Right = second person.',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', title: 'Speaker Name', type: 'string' },
          { name: 'side', title: 'Side', type: 'string', options: { list: [{ title: 'Left', value: 'left' }, { title: 'Right', value: 'right' }] } },
          { name: 'label', title: 'Label (shown below name)', type: 'string' },
          { name: 'text', title: 'Message Text', type: 'text' },
        ],
        preview: { select: { title: 'name', subtitle: 'text' } }
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
