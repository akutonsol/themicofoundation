import { defineType } from 'sanity'

export default defineType({
  name: 'donation',
  title: 'Donation',
  type: 'document',
  fields: [
    {
      name: 'donorFirstName',
      title: 'First Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'donorLastName',
      title: 'Last Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.required().email()
    },
    {
      name: 'address1',
      title: 'Address Line 1',
      type: 'string'
    },
    {
      name: 'address2',
      title: 'Address Line 2',
      type: 'string'
    },
    {
      name: 'city',
      title: 'City',
      type: 'string'
    },
    {
      name: 'state',
      title: 'State/Province',
      type: 'string'
    },
    {
      name: 'zip',
      title: 'ZIP/Postal Code',
      type: 'string'
    },
    {
      name: 'country',
      title: 'Country',
      type: 'string'
    },
    {
      name: 'donationAmount',
      title: 'Donation Amount',
      type: 'number',
      validation: Rule => Rule.required().positive()
    },
    {
      name: 'donationType',
      title: 'Donation Type',
      type: 'string',
      options: {
        list: [
          { title: 'One-Time', value: 'once' },
          { title: 'Monthly', value: 'monthly' }
        ]
      }
    },
    {
      name: 'project',
      title: 'Project',
      type: 'reference',
      to: [{ type: 'project' }],
      description: 'Which project this donation is for'
    },
    {
      name: 'paymentMethod',
      title: 'Payment Method',
      type: 'string',
      options: {
        list: [
          { title: 'Credit Card', value: 'card' },
          { title: 'PayPal', value: 'paypal' },
          { title: 'In Person', value: 'inperson' }
        ]
      }
    },
    {
      name: 'paymentStatus',
      title: 'Payment Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Completed', value: 'completed' },
          { title: 'Failed', value: 'failed' }
        ]
      },
      initialValue: 'pending'
    },
    {
      name: 'stripePaymentId',
      title: 'Stripe Payment ID',
      type: 'string',
      description: 'Stripe payment intent ID'
    },
    {
      name: 'transactionId',
      title: 'Transaction ID',
      type: 'string',
      description: 'Unique transaction reference'
    },
    {
      name: 'donationDate',
      title: 'Donation Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'notes',
      title: 'Notes',
      type: 'text',
      description: 'Any additional notes'
    },
    {
      name: 'emailSent',
      title: 'Email Sent',
      type: 'boolean',
      initialValue: false
    }
  ],
  preview: {
    select: {
      firstName: 'donorFirstName',
      lastName: 'donorLastName',
      amount: 'donationAmount',
      project: 'project.title',
      date: 'donationDate',
      status: 'paymentStatus'
    },
    prepare(selection) {
      const { firstName, lastName, amount, project, date, status } = selection
      const formattedDate = date ? new Date(date).toLocaleDateString() : ''
      const statusEmoji = status === 'completed' ? '✅' : status === 'pending' ? '⏳' : '❌'
      return {
        title: `${firstName} ${lastName} - $${amount}`,
        subtitle: `${statusEmoji} ${project || 'General'} • ${formattedDate}`
      }
    }
  },
  orderings: [
    {
      title: 'Date (Newest)',
      name: 'dateDesc',
      by: [{ field: 'donationDate', direction: 'desc' }]
    },
    {
      title: 'Amount (Highest)',
      name: 'amountDesc',
      by: [{ field: 'donationAmount', direction: 'desc' }]
    }
  ]
})