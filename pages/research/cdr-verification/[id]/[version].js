import Main from '../../../../components/main'
import { pathways, pathwayContent } from '../../../../utils/data'

const Pathway = (props) => {
  return <Main {...props} />
}

export function getStaticProps({ params: { id, version } }) {
  const latestVersion = pathways.find((p) => p.pathway_id === id).version
  return {
    props: {
      pathway: pathwayContent[id][version],
      pathways,
      archival: latestVersion !== version,
    },
  }
}

export function getStaticPaths() {
  return {
    paths: pathways
      .map((p) =>
        pathwayContent[p.pathway_id].metadata.revisions.map(({ version }) => ({
          params: { id: p.pathway_id, version },
        }))
      )
      .flat(),
    fallback: false,
  }
}
export default Pathway
