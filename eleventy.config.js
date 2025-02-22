import { EleventyHtmlBasePlugin } from '@11ty/eleventy'
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img'
import eleventyNavigationPlugin from '@11ty/eleventy-navigation'
import compression from 'compression'
import { minifyHtml } from './_11ty/transforms.js'
import { readableDate, listFormat, isPlural } from './_11ty/filters.js'
import markdownItAttrs from 'markdown-it-attrs'

import * as sass from 'sass'
import path from 'path'

export default async function (eleventyConfig) {
  // Passthrough Copy
  eleventyConfig.addPassthroughCopy('assets/scripts')
  eleventyConfig.addPassthroughCopy('assets/fonts')
  eleventyConfig.addPassthroughCopy('assets/images/logo-small.svg')
  eleventyConfig.addPassthroughCopy('assets/images/nav-logo.svg')
  eleventyConfig.addPassthroughCopy('assets/images/mim-banner.png')
  eleventyConfig.addPassthroughCopy('assets/images/favicon.png')
  eleventyConfig.addPassthroughCopy('assets/images/favicon.svg')

  // Scss Compilation
  eleventyConfig.addTemplateFormats('scss')
  eleventyConfig.addWatchTarget('*.scss')
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
        style: 'compressed',
        sourceMap: true,
      })

      this.addDependencies(inputPath, result.loadedUrls)

      // This is the render function, `data` is the full data cascade
      return async () => {
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
  eleventyConfig.addFilter('readableDate', readableDate)
  eleventyConfig.addFilter('listFormat', listFormat)
  eleventyConfig.addFilter('isPlural', isPlural)

  // Transforms
  eleventyConfig.addTransform('minifyHtml', minifyHtml)

  // Shortcode
  eleventyConfig.addShortcode('currentBuildDate', () => {
    return new Date().toISOString()
  })

  // Liquid Templating Language Options
  eleventyConfig.setLiquidOptions({})

  // Eleventy Dev Server
  eleventyConfig.setServerOptions({
    enabled: true,
    showVersion: true,
    port: 8888,
    middleware: [compression()],
  })

  // Extend Markdown-It
  eleventyConfig.amendLibrary('md', (mdLib) => mdLib.use(markdownItAttrs))
}

export const config = {
  templateFormats: ['md', 'html'],
  dir: {
    includes: '_includes',
    layouts: '_layouts',
    data: '_data',
    output: '_site_new',
  },
  // pathPrefix: '/mangfold-i-mai',
}

