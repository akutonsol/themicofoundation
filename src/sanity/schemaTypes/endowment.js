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

    // ── LEGACY HERO (top banner) ──
    {
      name: 'legacyEyebrow',
      title: 'Legacy — Eyebrow',
      type: 'string',
      initialValue: 'Endowments',
    },
    {
      name: 'legacyTitle',
      title: 'Legacy — Title',
      type: 'string',
      initialValue: 'Create a lasting legacy through education.',
    },
    {
      name: 'legacySubtitle',
      title: 'Legacy — Subtitle',
      type: 'text',
      rows: 3,
      initialValue: 'Your endowment empowers generations of Jamaican educators and students to learn, lead, and transform our communities.',
    },
    {
      name: 'legacyCtaText',
      title: 'Legacy — Button Text',
      type: 'string',
      initialValue: 'Explore Endowment Options',
    },
    {
      name: 'legacyCtaLink',
      title: 'Legacy — Button Link',
      type: 'string',
      initialValue: '#endowment-form',
    },
    {
      name: 'legacyImage',
      title: 'Legacy — Hero Image (right side)',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'legacyCardsHeading',
      title: 'Legacy — Cards Heading',
      type: 'text',
      rows: 3,
      initialValue: 'Join a community of active endowments united by a shared vision to strengthen and transform The Mico University College community and shape the future of education together.',
    },
    {
      name: 'legacyCards',
      title: 'Legacy — Endowment Type Cards',
      description: 'Card colours follow their order automatically: black, green, gold, yellow. Clicking a card opens a popover showing its description.',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', title: 'Label', type: 'string' },
          { name: 'description', title: 'Popover Description', type: 'text', rows: 4 },
          {
            name: 'icon',
            title: 'Icon',
            type: 'string',
            options: {
              list: [
                { title: 'People', value: 'family' },
                { title: 'Book', value: 'research' },
                { title: 'Person', value: 'individual' },
                { title: 'Building', value: 'corporate' },
              ],
            },
            initialValue: 'family',
          },
        ],
        preview: { select: { title: 'label', subtitle: 'description' } },
      }],
      initialValue: [
        { label: 'General Endowment Grant', icon: 'family', description: 'An unrestricted gift that supports the Foundation’s greatest priorities across The Mico University College — funding scholarships, programmes, and campus needs wherever the impact is greatest.' },
        { label: 'Legacy Endowment Grant', icon: 'research', description: 'A named, enduring fund created in your honour or in memory of a loved one — preserving your legacy while permanently supporting education at The Mico.' },
        { label: 'Leadership Legacy Endowment Grant', icon: 'individual', description: 'A transformational gift that champions leadership development, academic excellence, and the training of outstanding educators for Jamaica and the Caribbean.' },
        { label: 'Corporate Endowment Grant', icon: 'corporate', description: 'A partnership gift from a company or organisation — investing in education, research, and community development while building a lasting corporate legacy at The Mico.' },
      ],
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
