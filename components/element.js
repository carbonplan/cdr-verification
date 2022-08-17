import { Box, Divider, Flex } from 'theme-ui'
import { Badge, Expander, Row, Column } from '@carbonplan/components'
import Circle from './circle'
import { CATEGORY_MAPPING } from './constants'

const Element = ({
  category,
  comments,
  diagram_component,
  description,
  uncertainty_type,
  uncertainty_magnitude,
  responsibility,
  active,
  onClick,
}) => {
  const sx = {
    heading: {
      color: CATEGORY_MAPPING[category],
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
        <Column start={1} width={[6, 7, 3, 3]}>
          <Flex
            sx={{
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Circle
              id={diagram_component}
              category={category}
              sx={{ flexShrink: 0 }}
            />
            <Box>{description}</Box>
          </Flex>
        </Column>
        <Column start={4} width={1}>
          <Flex
            sx={{
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 3,
            }}
          >
            ????
            <Expander value={active} onClick={onClick} sx={{ flexShrink: 0 }} />
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
