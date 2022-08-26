import { Box, Flex } from 'theme-ui'
import { Select, Badge } from '@carbonplan/components'

import { DATA } from './constants'
import Equation from './equation'

const PathwayInfo = ({ pathway, setPathway }) => {
  const { pathway_description, VCL, equation, elements } = DATA[pathway]

  return (
    <Flex sx={{ gap: 3, flexDirection: 'column' }}>
      <Select
        size='md'
        value={pathway}
        onChange={(e) => setPathway(e.target.value)}
      >
        <option value='oae'>{DATA.oae.pathway_name}</option>
        <option value='seaweed'>{DATA.seaweed.pathway_name}</option>
        <option value='ew'>{DATA.ew.pathway_name}</option>
      </Select>
      <Flex sx={{ gap: 3 }}>
        <Badge>{VCL && VCL.find(Boolean) ? VCL.join(' - ') : 'X - X'}</Badge>
        <Box sx={{ color: 'secondary' }}>
          Verification Confidence Level (VCL)
        </Box>
      </Flex>
      <Box>{pathway_description}</Box>

      <Equation equation={equation} elements={elements} />
    </Flex>
  )
}

export default PathwayInfo
