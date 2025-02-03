import { EleventyHtmlBasePlugin } from '@11ty/eleventy'
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img'
import eleventyNavigationPlugin from '@11ty/eleventy-navigation'

export default async function (eleventyConfig) {
  // Watch images for the image pipeline.
  eleventyConfig.addWatchTarget('content/**/*.{svg,webp,png,jpg,jpeg,gif}')

  // Eleventy Plugins
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin)

  eleventyConfig.addPlugin(eleventyNavigationPlugin)

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ['avif', 'webp', 'auto'],
    widths: ['auto'],
    failOnError: false,
    htmlOptions: {
      imgAttributes: {
        loading: 'lazy',
        decoding: 'async',
      },
    },
    sharpOptions: {
      animated: true,
    },
  })

  eleventyConfig.addBundle('css', {
    toFileDirectory: '_site_new',
  })

  // Filters
  eleventyConfig.addShortcode('currentBuildDate', () => {
    return new Date().toISOString()
  })
}

export const config = {
  templateFormats: ['md', 'njk', 'html'],
  dir: {
    includes: '_includes',
    layouts: '_layouts',
    data: '_data',
    output: '_site_new',
  },
  pathPrefix: '/mangfold-i-mai',
}
