import { defineType } from 'sanity'

export default defineType({
  name: 'donation',
  title: 'Donation',
  type: 'document',

  // Donations are system-created — block manual creation/editing in Studio
  __experimental_actions: ['update', 'publish', 'delete'],

  fieldsets: [
    { name: 'donor',   title: 'Donor Details',    options: { columns: 2 } },
    { name: 'address', title: 'Address',           options: { columns: 2 } },
    { name: 'payment', title: 'Payment Details',   options: { columns: 2 } },
    { name: 'project', title: 'Project',           options: { columns: 2 } },
    { name: 'ids',     title: 'Transaction IDs',   options: { columns: 2 } },
  ],

  fields: [
    // ── Donor Details ──────────────────────────────────────────────────────
    {
      name: 'donorName', title: 'Donor Name', type: 'string',
      readOnly: true, fieldset: 'donor',
    },
    {
      name: 'email', title: 'Email', type: 'string',
      readOnly: true, fieldset: 'donor',
    },
    {
      name: 'phone', title: 'Phone', type: 'string',
      readOnly: true, fieldset: 'donor',
    },
    {
      name: 'donationType', title: 'Donation Type', type: 'string',
      readOnly: true, fieldset: 'donor',
    },

    // ── Address ────────────────────────────────────────────────────────────
    {
      name: 'address', title: 'Address', type: 'string',
      readOnly: true, fieldset: 'address',
    },
    {
      name: 'city', title: 'City', type: 'string',
      readOnly: true, fieldset: 'address',
    },
    {
      name: 'state', title: 'State / Parish / Province', type: 'string',
      readOnly: true, fieldset: 'address',
    },
    {
      name: 'postalCode', title: 'ZIP / Postal Code', type: 'string',
      readOnly: true, fieldset: 'address',
    },
    {
      name: 'country', title: 'Country', type: 'string',
      readOnly: true, fieldset: 'address',
    },

    // ── Payment Details ────────────────────────────────────────────────────
    {
      name: 'amount', title: 'Amount (USD)', type: 'number',
      readOnly: true, fieldset: 'payment',
    },
    {
      name: 'currency', title: 'Currency', type: 'string',
      readOnly: true, fieldset: 'payment',
    },
    {
      name: 'cardBrand', title: 'Card Brand', type: 'string',
      readOnly: true, fieldset: 'payment',
    },
    {
      name: 'status', title: 'Status', type: 'string',
      readOnly: true, fieldset: 'payment',
    },
    {
      name: 'processedAt', title: 'Processed At', type: 'datetime',
      readOnly: true,
      options: {
        dateFormat: 'MMMM D, YYYY',
        timeFormat: 'h:mm A',
        calendarTodayLabel: 'Today',
        timeStep: 1,
      },
    },
    {
      name: 'gateway', title: 'Gateway', type: 'string',
      readOnly: true, fieldset: 'payment',
    },

    // ── Project ────────────────────────────────────────────────────────────
    {
      name: 'projectTitle', title: 'Project Title', type: 'string',
      readOnly: true, fieldset: 'project',
    },
    {
      name: 'project', title: 'Project (Reference)', type: 'reference',
      to: [{ type: 'project' }], weak: true,
      readOnly: true, fieldset: 'project',
    },

    // ── Message ─────────────────────────────────────────────────────────────
    {
      name: 'message', title: 'Donor Message', type: 'text',
      readOnly: true,
    },

    // ── Transaction IDs ────────────────────────────────────────────────────
    {
      name: 'orderId', title: 'Order ID', type: 'string',
      readOnly: true, fieldset: 'ids',
    },
    {
      name: 'transactionId', title: 'Transaction ID', type: 'string',
      readOnly: true, fieldset: 'ids',
    },
    {
      name: 'authorizationCode', title: 'Authorization Code', type: 'string',
      readOnly: true, fieldset: 'ids',
    },
    {
      name: 'rrn', title: 'RRN', type: 'string',
      readOnly: true, fieldset: 'ids',
    },
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
      const icon = status === 'completed' ? '✓' : status === 'pending' ? '⏳' : '✗'
      const d = date
        ? new Date(date).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric', timeZone:'America/Jamaica' })
        : '—'
      return {
        title:    `${name || 'Unknown'} — $${typeof amount === 'number' ? amount.toFixed(2) : '0.00'}`,
        subtitle: `${icon} ${proj || 'General Donation'} · ${d}`,
      }
    },
  },

  orderings: [
    { title: 'Date (Newest)',    name: 'dateDesc',   by: [{ field: 'processedAt', direction: 'desc' }] },
    { title: 'Amount (Highest)', name: 'amountDesc', by: [{ field: 'amount',      direction: 'desc' }] },
  ],
})
