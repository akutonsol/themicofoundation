import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'historicalPerspective',
  title: 'Historical Perspective (Trustees)',
  type: 'document',
  fields: [
    defineField({
      name: 'reading',
      title: 'Reading Paragraph(s)',
      type: 'text',
      rows: 12,
      description: 'The passage shown under “An Historical Perspective”. Separate paragraphs with a blank line.',
      initialValue:
`The bequest of Lady Jane Mico dates to 1670, when she left one thousand pounds in her will to ransom Christians held captive by the Barbary corsairs of North Africa. As the need for such ransoms faded, the fund lay dormant in the Court of Chancery for more than a century and a half, quietly accumulating interest.

In 1835, following the abolition of slavery throughout the British Empire, the accumulated sum was directed by Sir Thomas Fowell Buxton and his fellow reformers toward a new and enduring purpose — the education of the newly emancipated peoples of the West Indies. From that reimagined bequest sprang the Lady Mico Charity, and with it the teachers’ colleges and schools whose legacy The Mico Foundation carries forward today.`,
    }),
    defineField({
      name: 'image',
      title: 'Centered Image (below the paragraph)',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional image displayed centered beneath the paragraph.',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Historical Perspective' }
    },
  },
})
