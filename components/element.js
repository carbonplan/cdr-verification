import { Box, Divider, Flex } from 'theme-ui'
import { useCallback, useEffect, useRef } from 'react'
import { Badge, Button, Expander, Row, Column } from '@carbonplan/components'
import { RotatingArrow } from '@carbonplan/icons'
import AnimateHeight from 'react-animate-height'

import Circle from './circle'
import Uncertainty from './uncertainty'
import Tooltip from './tooltip'
import { CATEGORY_COLORS } from './constants'
import { useElement } from './context/element'
import legend from '../data/legend.json'

// Based on https://stackoverflow.com/questions/45408920/plain-javascript-scrollintoview-inside-div
function scrollParentToChild(parent, child) {
  // Where is the parent on page
  var parentRect = parent.getBoundingClientRect()
  // What can you see?
  var parentViewableArea = {
    height: parent.clientHeight,
    width: parent.clientWidth,
  }

  // Where is the child
  var childRect = child.getBoundingClientRect()
  // Is the child viewable?
  var isViewable =
    childRect.top >= parentRect.top &&
    childRect.bottom <= parentRect.top + parentViewableArea.height

  // if you can't see the child try to scroll parent
  if (!isViewable) {
    // Should we scroll using top or bottom? Find the smaller ABS adjustment
    const scrollTop = childRect.top - parentRect.top
    const scrollBot = childRect.bottom - parentRect.bottom
    if (Math.abs(scrollTop) < Math.abs(scrollBot)) {
      // we're near the top of the list
      parent.scrollTo({
        top: parent.scrollTop + scrollTop - 4,
        behavior: 'smooth',
      })
    } else {
      // we're near the bottom of the list
      parent.scrollTo({
        top: parent.scrollTop + scrollBot - 4,
        behavior: 'smooth',
      })
    }
  }
}

