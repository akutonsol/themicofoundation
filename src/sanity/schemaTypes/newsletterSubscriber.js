import { defineType } from 'sanity'

export default defineType({
  name: 'newsletterSubscriber',
  title: 'Newsletter Subscribers',
  type: 'document',
  fields: [
    {
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: Rule => Rule.required().custom(email => {
        if (!email) return 'Email is required'
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        return valid || 'Please enter a valid email address'
      })
    },
    {
      name: 'subscribedAt',
      title: 'Subscribed At',
      type: 'datetime',
      readOnly: true,
    },
    {
      name: 'isActive',
      title: 'Active Subscriber',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: { title: 'email', subtitle: 'firstName' },
    prepare({ title, subtitle }) {
      return { title, subtitle }
    }
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'subscribedAtDesc',
      by: [{ field: 'subscribedAt', direction: 'desc' }]
    }
  ]
})