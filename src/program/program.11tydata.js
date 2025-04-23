export default {
  permalink: '/program/{{ title | slugify }}.html',
  tags: ['event'],
  eleventyComputed: {
    day: (data) => data['event-date'].split('T')[0],
    time: (data) => data['event-date'].split('T')[1],
  },
}
