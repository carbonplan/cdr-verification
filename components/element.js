import { Box, Divider, Flex } from 'theme-ui'
import { Badge, Expander, Row, Column } from '@carbonplan/components'
import Circle from './circle'
import Uncertainty from './uncertainty'
import { CATEGORY_COLORS } from './constants'

const Element = ({
  category,
  comments,
  element,
  description,
  uncertainty_type,
  uncertainty_magnitude_min,
  uncertainty_magnitude_max,
  responsibility,
  active,
  onClick,
}) => {
  const sx = {
    heading: {
      color: CATEGORY_COLORS[category],
      letterSpacing: 'smallcaps',
      textTransform: 'uppercase',
      mb: 2,
    },
    badge: { textTransform: 'capitalize' },
    column: { mb: 3 },
  }

  return (
    <Box sx={{ my: [2, 3, 4, 4] }}>
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
        <Column start={[5, 4, 4, 4]} width={1}>
          <Flex
            sx={{
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: [4, 5, 5, 6],
              mr: ['-48px', '-56px', '-56px', '-72px'],
            }}
          >
            <Uncertainty
              min={uncertainty_magnitude_min}
              max={uncertainty_magnitude_max}
              sx={{ flexShrink: 0 }}
            />
            <Expander
              value={active}
              onClick={onClick}
              sx={{ flexShrink: 0, zIndex: 1 }}
            />
          </Flex>
        </Column>
      </Row>

      {active ? (
        <Box>
          <Divider />
          <Row columns={[6, 7, 4, 4]}>
            <Column sx={sx.column} start={1} width={[6, 7, 4, 2]}>
              <Box sx={sx.heading}>Uncertainty type</Box>
              <Badge sx={sx.badge}>{uncertainty_type}</Badge>
            </Column>
            <Column sx={sx.column} start={[1, 1, 1, 3]} width={[6, 7, 4, 2]}>
              <Box sx={sx.heading}>Uncertainty responsibility</Box>
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
