const isDev =
  process.env.VERCEL_ENV === 'preview' || process.env.NODE_ENV === 'development'

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: { remarkPlugins: [], format: 'mdx' },
})

module.exports = withMDX({
  pageExtensions: ['jsx', 'js', 'mdx', 'md'],
  assetPrefix: isDev ? '' : 'https://cdr-verification.carbonplan.org',
  async redirects() {
    return [
      {
        source: '/research/cdr-verification/biomass-carbon-removal-and-storage',
        destination: '/research/cdr-verification/biomaterial-injection',
        permanent: true,
      },
      {
        source:
          '/research/cdr-verification/biomass-carbon-removal-and-storage/1.0',
        destination: '/research/cdr-verification/biomaterial-injection/1.0',
        permanent: true,
      },
      {
        source:
          '/research/cdr-verification/docs/pathways/biomass-carbon-removal-and-storage',
        destination:
          '/research/cdr-verification/docs/pathways/biomaterial-injection',
        permanent: true,
      },
    ]
  },
})
