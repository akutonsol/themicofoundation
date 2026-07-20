import { defineType } from 'sanity'

export default defineType({
  name: 'endowmentSubmission',
  title: 'Endowment Submissions',
  type: 'document',
  fields: [
    { name: 'firstName', title: 'First Name', type: 'string' },
    { name: 'lastName', title: 'Last Name', type: 'string' },
    { name: 'name', title: 'Full Name', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'endowmentType', title: 'Endowment Type', type: 'string' },
    { name: 'submittedAt', title: 'Submitted At', type: 'string' },
  ],
  preview: {
    select: { title: 'name', subtitle: 'endowmentType' },
  },
  orderings: [
    { title: 'Newest First', name: 'submittedAtDesc', by: [{ field: 'submittedAt', direction: 'desc' }] }
  ]
})
