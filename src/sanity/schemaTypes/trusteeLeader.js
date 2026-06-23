import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'trusteeLeader',
  title: 'Trustee Leader Message',
  type: 'document',
  fields: [
    defineField({
      name: 'portrait',
      title: 'Leader Portrait',
      description: 'Used both in this message section and on the right of the Trustees hero.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      initialValue: 'Joe Bartley',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      initialValue: 'Lead Trustee',
    }),
    defineField({
      name: 'org',
      title: 'Organisation',
      type: 'string',
      initialValue: 'The Mico Foundation',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      initialValue: 'A Word from Our Lead Trustee',
    }),
    defineField({
      name: 'headingBefore',
      title: 'Heading — before highlight',
      type: 'string',
      initialValue: 'Stewardship, Service',
    }),
    defineField({
      name: 'headingHighlight',
      title: 'Heading — highlight word (green italic)',
      type: 'string',
      initialValue: '&',
    }),
    defineField({
      name: 'headingAfter',
      title: 'Heading — after highlight',
      type: 'string',
      initialValue: 'Legacy',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      description: 'Separate paragraphs with a blank line.',
      type: 'text',
      rows: 10,
      initialValue:
        "For nearly two centuries, the Lady Mico Trust has stood as a beacon of educational opportunity across the Caribbean. To serve as a steward of that legacy is both a profound privilege and a serious responsibility — one our trustees carry with deep humility and unwavering commitment.\n\nOur role is to protect what has been entrusted to us, to grow it wisely, and to ensure that the doors of education remain open for the generations still to come. Every decision we make is measured against a single question: does it strengthen and sustain the mission of The Mico?\n\nI am grateful to our fellow trustees, our partners, our donors, and the wider Mico family for walking this journey with us. Together, we continue to honour the past while building a future worthy of those who came before — and those who will follow.",
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'portrait' },
  },
})
