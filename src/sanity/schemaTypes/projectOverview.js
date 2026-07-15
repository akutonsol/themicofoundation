import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'projectOverview',
  title: 'Project Overview Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'intro', title: 'Current Initiatives' },
    { name: 'action', title: 'In Action' },
    { name: 'cta', title: 'CTA Banner' },
  ],
  fields: [
    // ── HERO ──
    defineField({ name: 'heroImage', title: 'Hero Background Image', type: 'image', options: { hotspot: true }, group: 'hero' }),
    defineField({ name: 'heroEyebrow', title: 'Hero Eyebrow', type: 'string', initialValue: 'Our Work', group: 'hero' }),
    defineField({ name: 'heroTitle', title: 'Hero Title', type: 'string', initialValue: 'Projects That Create Lasting Impact', group: 'hero' }),
    defineField({ name: 'heroSubtitle', title: 'Hero Subtitle', type: 'text', rows: 3, initialValue: 'Through community programs, outreach initiatives, and meaningful partnerships, the Mico Foundation is committed to building brighter futures.', group: 'hero' }),

    // ── CURRENT INITIATIVES ──
    defineField({ name: 'introEyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Current Initiatives', group: 'intro' }),
    defineField({ name: 'introTitle', title: 'Title (a gold period is added automatically)', type: 'string', initialValue: 'Supporting communities through purpose-driven projects', group: 'intro' }),
    defineField({ name: 'introBody', title: 'Body Paragraph(s)', type: 'text', rows: 8, description: 'Separate paragraphs with a blank line.', initialValue: 'Our projects are designed to meet real needs within the communities we serve. From education and youth development to outreach, wellness, and local support, each initiative reflects our mission to uplift, empower, and create opportunity.\n\nExplore our current projects and see how the Mico Foundation is making a difference one initiative at a time.', group: 'intro' }),

    // ── IN ACTION ──
    defineField({ name: 'actionEyebrow', title: 'Eyebrow', type: 'string', initialValue: 'In Action', group: 'action' }),
    defineField({ name: 'actionTitle', title: 'Title', type: 'string', initialValue: 'A look at our current projects', group: 'action' }),
    defineField({
      name: 'actionNote',
      title: 'Note',
      type: 'string',
      readOnly: true,
      initialValue: 'The collage images are pulled automatically from your Projects (image + link). Manage them under Projects.',
      group: 'action',
    }),

    // ── CTA BANNER ──
    defineField({ name: 'ctaEyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Explore More', group: 'cta' }),
    defineField({ name: 'ctaTitle', title: 'Title', type: 'string', initialValue: 'View all of our foundation projects', group: 'cta' }),
    defineField({ name: 'ctaSubtitle', title: 'Subtitle', type: 'text', rows: 3, initialValue: 'Learn more about the initiatives currently making an impact through the Mico Foundation.', group: 'cta' }),
    defineField({ name: 'ctaButtonText', title: 'Button Text', type: 'string', initialValue: 'View Our Projects', group: 'cta' }),
    defineField({ name: 'ctaButtonLink', title: 'Button Link', type: 'string', initialValue: '/projects', group: 'cta' }),
  ],
  preview: {
    prepare() {
      return { title: 'Project Overview Page' }
    },
  },
})
