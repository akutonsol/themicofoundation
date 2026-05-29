import { defineType } from 'sanity'

export default defineType({
  name: 'contactSettings',
  title: 'Contact — Settings',
  type: 'document',
  fields: [
    { name: 'heading', title: 'Page Heading', type: 'string', initialValue: 'Contact Form' },
    { name: 'address', title: 'Address', type: 'string', initialValue: '1A Marescaux Road, Kingston 5.' },
    { name: 'email', title: 'Email', type: 'string', initialValue: 'micofoundation@yahoo.com' },
    {
      name: 'phones',
      title: 'Phone Numbers',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['(876) 929-5260-9', '(876) 665-7788'],
    },
    { name: 'mapEmbedUrl', title: 'Google Maps Embed URL', type: 'text', initialValue: 'https://maps.google.com/maps?width=100%25&height=600&hl=en&q=1A%20Marescaux%20Road,%20Kingston%205,%20Jamaica&t=&z=16&ie=UTF8&iwloc=B&output=embed' },
  ],
  preview: {
    prepare() { return { title: 'Contact Settings' } }
  }
})