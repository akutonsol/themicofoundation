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
          { title: 'News Article', value: 'news' },
          { title: 'Upcoming Event', value: 'upcoming' },
          { title: 'Newsroom Article', value: 'newsroom' },
          { title: 'Event (Past)', value: 'event' },
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
      name: 'category',
      title: 'Category Label',
      type: 'string',
      description: 'e.g. "Newsroom", "Education"',
      initialValue: 'Newsroom'
    },
    {
      name: 'author',
      title: 'Author / Posted By',
      type: 'string',
      initialValue: 'The Mico Foundation'
    },
    {
      name: 'excerpt',
      title: 'Excerpt/Short Description',
      type: 'text',
      validation: Rule => Rule.required().min(10).max(500),
      description: 'Brief description shown in listings'
    },
    {
      name: 'content',
      title: 'Full Article Content',
      type: 'text',
      description: 'Full article content for news articles'
    },
    {
      name: 'description',
      title: 'Event Description',
      type: 'text',
      description: 'Detailed event description'
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
      description: 'Contact person/team name'
    },
    {
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      description: 'Contact email'
    },
    {
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
      description: 'Contact phone number'
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Main image for the article/event'
    },
    {
      name: 'thumbnailImage',
      title: 'Thumbnail Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Smaller image for listings (uses featured image if not provided)'
    },
    {
      name: 'gallery',
      title: 'Event Gallery',
      description: 'Photo gallery for past events — hold Cmd/Ctrl to select multiple images at once',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt Text', type: 'string' }
          ]
        }
      ],
      options: { layout: 'grid' }
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
      initialValue: 0,
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
      const labels = { news: '📰', newsroom: '📰', upcoming: '📅', event: '✅', announcement: '📢' }
      const formattedDate = date ? new Date(date).toLocaleDateString() : 'No date'
      return {
        title: `${labels[type] || ''} ${title}`,
        subtitle: `${type} - ${formattedDate}${isFeatured ? ' ⭐' : ''}${!isActive ? ' (Inactive)' : ''}`,
        media
      }
    }
  },
  orderings: [
    { title: 'Newest First', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }
  ]
}