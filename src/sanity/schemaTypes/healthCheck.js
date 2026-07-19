import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'healthCheck',
  title: 'Health Check Run',
  type: 'document',
  readOnly: true,
  fields: [
    defineField({ name: 'runAt', title: 'Run At', type: 'datetime' }),
    defineField({ name: 'status', title: 'Status', type: 'string' }),
    defineField({ name: 'durationMs', title: 'Duration (ms)', type: 'number' }),
    defineField({ name: 'source', title: 'Source', type: 'string' }),
    defineField({ name: 'summary', title: 'Summary', type: 'string' }),
    defineField({
      name: 'checks',
      title: 'Checks',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', type: 'string' },
          { name: 'category', type: 'string' },
          { name: 'ok', type: 'boolean' },
          { name: 'critical', type: 'boolean' },
          { name: 'ms', type: 'number' },
          { name: 'detail', type: 'string' },
        ],
        preview: { select: { title: 'name', subtitle: 'detail' } },
      }],
    }),
  ],
  orderings: [
    { title: 'Most recent', name: 'runAtDesc', by: [{ field: 'runAt', direction: 'desc' }] },
  ],
  preview: {
    select: { status: 'status', runAt: 'runAt', summary: 'summary' },
    prepare({ status, runAt, summary }) {
      const icon = status === 'healthy' ? '🟢' : status === 'degraded' ? '🟡' : '🔴'
      return { title: `${icon} ${status || 'unknown'} — ${runAt ? new Date(runAt).toLocaleString() : ''}`, subtitle: summary }
    },
  },
})
