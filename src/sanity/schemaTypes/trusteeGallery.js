import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'trusteeGallery',
  title: 'Trustees Image Gallery',
  type: 'document',
  fields: [
    defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'Gallery' }),
    defineField({ name: 'intro', title: 'Intro Text (optional)', type: 'text', rows: 3 }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      description: 'Add, remove, reorder (drag) or edit images. Each image can have a title and description.',
      of: [{
        type: 'object',
        name: 'galleryItem',
        fields: [
          { name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() },
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text', rows: 3 },
        ],
        preview: {
          select: { title: 'title', subtitle: 'description', media: 'image' },
          prepare: ({ title, subtitle, media }) => ({ title: title || 'Untitled image', subtitle, media }),
        },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Trustees Image Gallery' }) },
})
