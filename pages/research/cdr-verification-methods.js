import { Supplement } from '@carbonplan/layouts'
import { MDXProvider, useMDXComponents } from '@mdx-js/react'
import Methods, { frontMatter } from '../../components/methods'
import { pathwayContent } from '../../utils/data'

export default ({ contributors }) => {
  const componentsWithStyles = useMDXComponents()
  return (
    <MDXProvider components={componentsWithStyles}>
      <Supplement meta={frontMatter} back={frontMatter.back}>
        <Methods contributors={contributors} />
      </Supplement>
    </MDXProvider>
  )
}

export function getStaticProps() {
  const categories = {
    'CDR Company': 'CDR Companies',
    'Scientific Expert': 'Scientific Experts',
    'Ecosystem Actor': 'Ecosystem Actors',
    'MRV Company': 'MRV Companies',
  }
  const combinedContributors = Object.keys(pathwayContent).reduce(
    (accum, pathwayId) => {
      const { metadata } = pathwayContent[pathwayId]
      metadata.contributors.forEach(({ type, ...rest }) => {
        accum[categories[type]].push(rest)
      })
      return accum
    },
    {
      'CDR Companies': [],
      'Scientific Experts': [],
      'Ecosystem Actors': [],
      'MRV Companies': [],
    }
  )
  return {
    props: { contributors: combinedContributors },
  }
}
