import { Box, Divider, Flex } from 'theme-ui'
import { Badge, Expander } from '@carbonplan/components'
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
    },
    badge: { textTransform: 'capitalize' },
  }

  return (
    <Box sx={{ my: [2, 3, 3, 4] }}>
      <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
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
        <Expander value={active} onClick={onClick} sx={{ flexShrink: 0 }} />
      </Flex>

      {active ? (
        <Box>
          <Divider />
          <Box sx={sx.heading}>Uncertainty type</Box>
          <Badge sx={sx.badge}>{uncertainty_type}</Badge>
          <Box sx={sx.heading}>Uncertainty responsibility</Box>
          <Badge sx={sx.badge}>{responsibility}</Badge>
          <Box sx={sx.heading}>Notes</Box>

          <Box sx={{ fontFamily: 'faux' }}>{comments}</Box>
          <Divider />
        </Box>
      ) : null}
    </Box>
  )
}

export default Element
