// ============================================================================
// FILE: sanity/schemas/donationSettings.js
// ============================================================================
export default {
  name: 'donationSettings',
  title: 'Donation Form Settings',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Form Heading',
      type: 'string',
      initialValue: 'Make a Donation'
    },
    {
      name: 'description',
      title: 'Form Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'presetAmounts',
      title: 'Preset Donation Amounts',
      type: 'array',
      of: [{ type: 'number' }],
      validation: Rule => Rule.required().min(6).max(6),
      description: 'Exactly 6 preset amounts (e.g., 10, 25, 50, 100, 250, 500)'
    },
    {
      name: 'defaultFrequency',
      title: 'Default Frequency',
      type: 'string',
      options: {
        list: [
          { title: 'Once', value: 'once' },
          { title: 'Monthly', value: 'monthly' }
        ]
      },
      initialValue: 'once'
    },
    {
      name: 'paymentMethods',
      title: 'Available Payment Methods',
      type: 'object',
      fields: [
        {
          name: 'card',
          title: 'Credit/Debit Card',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'paypal',
          title: 'PayPal',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'inPerson',
          title: 'In Person',
          type: 'boolean',
          initialValue: true
        }
      ]
    },
    {
      name: 'projectImage',
      title: 'Featured Project Image',
      type: 'image',
      description: 'Image shown in donation form'
    },
    {
      name: 'projectLocation',
      title: 'Project Location',
      type: 'string',
      description: 'E.g., "Jamaica, Buxton"'
    },
    {
      name: 'successMessage',
      title: 'Success Message',
      type: 'text',
      rows: 2,
      initialValue: 'Thank you for your donation!'
    }
  ],
  preview: {
    select: {
      title: 'heading'
    }
  }
}
 