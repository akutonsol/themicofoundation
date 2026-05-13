// ============================================================================
// FILE: sanity/schemas/newsletterSettings.js
// ============================================================================
export default {
  name: 'newsletterSettings',
  title: 'Newsletter Settings',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'Subscribe to Our Newsletter'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'apiEndpoint',
      title: 'Newsletter API Endpoint',
      type: 'url',
      description: 'Mailchimp, ConvertKit, or other newsletter service endpoint'
    },
    {
      name: 'successMessage',
      title: 'Success Message',
      type: 'string',
      initialValue: '🎉 You\'re subscribed! Thank you for joining.'
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'Subscribe'
    }
  ],
  preview: {
    select: {
      title: 'heading'
    }
  }
}
 