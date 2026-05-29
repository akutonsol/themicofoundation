import { defineType } from 'sanity'

export default defineType({
  name: 'pledgeSubmission',
  title: 'Pledge Submissions',
  type: 'document',
  fields: [
    { name: 'firstName', title: 'First Name', type: 'string' },
    { name: 'lastName', title: 'Last Name', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'phone', title: 'Phone', type: 'string' },
    { name: 'amount', title: 'Amount', type: 'number' },
    { name: 'currency', title: 'Currency', type: 'string' },
    { name: 'country', title: 'Country', type: 'string' },
    { name: 'paymentMethod', title: 'Payment Method', type: 'string' },
    { name: 'commitment', title: 'Commitment Period', type: 'string' },
    { name: 'projectTitle', title: 'Project', type: 'string' },
    { name: 'submittedAt', title: 'Submitted At', type: 'string' },
  ],
  preview: {
    select: { title: 'email', subtitle: 'amount' },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ? `$${subtitle}` : '' }
    }
  },
  orderings: [
    { title: 'Newest First', name: 'submittedAtDesc', by: [{ field: 'submittedAt', direction: 'desc' }] }
  ]
})
