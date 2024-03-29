import { Box, Flex } from 'theme-ui'
import React from 'react'
import {
  Badge,
  Button,
  Expander,
  Row,
  Column,
  Link,
} from '@carbonplan/components'
import { RotatingArrow } from '@carbonplan/icons'
import AnimateHeight from 'react-animate-height'
import { unified } from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import rehype2react from 'rehype-react'

import Circle from './circle'
import Uncertainty from './uncertainty'
import Tooltip from './tooltip'
import { CATEGORY_COLORS } from './constants'
import { useComponent } from './context/component'
import legend from '../data/legend.json'

const IMPACTS = {
  negligible: '(<1%)',
  low: '(1-5%)',
  medium: '(5-20%)',
  high: '(20-50%)',
  'very high': '(>50%)',
}

const processor = unified()
  .use(markdown)
  .use(remark2rehype)
  .use(rehype2react, {
    createElement: React.createElement,
    components: {
      p: (props) => <div {...props} />,
      a: Link,
    },
  })

const Component = ({
  category,
  number,
  name,
  component_id,
  description,
  uncertainty_type,
  uncertainty_impact_min,
  uncertainty_impact_max,
  quantification_target,
  responsibility,
  openTray,
  showDocs,
}) => {
  const { active, hovered, onClick, setHovered } = useComponent(component_id)

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
      pt: ['2px', '1px', '2px', '4px'],
      ml: -1,
    },
    column: { mb: 3 },
  }

  return (
    <Box sx={{ my: [4, 3, '22px', 4] }}>
      <Row
        columns={[6, 8, 4, 4]}
        onClick={onClick}
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
            <Circle
              component_id={component_id}
              sx={{ flexShrink: 0, mt: '-1px', ml: '-3px' }}
            />
            <Box sx={{ ml: '3px' }}>{name}</Box>
          </Flex>
        </Column>
        <Column
          start={[5, 6, 4, 4]}
          width={[2, 1]}
          sx={{ position: 'relative' }}
        >
          <Flex sx={{ gap: [1, 2] }}>
            <Uncertainty
              min={uncertainty_impact_min}
              max={uncertainty_impact_max}
              flexShrink={0.5}
              color={CATEGORY_COLORS[category]}
            />
            <Expander
              value={active}
              onClick={onClick}
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
            onClick={onClick}
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
          <Box sx={{ mt: -1, pl: 1 }}>
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

              <Column sx={{ mb: 2 }} start={1} width={[6, 6, 4, 4]}>
                <Tooltip
                  tooltip={
                    <Box sx={{ mb: 2 }}>{legend.uncertainty_impact}</Box>
                  }
                  mt='10px'
                >
                  <Box sx={{ ...sx.heading, color: 'secondary' }}>Impact</Box>
                </Tooltip>
                <Box>
                  {uncertainty_impact_min !== uncertainty_impact_max ? (
                    <Box sx={{ display: 'inline-block' }}>
                      <Flex sx={{ gap: 2 }}>
                        <Badge sx={sx.badge}>
                          {uncertainty_impact_min}{' '}
                          {IMPACTS[uncertainty_impact_min]}
                        </Badge>
                        <Box sx={{ mt: sx.badge.pt }}>to</Box>
                        <Badge sx={{ ...sx.badge, ml: 0 }}>
                          {uncertainty_impact_max}{' '}
                          {IMPACTS[uncertainty_impact_max]}
                        </Badge>
                      </Flex>
                    </Box>
                  ) : (
                    <Badge sx={sx.badge}>
                      {uncertainty_impact_min} {IMPACTS[uncertainty_impact_min]}
                    </Badge>
                  )}
                </Box>
              </Column>

              <Column sx={{ mb: 2 }} start={1} width={[6, 8, 2, 2]}>
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

              <Column sx={sx.column} start={[1, 1, 3, 3]} width={[6, 8, 2, 2]}>
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
                <Tooltip tooltip={legend.included_in_accounting} mt='10px'>
                  <Box sx={sx.heading}>Included in accounting</Box>
                </Tooltip>
                <Badge sx={sx.badge}>
                  {number.includes('*') ||
                  !['drawdown', 'emissions'].includes(category)
                    ? 'No'
                    : 'Yes'}
                </Badge>
              </Column>

              {showDocs && (
                <Column start={1} width={[6, 6, 4, 4]} sx={sx.column}>
                  <Button
                    sx={sx.heading}
                    href={`/research/cdr-verification/docs/components/${component_id}`}
                    suffix={<RotatingArrow sx={{ mt: -1 }} />}
                  >
                    View component documentation
                  </Button>
                </Column>
              )}

              <Column sx={sx.column} start={1} width={[6, 6, 4, 4]}>
                <Box sx={sx.heading}>Notes</Box>
                <Box sx={{ fontFamily: 'faux' }}>
                  {processor.processSync(description).result}
                </Box>
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
                  sx={{
                    color: CATEGORY_COLORS[category],
                    fontSize: '16px',
                    pb: 1,
                  }}
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

export default Component
