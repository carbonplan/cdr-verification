import Main from '../../../components/main'
import { pathways } from '../../../utils/data'

const Pathway = (props) => {
  return <Main {...props} />
}

export function getStaticProps({ params: { id } }) {
  return {
    props: { pathway: pathways.find((p) => p.pathway_id === id), pathways },
  }
}

export function getStaticPaths() {
  return {
    paths: pathways.map((p) => ({ params: { id: p.pathway_id } })),
    fallback: false,
  }
}
export default Pathway
