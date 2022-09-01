import { Box, Divider, Flex } from 'theme-ui'
import { useCallback, useEffect, useRef } from 'react'
import { Badge, Button, Expander, Row, Column } from '@carbonplan/components'
import { RotatingArrow } from '@carbonplan/icons'

import Circle from './circle'
import Uncertainty from './uncertainty'
import Tooltip from './tooltip'
import { CATEGORY_COLORS } from './constants'
import { useElement } from './context/element'
import legend from '../data/legend.json'

const Element = ({
  category,
  comments,
  element,
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
    if (active && el.current) {
      if (!activated.current) {
        el.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      activated.current = false
    }
  }, [active])

  const sx = {
    heading: {
      color: CATEGORY_COLORS[category],
      letterSpacing: 'smallcaps',
      textTransform: 'uppercase',
      mb: 1,
    },
    badge: { textTransform: 'capitalize' },
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
        <Column start={1} width={[4, 8, 3, 3]}>
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
              }}
            />
          </Flex>
          <Expander
            value={active}
            onClick={handleActivate}
            sx={{
              display: ['none', 'initial'],
              verticalAlign: 'middle',
              zIndex: 1,
              stroke: hovered ? 'primary' : 'secondary',
              position: 'absolute',
              right: [-4, -5, -5, -6],
              top: 0,
            }}
          />
        </Column>
      </Row>

      {active ? (
        <Box>
          <Divider />
          <Row columns={[6, 8, 4, 4]}>
            <Column sx={sx.column} start={1} width={[6, 8, 4, 4]}>
              <Tooltip tooltip={legend.uncertainty_magnitude} sx={{ mb: 2 }}>
                <Box sx={sx.heading}>Uncertainty magnitude</Box>
              </Tooltip>

              <Row columns={[6, 8, 4, 4]}>
                <Column start={1} width={[2, 1]}>
                  <Uncertainty
                    min={uncertainty_magnitude_min}
                    max={uncertainty_magnitude_max}
                    flexShrink={0.5}
                    color={CATEGORY_COLORS[category]}
                    sx={{ pr: [28, 0] }}
                  />
                </Column>
                <Column start={[3, 2]} width={[3, 6, 3, 3]}>
                  <Badge sx={sx.badge}>{uncertainty_magnitude_min}</Badge>
                  {uncertainty_magnitude_min !== uncertainty_magnitude_max ? (
                    <>
                      {' '}
                      to{' '}
                      <Badge sx={sx.badge}>{uncertainty_magnitude_max}</Badge>
                    </>
                  ) : null}
                </Column>
              </Row>
            </Column>
            <Column sx={sx.column} start={1} width={[6, 3, 4, 2]}>
              <Tooltip tooltip={legend.uncertainty_type} sx={{ mb: 2 }}>
                <Box sx={sx.heading}>Uncertainty type</Box>
              </Tooltip>
              <Flex sx={{ gap: 2 }}>
                {uncertainty_type.map((d) => (
                  <Badge key={d} sx={sx.badge}>
                    {d}
                  </Badge>
                ))}
              </Flex>
            </Column>
            <Column sx={sx.column} start={[1, 4, 1, 3]} width={[6, 4, 4, 2]}>
              <Tooltip tooltip={legend.responsibility}>
                <Box sx={sx.heading}>Uncertainty responsibility</Box>
              </Tooltip>
              <Badge sx={sx.badge}>{responsibility}</Badge>
            </Column>
            <Column sx={sx.column} start={1} width={[6, 6, 4, 4]}>
              <Box sx={sx.heading}>Quantification target</Box>
              <Box sx={{ fontFamily: 'faux' }}>{quantification_target}</Box>
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

          <Divider />
        </Box>
      ) : null}
    </Box>
  )
}

export default Element
