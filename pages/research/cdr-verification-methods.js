import { Supplement } from '@carbonplan/layouts'
import { MDXProvider, useMDXComponents } from '@mdx-js/react'
import { useThemedStylesWithMdx } from '@theme-ui/mdx'
import Methods, { frontMatter } from '../../components/methods'
import contributors from '../../data/contributors.json'
import { pathways } from '../../utils/data'

export default (props) => {
  const componentsWithStyles = useThemedStylesWithMdx(useMDXComponents())

  return (
    <MDXProvider components={componentsWithStyles}>
      <Supplement meta={frontMatter} back={frontMatter.back}>
        <Methods contributors={props.contributors} pathways={props.pathways} />
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
  const combinedContributors = contributors.reduce(
    (accum, { type, ...rest }) => {
      accum[categories[type]].push(rest)
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
    props: { contributors: combinedContributors, pathways },
  }
}
