// ============================================================================
// FILE: sanity/schemas/siteSettings.js
// ============================================================================
export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'The Mico Foundation'
    },
    {
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'logo',
      title: 'Site Logo',
      type: 'image'
    },
    {
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'phones',
          title: 'Phone Numbers',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Add multiple phone numbers'
        },
        {
          name: 'emails',
          title: 'Email Addresses',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Add multiple email addresses'
        },
        {
          name: 'address',
          title: 'Physical Address',
          type: 'object',
          fields: [
            { name: 'street', title: 'Street Address', type: 'string' },
            { name: 'city', title: 'City', type: 'string' },
            { name: 'country', title: 'Country', type: 'string' }
          ]
        },
        {
          name: 'openingHours',
          title: 'Opening Hours',
          type: 'object',
          fields: [
            { name: 'weekdays', title: 'Weekdays', type: 'string' },
            { name: 'weekend', title: 'Weekend', type: 'string' }
          ]
        }
      ]
    },
    {
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook',
          type: 'url'
        },
        {
          name: 'twitter',
          title: 'Twitter/X',
          type: 'url'
        },
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url'
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url'
        },
        {
          name: 'youtube',
          title: 'YouTube',
          type: 'url'
        }
      ]
    },
    {
      name: 'footerSettings',
      title: 'Footer Settings',
      type: 'object',
      fields: [
        {
          name: 'aboutText',
          title: 'About Text',
          type: 'text',
          rows: 3
        },
        {
          name: 'copyrightText',
          title: 'Copyright Text',
          type: 'string'
        },
        {
          name: 'developerCredit',
          title: 'Developer Credit',
          type: 'object',
          fields: [
            { name: 'text', title: 'Text', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'siteName'
    }
  }
}