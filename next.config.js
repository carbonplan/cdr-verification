const isDev =
  process.env.VERCEL_ENV === 'preview' || process.env.NODE_ENV === 'development'

module.exports = {
  pageExtensions: ['jsx', 'js'],
  assetPrefix: isDev ? '' : 'https://cdr-verification.carbonplan.org',
}
