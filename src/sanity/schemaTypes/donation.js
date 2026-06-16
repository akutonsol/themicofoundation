import { defineType } from 'sanity'

export default defineType({
  name: 'donation',
  title: 'Donation',
  type: 'document',
  fields: [
    { name: 'donorName',          title: 'Donor Name',          type: 'string' },
    { name: 'email',              title: 'Email',               type: 'string' },
    { name: 'amount',             title: 'Amount',              type: 'number' },
    { name: 'currency',           title: 'Currency',            type: 'string' },
    { name: 'donationType',       title: 'Donation Type',       type: 'string',
      options: { list: [{ title: 'One-Time', value: 'once' }, { title: 'Monthly', value: 'monthly' }] } },
    { name: 'message',            title: 'Message',             type: 'text' },
    { name: 'orderId',            title: 'Order ID',            type: 'string' },
    { name: 'transactionId',      title: 'Transaction ID',      type: 'string' },
    { name: 'authorizationCode',  title: 'Authorization Code',  type: 'string' },
    { name: 'cardBrand',          title: 'Card Brand',          type: 'string' },
    { name: 'rrn',                title: 'RRN',                 type: 'string' },
    { name: 'status',             title: 'Status',              type: 'string',
      options: { list: [{ title: 'Pending', value: 'pending' }, { title: 'Completed', value: 'completed' }, { title: 'Failed', value: 'failed' }] },
      initialValue: 'pending' },
    { name: 'processedAt',        title: 'Processed At',        type: 'datetime' },
    { name: 'gateway',            title: 'Gateway',             type: 'string' },
    { name: 'projectTitle',       title: 'Project Title',       type: 'string' },
    { name: 'project',            title: 'Project',             type: 'reference', to: [{ type: 'project' }], weak: true },
  ],
  preview: {
    select: {
      name:   'donorName',
      amount: 'amount',
      proj:   'projectTitle',
      date:   'processedAt',
      status: 'status',
    },
    prepare({ name, amount, proj, date, status }) {
      const emoji = status === 'completed' ? '[OK]' : status === 'pending' ? '[...]' : '[X]'
      return {
        title:    `${name || 'Unknown'} - $${amount || 0}`,
        subtitle: `${emoji} ${proj || 'General'} - ${date ? new Date(date).toLocaleDateString() : ''}`,
      }
    },
  },
  orderings: [
    { title: 'Date (Newest)',     name: 'dateDesc',   by: [{ field: 'processedAt', direction: 'desc' }] },
    { title: 'Amount (Highest)',  name: 'amountDesc', by: [{ field: 'amount',      direction: 'desc' }] },
  ],
})
