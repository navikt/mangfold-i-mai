import { EleventyHtmlBasePlugin } from '@11ty/eleventy'
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img'
import eleventyNavigationPlugin from '@11ty/eleventy-navigation'

import * as sass from 'sass'
import path from 'path'

export default async function (eleventyConfig) {
  // Watch images for the image pipeline.
  eleventyConfig.addWatchTarget('*.scss')

  // Passthrough Copy
  eleventyConfig.addPassthroughCopy('assets/js')
  eleventyConfig.addPassthroughCopy('assets/images/logo-small.svg')
  eleventyConfig.addPassthroughCopy('assets/images/nav-logo.svg')
  eleventyConfig.addPassthroughCopy('assets/images/mim-banner.png')
  eleventyConfig.addPassthroughCopy('assets/images/favicon.png')
  eleventyConfig.addPassthroughCopy('assets/images/favicon.svg')

  // Sass stuff
  eleventyConfig.addTemplateFormats('scss')
  eleventyConfig.addExtension('scss', {
    outputFileExtension: 'css', // optional, default: "html"

    // `compile` is called once per .scss file in the input directory
    compile: async function (inputContent, inputPath) {
      let parsed = path.parse(inputPath)
      if (parsed.name.startsWith('_')) {
        return
      }

      let result = sass.compileString(inputContent, {
        loadPaths: [parsed.dir || '.', this.config.dir.includes],
      })

      this.addDependencies(inputPath, result.loadedUrls)

      // This is the render function, `data` is the full data cascade
      return async (data) => {
        return result.css
      }
    },
  })

  // Eleventy Plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin)
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin)

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ['avif', 'webp', 'auto'],
    widths: ['auto'],
    failOnError: false,
    urlPath: '/assets/images/',
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

  // Filters
  eleventyConfig.addShortcode('currentBuildDate', () => {
    return new Date().toISOString()
  })

  // Liquid Templating Language Options
  eleventyConfig.setLiquidOptions({})
}

export const config = {
  templateFormats: ['md', 'html'],
  dir: {
    includes: '_includes',
    layouts: '_layouts',
    data: '_data',
    output: '_site_new',
  },
  pathPrefix: '/mangfold-i-mai',
}
