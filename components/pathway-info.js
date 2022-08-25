import { Box, Flex } from 'theme-ui'
import { Select, Badge } from '@carbonplan/components'

import { DATA } from './constants'
import { useElementContext } from './context/element'
import Circle from './circle'

const Equation = ({ equation, elements }) => {
  const extras = equation.split(/[\d|\*]+/).map((s) => s.trim())
  const equationElements = equation.match(/[\d|\*]+/g)
  const { setActive, setHovered } = useElementContext()

  const interleaved = extras.reduce((accum, extra, i) => {
    accum.push(...extra.split(''))
    const element = elements.find((el) => el.element === equationElements[i])
    if (element) {
      accum.push(
        <Circle
          key={element.element}
          id={element.element}
          category={element.category}
          onClick={() =>
            setActive((prev) =>
              prev === element.element ? null : element.element
            )
          }
          onMouseEnter={() => setHovered(element.element)}
          onMouseLeave={() => setHovered(null)}
          sx={{ cursor: 'pointer' }}
        />
      )
    }

    return accum
  }, [])

  return (
    <Flex sx={{ gap: 2 }}>
      {interleaved.map((d, i) => (
        <Box key={i}>{d}</Box>
      ))}
    </Flex>
  )
}

const PathwayInfo = ({ pathway, setPathway }) => {
  const { pathway_description, VCL, equation, elements } = DATA[pathway]
  const { setActive, setHovered } = useElementContext()

  return (
    <Flex sx={{ gap: 3, flexDirection: 'column' }}>
      <Select
        size='md'
        value={pathway}
        onChange={(e) => {
          setPathway(e.target.value)
          setActive(null)
          setHovered(null)
        }}
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
