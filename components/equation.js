import React, { useCallback, useState } from 'react'
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
  const [width, setWidth] = useState(null)
  const extras = equation.split(/[\d|\*]+/).map((s) => s.trim())
  const equationElements = equation.match(/[\d|\*]+/g)
  const { setActive, setHovered } = useElementContext()
  const ref = useCallback((node) => {
    if (node && !width) {
      const resetWidth = () => {
        setWidth(node.getBoundingClientRect().width)
      }
      resetWidth()
      window.addEventListener('resize', resetWidth)
    }
  }, [])

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

  const durabilityElements = elements.filter(
    (el) => el.category === 'durability'
  )

  return (
    <Box sx={{ fontFamily: 'mono', letterSpacing: 'mono' }}>
      <Flex sx={{ gap: [3, 3] }}>
        <Box
          ref={ref}
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

      <Flex sx={{ gap: [3, 3], mt: 5 }}>
        <Box
          sx={{
            ...sx.equationElement,
            flexShrink: [0, 1],
            width,
          }}
        >
          Durability
          <Box as='span' sx={sx.subscript}>
            years
          </Box>
        </Box>

        <Flex sx={{ gap: 3 }}>
          <Box sx={sx.equationElement}>=</Box>
          <Flex
            sx={{
              ...sx.equationElement,
              textTransform: 'none',
              gap: [1, 1, 1, 2],
              flexWrap: 'wrap',
            }}
          >
            f(
            {durabilityElements.map((el, i) => (
              <React.Fragment key={el.element}>
                <Circle
                  id={el.element}
                  onClick={() =>
                    setActive((prev) =>
                      prev === el.element ? null : el.element
                    )
                  }
                  onMouseEnter={() => setHovered(el.element)}
                  onMouseLeave={() => setHovered(null)}
                  sx={{ cursor: 'pointer' }}
                />
                {i < durabilityElements.length - 1 ? ',' : null}
              </React.Fragment>
            ))}
            )
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Equation
