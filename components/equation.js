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
    fontSize: [1, 1, 1, 2],
    display: 'inline-block',
    color: 'teal',
    textTransform: 'uppercase',
  },
  emissions: {
    fontSize: [1, 1, 1, 2],
    display: 'inline-block',
    color: 'yellow',
    textTransform: 'uppercase',
  },
}

const Equation = ({ equation, elements }) => {
  const extras = equation.split(/[\d|\*]+/).map((s) => s.trim())
  const equationElements = equation.match(/[\d|\*]+/g)
  const { setActive, setHovered } = useElementContext()

  if (!equationElements) {
    return (
      <Box
        sx={{
          color: 'secondary',
          fontFamily: 'mono',
          letterSpacing: 'mono',
          textTransform: 'uppercase',
        }}
      >
        Missing equation
      </Box>
    )
  }

  const interleaved = extras.reduce((accum, extra, i) => {
    accum.push(...extra.split('').filter((d) => d.match(/\S/g)))
    const element = elements.find((el) => el.element === equationElements[i])
    if (element) {
      accum.push(
        <Circle
          key={element.element}
          id={element.element}
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
      <Flex sx={{ gap: [3, 3] }}>
        <Box as='span'>
          Total Carbon Removal
          <Box as='span' sx={sx.subscript}>
            CO₂e
          </Box>
        </Box>

        <Box>
          <Box>=</Box>
          <Box sx={{ mt: 3 }}>=</Box>
        </Box>

        <Box>
          <Box>
            <Box sx={sx.drawdown}>Drawdown</Box>
            <Box sx={sx.subscript}>CO₂e</Box> -{' '}
            <Box sx={sx.emissions}>Emissions</Box>
            <Box sx={sx.subscript}>CO₂e</Box>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Flex sx={{ gap: [1, 1, 1, 2], flexWrap: 'wrap' }}>
              {interleaved.map((d, i) => (
                <Box key={i} sx={{ flexShrink: 0 }}>
                  {d}
                </Box>
              ))}
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default Equation
