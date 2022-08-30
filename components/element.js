import { Box, Divider, Flex } from 'theme-ui'
import { useEffect, useRef } from 'react'
import { Badge, Expander, Row, Column } from '@carbonplan/components'
import Circle from './circle'
import Uncertainty from './uncertainty'
import Tooltip from './tooltip'
import { CATEGORY_COLORS } from './constants'
import { useElement } from './context/element'

import legend from '../data/legend.json'

const tooltips = {
  uncertainty_magnitude: legend.find((d) => d.key === 'uncertainty_magnitude')
    .description,
  uncertainty_type: legend.find((d) => d.key === 'uncertainty_type')
    .description,
  responsibility: legend.find((d) => d.key === 'responsibility').description,
}

const Element = ({
  category,
  comments,
  element,
  description,
  uncertainty_type,
  uncertainty_magnitude_min,
  uncertainty_magnitude_max,
  responsibility,
}) => {
  const { active, hovered, setActive, setHovered } = useElement(element)
  const el = useRef(null)

  useEffect(() => {
    if (active && el.current) {
      el.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [active])

  const sx = {
    heading: {
      color: CATEGORY_COLORS[category],
      letterSpacing: 'smallcaps',
      textTransform: 'uppercase',
      // mb: 2,
    },
    badge: { textTransform: 'capitalize' },
    column: { mb: 3 },
  }

  return (
    <Box
      ref={el}
      sx={{ my: [4, 3, 4, 4], cursor: 'pointer' }}
      onClick={() => !active && setActive()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Row columns={[6, 7, 4, 4]}>
        <Column start={1} width={[4, 7, 3, 3]}>
          <Flex
            sx={{
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Circle id={element} category={category} sx={{ flexShrink: 0 }} />
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
              onClick={() => active && setActive(null)}
              sx={{
                display: ['initial', 'none'],
                verticalAlign: 'middle',
                zIndex: 1,
                stroke: hovered ? 'primary' : 'secondary',
              }}
            />
          </Flex>
          <Expander
            value={active}
            onClick={() => active && setActive(null)}
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
          <Row columns={[6, 7, 4, 4]}>
            <Column sx={sx.column} start={1} width={[6, 7, 4, 4]}>
              <Tooltip tooltip={tooltips.uncertainty_type} sx={{ mb: 2 }}>
                <Box sx={sx.heading}>Uncertainty magnitude</Box>
              </Tooltip>

              <Row columns={[6, 7, 4, 4]}>
                <Column start={1} width={1}>
                  <Uncertainty
                    min={uncertainty_magnitude_min}
                    max={uncertainty_magnitude_max}
                    flexShrink={0.5}
                    color={CATEGORY_COLORS[category]}
                  />
                </Column>
                <Column start={2} width={[5, 6, 3, 3]}>
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
            <Column sx={sx.column} start={1} width={[6, 7, 4, 2]}>
              <Tooltip tooltip={tooltips.uncertainty_type} sx={{ mb: 2 }}>
                <Box sx={sx.heading}>Uncertainty type</Box>
              </Tooltip>
              <Badge sx={sx.badge}>{uncertainty_type}</Badge>
            </Column>
            <Column sx={sx.column} start={[1, 1, 1, 3]} width={[6, 7, 4, 2]}>
              <Tooltip tooltip={tooltips.responsibility}>
                <Box sx={sx.heading}>Uncertainty responsibility</Box>
              </Tooltip>
              <Badge sx={sx.badge}>{responsibility}</Badge>
            </Column>
            <Column sx={sx.column} start={1} width={[6, 7, 4, 4]}>
              <Box sx={sx.heading}>Notes</Box>
              <Box sx={{ fontFamily: 'faux' }}>{comments}</Box>
            </Column>
          </Row>

          <Divider />
        </Box>
      ) : null}
    </Box>
  )
}

export default Element
