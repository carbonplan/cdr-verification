import { Box, Flex } from 'theme-ui'
import { Row, Column } from '@carbonplan/components'

import { useElementContext } from './context/element'
import Circle from './circle'

const sx = {
  subscript: {
    display: 'inline',
    color: 'secondary',
    textTransform: 'none',
    position: 'relative',
    right: -1,
    top: 1,
    fontSize: '65%',
  },
  drawdown: {
    display: 'inline-block',
    color: 'teal',
    textTransform: 'uppercase',
  },
  emissions: {
    display: 'inline-block',
    color: 'yellow',
    textTransform: 'uppercase',
  },
}

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
    <Box sx={{ fontFamily: 'mono', letterSpacing: 'mono' }}>
      <Row columns={[6, 6, 7, 7]}>
        <Column start={1} width={[3, 3, 2, 2]} sx={{ mr: -20 }}>
          Total Carbon Removal<Box sx={sx.subscript}>CO₂e</Box>
        </Column>
        <Column start={[1, 1, 3, 3]} width={[6, 6, 5, 5]}>
          = <Box sx={sx.drawdown}>Drawdown</Box>
          <Box sx={sx.subscript}>CO₂e</Box> -{' '}
          <Box sx={sx.emissions}>Emissions</Box>
          <Box sx={sx.subscript}>CO₂e</Box>
        </Column>
        <Column start={[1, 1, 3, 3]} width={[6, 6, 5, 5]}>
          <Flex sx={{ gap: 2 }}>
            =
            {interleaved.map((d, i) => (
              <Box key={i}>{d}</Box>
            ))}
          </Flex>
        </Column>
      </Row>
    </Box>
  )
}

export default Equation
