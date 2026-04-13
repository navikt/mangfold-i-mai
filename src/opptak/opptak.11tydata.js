export default {
  layout: 'recording.html',
  tags: ['opptak'],
  eleventyComputed: {
    day: (data) => data['event-date'].split('T')[0],
  },
}
