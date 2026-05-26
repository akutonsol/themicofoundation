export default {
  name: 'newsEvent',
  title: 'News & Events',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required(),
      description: 'URL-friendly version of the title (auto-generated from title)'
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Upcoming Event', value: 'upcoming' },
          { title: 'Newsroom Article', value: 'newsroom' },
          { title: 'Event', value: 'event' },
          { title: 'Announcement', value: 'announcement' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'date',
      title: 'Event/Publication Date',
      type: 'date',
      validation: Rule => Rule.required(),
      description: 'Date of the event or when the news was published'
    },
    {
      name: 'time',
      title: 'Event Time',
      type: 'string',
      description: 'Event time (e.g., "11 AM UTC"). Only for upcoming events.'
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Event/article location (e.g., "Jamaica, Kingston")'
    },
    {
      name: 'excerpt',
      title: 'Excerpt/Short Description',
      type: 'text',
      validation: Rule => Rule.required().min(50).max(500),
      description: 'Brief description shown in listings (50-500 characters)'
    },
    {
      name: 'content',
      title: 'Full Article Content',
      type: 'text',
      description: 'Full article content for news articles (plain text, use \\n\\n for paragraph breaks)'
    },
    {
      name: 'description',
      title: 'Event Description',
      type: 'text',
      description: 'Detailed event description for upcoming events'
    },
    {
      name: 'eventDetails',
      title: 'Event Details (Bullet Points)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of event details/highlights (for upcoming events)'
    },
    {
      name: 'contactName',
      title: 'Contact Name',
      type: 'string',
      description: 'Contact person/team name (for upcoming events)'
    },
    {
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      description: 'Contact email (for upcoming events)'
    },
    {
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
      description: 'Contact phone number (for upcoming events)'
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      validation: Rule => Rule.required(),
      options: {
        hotspot: true
      },
      description: 'Main image for the article/event'
    },
    {
      name: 'thumbnailImage',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Smaller image for listings (uses featured image if not provided)'
    },
    {
      name: 'isFeatured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
      description: 'Show as the main featured article on homepage'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: Rule => Rule.required().min(0),
      description: 'Order in which articles appear (0 = first)'
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Show this article/event on the website'
    }
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      date: 'date',
      media: 'featuredImage',
      isFeatured: 'isFeatured',
      isActive: 'isActive'
    },
    prepare({ title, type, date, media, isFeatured, isActive }) {
      const formattedDate = date ? new Date(date).toLocaleDateString() : 'No date'
      return {
        title: title,
        subtitle: `${type} - ${formattedDate}${isFeatured ? ' ⭐ Featured' : ''}${!isActive ? ' (Inactive)' : ''}`,
        media: media
      }
    }
  }
}