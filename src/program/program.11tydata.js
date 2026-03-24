export default {
  layout: 'event.html',
  tags: ['event'],
  noindex: true,
  eleventyComputed: {
    day: (data) => data['event-date'].split('T')[0],
    time: (data) => data['event-date'].split('T')[1],
  },
}