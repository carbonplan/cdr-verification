import { Box, Flex } from 'theme-ui'
import { alpha } from '@theme-ui/color'

import { CATEGORY_COLORS } from './constants'

const Circle = ({ id, category, opacity = 1, sx, ...props }) => {
  const color = CATEGORY_COLORS[category] ?? 'secondary'
  return (
    <Flex
      sx={{
        backgroundColor: 'background',
        borderWidth: '1px',
        borderStyle: id.includes('*') ? 'dashed' : 'solid',
        borderColor: alpha(color, opacity),
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: '24px',
        width: '24px',
        height: '24px',
        textAlign: 'center',
        color: alpha(color, opacity),
        fontSize: 1,
        ...sx,
      }}
      {...props}
    >
      <Box sx={{ mt: '1px' }}>{id.replace('*', '')}</Box>
    </Flex>
  )
}

export default Circle
