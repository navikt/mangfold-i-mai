export default function () {
  return process.env.ELEVENTY_ENV || 'development'
}
