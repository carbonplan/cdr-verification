import Main from '../../../components/main'

import pathways from '../../../data/pathways.json'

export default Main

export const getStaticPaths = async () => {
  const paths = pathways.map((p) => ({ params: { id: p.pathway_id } }))

  return { paths: [...paths], fallback: false }
}

export const getStaticProps = async ({ params }) => {
  const pathway = pathways.find((p) => p.pathway_id === params.id)

  return { props: { pathway: pathway } }
}
