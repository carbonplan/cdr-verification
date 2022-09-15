import { Box } from 'theme-ui'
import { Badge, Row, Column } from '@carbonplan/components'

import PathwaySelector from './pathway-selector'
import Equation from './equation'
import { TooltipContent, TooltipWrapper } from './tooltip'
import pathways from '../data/pathways.json'
import legend from '../data/legend.json'
import { useMemo, useState } from 'react'

const PathwayInfo = ({ pathway, setPathway }) => {
  const [expanded, setExpanded] = useState(false)
  const { pathway_description, VCL, equation, elements } = useMemo(
    () => pathways.find((p) => p.pathway_name === pathway),
    [pathway]
  )

  const formattedVCL = VCL[0] === VCL[1] ? VCL[0] : VCL.join('-')
  return (
    <Row columns={[6, 6, 7, 7]}>
      <Column start={1} width={[4, 4, 5, 4]} sx={{ mt: [0, 0, 0, '15px'] }}>
        <PathwaySelector
          size={33.3}
          pathway={pathway}
          setPathway={setPathway}
        />
      </Column>
      <Column
        start={[5, 5, 6, 5]}
        width={[2, 2, 2, 2]}
        sx={{ mt: [0, 0, 0, '15px'] }}
      >
        <TooltipWrapper
          expanded={expanded}
          setExpanded={setExpanded}
          align='center'
          mt='10px'
        >
          <Badge
            sx={{
              mt: ['0px', '0px', '0px', '1px'],
              mb: ['2px', '2px', '2px', '1px'],
              fontSize: 3,
              height: null,
              padding: 1,
              flexShrink: 0,
            }}
          >
            <Box as='span' sx={{ color: 'secondary' }}>
              VCL
            </Box>{' '}
            {formattedVCL}
          </Badge>
        </TooltipWrapper>
      </Column>
      <Column start={1} width={[6, 6, 6, 5]}>
        <TooltipContent expanded={expanded} sx={{ mt: 1 }}>
          {legend.vcl}
        </TooltipContent>
      </Column>
      <Column start={1} width={[6, 6, 6, 5]}>
        <Box sx={{ my: [3, 3, 3, 4], fontSize: [1] }}>
          {pathway_description}
        </Box>
      </Column>

      <Column start={1} width={[6, 6, 7, 7]}>
        <Equation equation={equation} elements={elements} />
      </Column>
    </Row>
  )
}

export default PathwayInfo
