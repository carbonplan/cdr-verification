import Main from '../../../components/main'
import { pathways } from '../../../utils/data'

const Index = (props) => {
  return <Main {...props} />
}

export function getStaticProps() {
  return { props: { pathway: pathways[0], pathways } }
}
export default Index
