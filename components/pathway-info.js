import { Box } from 'theme-ui'
import { Badge, Row, Column } from '@carbonplan/components'

import PathwaySelector from './pathway-selector'
import { DATA } from './constants'
import Equation from './equation'
import Tooltip from './tooltip'
import legend from '../data/legend.json'

const PathwayInfo = ({ pathway, setPathway, size = 'sm' }) => {
  const { pathway_description, VCL, equation, elements } = DATA[pathway]

  return (
    <Row columns={[6, 6, 7, 7]}>
      <Column start={1} width={[5]}>
        <PathwaySelector size={size} value={pathway} setPathway={setPathway} />
        <Box sx={{}}>{pathway_description}</Box>
      </Column>
      <Column start={[6]} width={[2]}>
        <Tooltip
          tooltip={legend.find((d) => d.key === 'VCL')?.description}
          align='center'
          mt='16px'
        >
          <Badge
            sx={{ mb: 2, fontSize: [3, 3, 3, 4], height: null, padding: 1 }}
          >
            {VCL && VCL.find(Boolean) ? VCL.join(' - ') : 'X - X'}
          </Badge>
        </Tooltip>
        <Box sx={{ fontSize: 1, color: 'secondary' }}>
          Verification Confidence Level (VCL)
        </Box>
      </Column>

      <Column start={1} width={[6, 6, 7, 7]}>
        <Equation equation={equation} elements={elements} />
      </Column>
    </Row>
  )
}

export default PathwayInfo
