import { Badge, Column, Row } from '@carbonplan/components'
import { useRouter } from 'next/router'
import { useCallback, useMemo, useState } from 'react'
import { Box } from 'theme-ui'

import Description from '../../../../../components/description'
import Documentation from '../../../../../components/documentation'
import Select from '../../../../../components/select'
import History from '../../../../../components/history'
import {
  TooltipWrapper,
  TooltipContent,
} from '../../../../../components/tooltip'
import { pathways, pathwayContent } from '../../../../../utils/data'
import legend from '../../../../../data/legend.json'
import Contributors from '../../../../../components/contributors'

const PathwayDocumentation = ({ options, pathway, metadata }) => {
  const { pathway_id, pathway_description, VCL } = pathway
  const { contributors, revisions } = metadata
  const [expanded, setExpanded] = useState(false)
  const router = useRouter()
  const setPathway = useCallback((pathway_id) => {
    router.replace(`/research/cdr-verification/docs/pathways/${pathway_id}`)
  })

  // Only map the latest version to the active pathway route
  const versionRoutes = useMemo(() => {
    const sorted = revisions.sort(
      (a, b) => Number(b.version) - Number(a.version)
    )
    return revisions.reduce((accum, { version }) => {
      accum[version] = `/research/cdr-verification/${pathway_id}/${
        sorted[0].version === version ? '' : version
      }`
      return accum
    }, {})
  }, [pathway_id, revisions])

  return (
    <Documentation
      label='Pathway'
      back={`/research/cdr-verification/${pathway_id}`}
    >
      <Row columns={[6, 8, 7, 7]}>
        <Column start={1} width={[4, 4, 4, 4]}>
          <Select
            value={pathway_id}
            options={options}
            onChange={setPathway}
            size={['sm', 'sm', 'lg', 'lg']}
          />
        </Column>
        <Column start={[5, 6, 6, 6]} width={[2]}>
          <TooltipWrapper
            expanded={expanded}
            setExpanded={setExpanded}
            align='center'
            mt='10px'
          >
            <Box
              sx={{
                flexShrink: 0,
                fontFamily: 'mono',
                letterSpacing: 'mono',
              }}
            >
              <Box as='span' sx={{ color: 'secondary' }}>
                VCL
              </Box>{' '}
              <Badge>{VCL[0] === VCL[1] ? VCL[0] : VCL.join('-')}</Badge>
            </Box>
          </TooltipWrapper>
        </Column>

        <Column start={1} width={[6, 8, 7, 7]}>
          <TooltipContent expanded={expanded} sx={{ mt: 1 }}>
            <Box>{legend.vcl}</Box>
          </TooltipContent>
        </Column>

        <Column
          start={1}
          width={[6, 8, 6, 6]}
          sx={{ mt: [3, 3, 3, 4], fontSize: [1] }}
        >
          <Description value={pathway_description} />
        </Column>

        <Column start={1} width={[6, 6, 4, 4]} sx={{ mt: [5, 5, 6, 6] }}>
          <Box sx={{ fontSize: 4 }}>Version history</Box>

          <History
            history={revisions}
            versionRoutes={versionRoutes}
            sx={{ mt: 3 }}
          />
        </Column>

        {contributors.length > 0 && (
          <Column start={1} width={[6, 6, 6, 6]} sx={{ my: [4, 4, 6, 6] }}>
            <Box sx={{ fontSize: 4 }}>Acknowledgments</Box>
            <Box sx={{ fontSize: 1, mt: 2 }}>
              This framework has been shaped by input and feedback from external
              experts, including CDR companies, scientists, and other CDR
              ecosystem actors. Any remaining mistakes or mischaracterizations
              are the authors’ sole responsibility.
            </Box>
            <Contributors contributors={contributors} sx={{ mt: 3 }} />
          </Column>
        )}
      </Row>
    </Documentation>
  )
}

export function getStaticProps({ params: { id } }) {
  return {
    props: {
      options: pathways
        .map((p) => ({
          value: p.pathway_id,
          label: p.pathway_name,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
      pathway: pathways.find((p) => p.pathway_id === id),
      metadata: pathwayContent[id].metadata,
    },
  }
}

export function getStaticPaths() {
  return {
    paths: pathways.map((p) => ({ params: { id: p.pathway_id } })),
    fallback: false,
  }
}

export default PathwayDocumentation
