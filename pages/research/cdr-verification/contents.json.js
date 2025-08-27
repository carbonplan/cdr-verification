import { pathways } from '../../../utils/data'

function Contents() {
  // getServerSideProps will do the heavy lifting
}

export function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'application/json')

  const contents = pathways.map(
    ({ pathway_id, pathway_name, pathway_description }) => ({
      page: `research/cdr-verification/${pathway_id}`,
      metadata: {
        type: 'tool',
        title: pathway_name,
        summary: pathway_description,
      },
    })
  )

  res.write(JSON.stringify(contents))
  res.end()

  return {
    props: {},
  }
}

export default Contents
