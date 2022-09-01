import { Box, Flex } from 'theme-ui'
import { Badge, Row, Column } from '@carbonplan/components'

import PathwaySelector from './pathway-selector'
import Equation from './equation'
import pathways from '../data/pathways.json'
import { useMemo } from 'react'

const PathwayInfo = ({ pathway, setPathway, size = 'sm' }) => {
  const { pathway_description, VCL, equation, elements } = useMemo(
    () => pathways.find((p) => p.pathway_name === pathway),
    [pathway]
  )

  const formattedVCL = VCL[0] === VCL[1] ? VCL[0] : VCL.join(' - ')
  return (
    <Row columns={[6, 6, 7, 7]}>
      <Column start={1} width={[6, 6, 7, 7]}>
        <Flex sx={{ gap: [3, 3, 3, 4] }}>
          <PathwaySelector
            size={size}
            pathway={pathway}
            setPathway={setPathway}
          />
          <Badge
            sx={{
              mt: '12px',
              mr:
                formattedVCL.length === 1
                  ? ['41px', '41px', '41px', '55px']
                  : 0,
              fontSize: [3, 3, 3, 4],
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
        </Flex>
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
