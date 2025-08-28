import { ID_MAPPING, pathwayContent, pathways } from '../../../utils/data'

function Contents() {
  // getServerSideProps will do the heavy lifting
}

export function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'application/json')

  const contents = pathways.map(
    ({ pathway_id, pathway_name, pathway_description }) => ({
      page: `research/cdr-verification/${pathway_id}`,
      date: pathwayContent[pathway_id].metadata.revisions.sort(
        (a, b) => Number(b.version) - Number(a.version)
      )[0].date,
      metadata: {
        type: 'tool',
        title: pathway_name,
        summary: pathway_description,
      },
    })
  )

  res.write(JSON.stringify({ ID_MAPPING, pathwayContent, pathways }))
  res.end()

  return {
    props: {},
  }
}

export default Contents
