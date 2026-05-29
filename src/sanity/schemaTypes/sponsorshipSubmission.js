import { defineType } from 'sanity'

export default defineType({
  name: 'sponsorshipSubmission',
  title: 'Sponsorship Submissions',
  type: 'document',
  fields: [
    { name: 'firstName', title: 'First Name', type: 'string' },
    { name: 'lastName', title: 'Last Name', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'address1', title: 'Address Line 1', type: 'string' },
    { name: 'address2', title: 'Address Line 2', type: 'string' },
    { name: 'country', title: 'Country', type: 'string' },
    { name: 'city', title: 'City', type: 'string' },
    { name: 'zip', title: 'ZIP/Postal Code', type: 'string' },
    { name: 'state', title: 'State/Province', type: 'string' },
    { name: 'subject', title: 'Subject', type: 'string' },
    { name: 'message', title: 'Message', type: 'text' },
    { name: 'submittedAt', title: 'Submitted At', type: 'string' },
  ],
  preview: {
    select: { title: 'email', subtitle: 'subject' },
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }]
    }
  ]
})
