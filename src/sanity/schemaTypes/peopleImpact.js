export default {
  name: 'peopleImpact',
  title: 'People Impact (Testimonials)',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Person Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'role',
      title: 'Role/Title',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'e.g., Donor, Community Partner, Alumni Donor, Endowment Supporter'
    },
    {
      name: 'quote',
      title: 'Quote',
      type: 'text',
      validation: Rule => Rule.required().min(50).max(500),
      description: 'The testimonial quote from this person'
    },
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
      validation: Rule => Rule.required(),
      options: {
        hotspot: true
      },
      description: 'Portrait photo (will be shown in yellow oval)'
    },
    {
      name: 'mobilePhoto',
      title: 'Mobile Photo (Optional)',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Optional separate photo for mobile view (uses main photo if not provided)'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: Rule => Rule.required().min(0),
      description: 'Order in which this quote appears (0 = first)'
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Show this quote on the website'
    }
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' }
      ]
    }
  ],
  preview: {
    select: {
      name: 'name',
      role: 'role',
      photo: 'photo',
      order: 'order',
      isActive: 'isActive'
    },
    prepare({ name, role, photo, order, isActive }) {
      return {
        title: name,
        subtitle: `${role} - Order: ${order}${!isActive ? ' (Inactive)' : ''}`,
        media: photo
      }
    }
  }
}