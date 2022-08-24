import { Box, Flex } from 'theme-ui'
import { alpha } from '@theme-ui/color'

import { CATEGORY_COLORS } from './constants'

const Clock = () => (
  <Box
    as='svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    stroke='currentColor'
    sx={{ mt: '-1px' }}
  >
    <polyline points='12,7 12,14 17.5,9.8' fill='none' />
  </Box>
)

const Strikethrough = () => (
  <Box
    as='svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    stroke='currentColor'
    sx={{ mt: '-1px' }}
  >
    <line x1='3.64645' y1='20.6169' x2='20.617' y2='3.64634' />
  </Box>
)

const Briefcase = () => (
  <Box
    as='svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    stroke='currentColor'
    sx={{ mt: '-1px' }}
  >
    <rect x='6' y='9.27637' width='12.2861' height='7.37166' />
    <path d='M10 9V8C10 7.44772 10.4477 7 11 7H13C13.5523 7 14 7.44772 14 8V9' />
  </Box>
)

const ICONS = {
  operations: <Briefcase />,
  permanence: <Clock />,
}

const Circle = ({ id, category, opacity = 1, sx }) => {
  let content
  if (id.includes('*')) {
    // For now, use annotation in ID to indicate whether an element is one we don't suggest considering.
    // We may eventually want to move this into an explicit flag on the element object.
    content = <Strikethrough />
  } else if (ICONS[category]) {
    content = ICONS[category]
  } else {
    content = <Box sx={{ mt: '1px' }}>{id}</Box>
  }
  return (
    <Flex
      sx={{
        backgroundColor: 'background',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: alpha(CATEGORY_COLORS[category], opacity),
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: '24px',
        width: '24px',
        height: '24px',
        textAlign: 'center',
        color: alpha(CATEGORY_COLORS[category], opacity),
        fontSize: 1,
        ...sx,
      }}
    >
      {content}
    </Flex>
  )
}

export default Circle
