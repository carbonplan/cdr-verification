import Main from '../../../components/main'
import { pathways } from '../../../utils/data'

const Pathway = (props) => {
  return <Main {...props} />
}

export function getStaticProps() {
  return { props: { pathways } }
}

export function getStaticPaths() {
  return {
    paths: pathways.map((p) => `/research/cdr-verification/${p.pathway_id}`),
    fallback: false,
  }
}
export default Pathway
