import Main from '../../../components/main'
import { pathways } from '../../../utils/data'

const Index = (props) => {
  return <Main {...props} />
}

export function getStaticProps() {
  return { props: { pathways } }
}
export default Index
