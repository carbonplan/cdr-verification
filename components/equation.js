import { Box, Flex } from 'theme-ui'

import { useComponent } from './context/component'
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
  equationComponent: {
    fontSize: [1, 1, 1, 2],
    display: 'inline-block',
    textTransform: 'uppercase',
  },
}

const ComponentCircle = ({ component_id }) => {
  const { onClick, setHovered } = useComponent(component_id)
  return (
    <Circle
      component_id={component_id}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{ cursor: 'pointer', mr: '1px' }}
    />
  )
}

const Equation = ({ equation, components }) => {
  const extras = equation.split(/[\d|\*]+/).map((s) => s.trim())
  const equationComponents = equation.match(/[\d|\*]+/g)

  if (!equationComponents) {
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
    const component = components.find(
      (el) => el.number === equationComponents[i]
    )
    if (component) {
      accum.push(
        <ComponentCircle
          key={component.component_id}
          component_id={component.component_id}
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
            ...sx.equationComponent,
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
          <Box sx={sx.equationComponent}>
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
            <Box sx={sx.equationComponent}>=</Box>
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
