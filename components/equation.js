import { Box, Flex } from 'theme-ui'

import { useElementContext } from './context/element'
import Circle from './circle'
import { CATEGORY_COLORS } from './constants'

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
  equationElement: {
    fontSize: [1, 1, 1, 2],
    display: 'inline-block',
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
    const element = elements.find((el) => el.number === equationElements[i])
    if (element) {
      accum.push(
        <Circle
          key={element.number}
          id={element.number}
          onClick={() =>
            setActive((prev) =>
              prev === element.number ? null : element.number
            )
          }
          onMouseEnter={() => setHovered(element.number)}
          onMouseLeave={() => setHovered(null)}
          sx={{ cursor: 'pointer', mr: '1px' }}
        />
      )
    }

    return accum
  }, [])

  return (
    <Box sx={{ fontFamily: 'mono', letterSpacing: 'mono' }}>
      <Flex sx={{ gap: [3, 3] }}>
        <Box
          sx={{
            ...sx.equationElement,
            whiteSpace: ['normal', 'nowrap'],
            flexShrink: [1, 0],
          }}
        >
          Total Carbon Removal
          <Box as='span' sx={sx.subscript}>
            CO₂e
          </Box>
        </Box>

        <Box>
          <Box sx={sx.equationElement}>
            <Box as='span' sx={{ mr: 3 }}>
              =
            </Box>
            <Box as='span' sx={{ color: CATEGORY_COLORS.drawdown }}>
              Drawdown
            </Box>
            <Box as='span' sx={sx.subscript}>
              CO₂e
            </Box>{' '}
            -{' '}
            <Box as='span' sx={{ color: CATEGORY_COLORS.emissions }}>
              Emissions
            </Box>
            <Box as='span' sx={sx.subscript}>
              CO₂e
            </Box>
          </Box>
          <Flex sx={{ mt: 3, gap: 3 }}>
            <Box>=</Box>
            <Flex sx={{ gap: [1, 1, 1, 2], flexWrap: 'wrap' }}>
              {interleaved.map((d, i) => (
                <Box key={i} sx={{ flexShrink: 0 }}>
                  {d}
                </Box>
              ))}
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

export default Equation