const Element = ({
  category,
  comments,
  element,
  container,
  description,
  uncertainty_type,
  uncertainty_magnitude_min,
  uncertainty_magnitude_max,
  quantification_target,
  responsibility,
  openTray,
}) => {
  const { active, hovered, setActive, setHovered } = useElement(element)
  const el = useRef(null)
  const activated = useRef(false)

  const handleActivate = useCallback(
    (e) => {
      e.stopPropagation()

      if (!active) activated.current = true
      setActive()
    },
    [active]
  )

  useEffect(() => {
    if (container && active && el.current) {
      if (!activated.current) {
        setTimeout(() => {
          scrollParentToChild(container, el.current)
        }, 100)
      }
      activated.current = false
    }
  }, [container, active])

  const sx = {
    heading: {
      color: CATEGORY_COLORS[category],
      fontSize: [1, 1, 1, 2],
      fontFamily: 'mono',
      letterSpacing: 'mono',
      textTransform: 'uppercase',
      my: 1,
    },
    badge: {
      fontSize: 1,
      textTransform: 'capitalize',
      ml: -1,
    },
    column: { mb: 3 },
  }

  return (
    <Box ref={el} sx={{ my: [4, 3, 4, 4] }}>
      <Row
        columns={[6, 8, 4, 4]}
        onClick={handleActivate}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{ cursor: 'pointer' }}
      >
        <Column start={1} width={[4, 4, 3, 3]}>
          <Flex
            sx={{
              alignItems: 'flex-start',
              gap: 2,
            }}
          >
            <Circle id={element} sx={{ flexShrink: 0 }} />
            <Box>{description}</Box>
          </Flex>
        </Column>
        <Column
          start={[5, 6, 4, 4]}
          width={[2, 1]}
          sx={{ position: 'relative' }}
        >
          <Flex sx={{ gap: [1, 2] }}>
            <Uncertainty
              min={uncertainty_magnitude_min}
              max={uncertainty_magnitude_max}
              flexShrink={0.5}
              color={CATEGORY_COLORS[category]}
            />
            <Expander
              value={active}
              onClick={handleActivate}
              sx={{
                display: ['initial', 'none'],
                verticalAlign: 'middle',
                zIndex: 1,
                stroke: hovered ? 'primary' : 'secondary',
                flexShrink: 0,
                pl: ['12px', '10px', '10px', '8px'],
                pr: 0,
              }}
            />
          </Flex>
          <Box
            sx={{
              display: ['none', 'initial'],
              right: [-4, -5, -5, -6],
              width: ['24px', '32px', '32px', '48px'],
              top: 0,
              position: 'absolute',
              height: '100%',
            }}
          />
          <Expander
            value={active}
            onClick={handleActivate}
            sx={{
              display: ['none', 'initial'],
              verticalAlign: 'middle',
              zIndex: 1,
              stroke: hovered ? 'primary' : 'secondary',
              position: 'absolute',
              pl: ['12px', '10px', '10px', '8px'],
              pr: 0,
              right: [-4, -5, -5, -6],
              top: 0,
            }}
          />
        </Column>
      </Row>

      <Box sx={{ ml: -1 }}>
        <AnimateHeight
          duration={100}
          height={active ? 'auto' : 0}
          easing={'linear'}
        >
          <Box sx={{ mt: 2, pl: 1 }}>
            <Row columns={[6, 8, 4, 4]} sx={{ fontSize: 1 }}>
              <Column
                sx={{ ...sx.column, mt: 3 }}
                start={1}
                width={[6, 6, 4, 4]}
              >
                <Tooltip tooltip={legend.quantification_target} mt='10px'>
                  <Box sx={sx.heading}>Quantification target</Box>
                </Tooltip>
                <Box
                  sx={{
                    fontFamily: 'faux',
                    '&::first-letter': { textTransform: 'uppercase' },
                  }}
                >
                  {quantification_target}
                </Box>
              </Column>

              <Column sx={{ mb: 2 }} start={1} width={[6, 6, 4, 4]}>
                <Box sx={{ ...sx.heading, mb: 0 }}>Uncertainty</Box>
              </Column>

              <Column sx={{ mb: 2 }} start={1} width={[3, 3, 2, 2]}>
                <Tooltip
                  tooltip={
                    <Box sx={{ mb: 2 }}>{legend.uncertainty_magnitude}</Box>
                  }
                  mt='10px'
                >
                  <Box sx={{ ...sx.heading, color: 'secondary' }}>
                    Magnitude
                  </Box>
                </Tooltip>
                <Box>
                  {uncertainty_magnitude_min !== uncertainty_magnitude_max ? (
                    <Flex sx={{ gap: 2 }}>
                      <Badge sx={sx.badge}>{uncertainty_magnitude_min}</Badge>
                      to
                      <Badge sx={{ ...sx.badge, ml: 0 }}>
                        {uncertainty_magnitude_max}
                      </Badge>
                    </Flex>
                  ) : (
                    <Badge sx={sx.badge}>{uncertainty_magnitude_min}</Badge>
                  )}
                </Box>
              </Column>

              <Column sx={{ mb: 2 }} start={[4, 4, 3, 3]} width={[3, 3, 2, 2]}>
                <Tooltip
                  tooltip={<Box sx={{ mb: 2 }}>{legend.uncertainty_type}</Box>}
                  mt='10px'
                >
                  <Box sx={{ ...sx.heading, color: 'secondary' }}>Type</Box>
                </Tooltip>
                <Flex sx={{ gap: 2 }}>
                  {uncertainty_type.map((d) => (
                    <Badge key={d} sx={sx.badge}>
                      {d}
                    </Badge>
                  ))}
                </Flex>
              </Column>

              <Column sx={sx.column} start={1} width={[6, 8, 2, 2]}>
                <Tooltip
                  tooltip={<Box sx={{ mb: 2 }}>{legend.responsibility}</Box>}
                  mt='10px'
                >
                  <Box sx={{ ...sx.heading, color: 'secondary' }}>
                    Responsibility
                  </Box>
                </Tooltip>
                <Badge sx={sx.badge}>{responsibility}</Badge>
              </Column>

              <Column sx={sx.column} start={1} width={[6, 6, 4, 4]}>
                <Box sx={sx.heading}>Included in accounting</Box>
                <Badge sx={sx.badge}>
                  {element.includes('*') ||
                  !['drawdown', 'emissions'].includes(category)
                    ? 'No'
                    : 'Yes'}
                </Badge>
              </Column>

              <Column sx={sx.column} start={1} width={[6, 6, 4, 4]}>
                <Box sx={sx.heading}>Notes</Box>
                <Box sx={{ fontFamily: 'faux' }}>{comments}</Box>
              </Column>

              <Column
                start={1}
                width={[6, 6, 4, 4]}
                sx={{
                  ...sx.column,
                  display: ['initial', 'initial', 'none', 'none'],
                }}
              >
                <Button
                  sx={{ color: CATEGORY_COLORS[category] }}
                  onClick={openTray}
                  suffix={<RotatingArrow />}
                >
                  View in diagram
                </Button>
              </Column>
            </Row>
          </Box>
        </AnimateHeight>
      </Box>
    </Box>
  )
}

export default Element
