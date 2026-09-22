import { defineType } from 'sanity'
import { approvedField, approvalStatusPrefix } from '../lib/workflowFields'

export default defineType({
  name: 'teamMember',
  title: 'Team Members',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'role',
      title: 'Role / Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'type',
      title: 'Member Type',
      type: 'string',
      options: {
        list: [
          { title: 'Board of Directors', value: 'board' },
          { title: 'Current Trustee', value: 'trustee' },
          { title: 'Staff', value: 'staff' },
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'department',
      title: 'Department',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'tenure',
      title: 'Tenure',
      type: 'string',
      description: 'e.g. "5 years"'
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
    },
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    },
    approvedField,
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo', approved: 'approved' },
    prepare({ title, subtitle, media, approved }) {
      return { title: `${approvalStatusPrefix(approved)}${title}`, subtitle, media }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ]
})
