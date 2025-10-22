import htmlMinifier from 'html-minifier-terser'

const minifyHtml = (content, outputPath) => {
  const env = process.env.ELEVENTY_ENV
  if (env === 'production' && outputPath && outputPath.endsWith('.html')) {
    let minified = htmlMinifier.minify(content, {
      useShortDoctype: true,
      removeComments: false,
      collapseWhitespace: true,
      minifyCSS: {
        level: 2,
      },
    })
    return minified
  }

  return content
}

export { minifyHtml }
