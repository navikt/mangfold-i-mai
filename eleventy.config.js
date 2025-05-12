import { EleventyHtmlBasePlugin } from '@11ty/eleventy'
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img'
import eleventyNavigationPlugin from '@11ty/eleventy-navigation'
import { minifyHtml } from './src/_11ty/transforms.js'
import { readableDate, sentence, eventsBySpeaker } from './src/_11ty/filters.js'
import markdownItAttrs from 'markdown-it-attrs'

import * as sass from 'sass'
import path from 'path'

export default async function (eleventyConfig) {
  // Passthrough Copy
  eleventyConfig.addPassthroughCopy('./src/assets/fonts')
  eleventyConfig.addPassthroughCopy('./src/assets/images/logo-small.svg')
  eleventyConfig.addPassthroughCopy('./src/assets/images/nav-logo.svg')
  eleventyConfig.addPassthroughCopy('./src/assets/images/mim-banner.png')
  eleventyConfig.addPassthroughCopy('./src/assets/images/mim-banner-2.webp')
  eleventyConfig.addPassthroughCopy('./src/assets/images/mim-banner-3.webp')
  eleventyConfig.addPassthroughCopy('./src/assets/images/favicon.png')
  eleventyConfig.addPassthroughCopy('./src/assets/images/favicon.svg')

  eleventyConfig.addPassthroughCopy({ './_2022': '2022' })
  eleventyConfig.addPassthroughCopy({ './_2023': '2023' })
  eleventyConfig.addPassthroughCopy({ './_2024': '2024' })

  // Extend Markdown-It
  eleventyConfig.amendLibrary('md', (mdLib) => mdLib.use(markdownItAttrs))

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
    svgAllowUpscale: false,
    svgShortCircuit: true,
    svgCompressionSize: 'br',
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
  eleventyConfig.addFilter('sentence', sentence)
  eleventyConfig.addFilter('eventsBySpeaker', eventsBySpeaker)

  // Transforms
  eleventyConfig.addTransform('minifyHtml', minifyHtml)

  // Eleventy Dev Server
  eleventyConfig.setServerOptions({
    enabled: true,
    showVersion: true,
    port: 8888,
  })
}

export const config = {
  templateFormats: ['md', 'html'],
  dir: {
    input: 'src',
    includes: '_includes',
    layouts: '_layouts',
    data: '_data',
    output: '_site',
  },
}

