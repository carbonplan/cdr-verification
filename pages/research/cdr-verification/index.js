import Main from '../../../components/main'
import { pathways } from '../../../utils/data'

const Index = (props) => {
  return <Main {...props} />
}

export function getStaticProps() {
  return {
    props: {
      pathway: pathways.find((p) => p.pathway_id === 'direct-air-capture'),
      pathways,
    },
  }
}
export default Index
