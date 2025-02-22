export default {
  permalink: '/events/{{ title | slugify }}.html',
  tags: ['event'],
  eleventyComputed: {
    day: (data) => data['event-date'].split('T')[0],
  },
}
