const isDev =
  process.env.VERCEL_ENV === 'preview' || process.env.NODE_ENV === 'development'

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: { remarkPlugins: [], format: 'mdx' },
})

module.exports = withMDX({
  pageExtensions: ['jsx', 'js', 'mdx', 'md'],
  assetPrefix: isDev ? '' : 'https://cdr-verification.carbonplan.org',
})
