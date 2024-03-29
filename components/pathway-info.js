import { Box, Flex } from 'theme-ui'
import { Badge, Row, Column } from '@carbonplan/components'
import { useState } from 'react'

import PathwaySelector from './pathway-selector'
import Equation from './equation'
import { TooltipContent, TooltipWrapper } from './tooltip'
import Description from './description'
import legend from '../data/legend.json'

const PathwayInfo = ({ pathways, pathway, setPathway }) => {
  const [expanded, setExpanded] = useState(false)
  const {
    pathway_description,
    pathway_id,
    VCL,
    equation,
    components,
    version,
  } = pathway

  const formattedVCL = VCL[0] === VCL[1] ? VCL[0] : VCL.join('-')
  return (
    <Row columns={[6, 6, 7, 7]}>
      <Column start={1} width={[4, 4, 6, 5]} sx={{ mt: [0, 0, 0, '15px'] }}>
        <TooltipWrapper
          expanded={expanded}
          setExpanded={setExpanded}
          align='flex-start'
          mt='16px'
        >
          <Flex sx={{ gap: 5, alignItems: 'flex-start' }}>
            <PathwaySelector
              size='lg'
              pathways={pathways}
              pathway={pathway_id}
              version={version}
              setPathway={setPathway}
            />
            <Box
              sx={{
                flexShrink: 0,
                fontFamily: 'mono',
                letterSpacing: 'mono',
                mt: '6.5px',
                mr: 1,
                fontSize: [2, 2, 3, 3],
              }}
            >
              <Box as='span' sx={{ color: 'secondary' }}>
                VCL
              </Box>{' '}
              <Badge>{formattedVCL}</Badge>
            </Box>
          </Flex>
        </TooltipWrapper>
      </Column>
      <Column start={1} width={[6, 6, 6, 5]}>
        <TooltipContent expanded={expanded} sx={{ mt: 1 }}>
          {legend.vcl}
        </TooltipContent>
      </Column>
      <Column start={1} width={[6, 6, 6, 5]}>
        <Description
          value={`${pathway_description} [View pathway documentation](${`/research/cdr-verification/docs/pathways/${pathway_id}`}).`}
          sx={{ my: [3, 3, 3, 4], fontSize: [1] }}
        />
      </Column>

      <Column start={1} width={[6, 6, 7, 7]}>
        <Equation equation={equation} components={components} />
      </Column>
    </Row>
  )
}

export default PathwayInfo
