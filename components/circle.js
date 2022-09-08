import { Box, Flex } from 'theme-ui'
import { mix } from '@theme-ui/color'

import { CATEGORY_COLORS } from './constants'
import { useElement } from './context/element'

const Circle = ({ id, sx, ...props }) => {
  const { status, data } = useElement(id)

  let mixer
  switch (status) {
    case 'hovered':
      mixer = (color) => 'primary'
      break
    case 'inactive':
      mixer = (color) => mix(color, 'background', 0.5)
      break
    default:
      mixer = (color) => color
      break
  }

  const color = CATEGORY_COLORS[data.category] ?? 'secondary'
  return (
    <Flex
      sx={{
        backgroundColor: 'background',
        borderWidth: '1px',
        borderStyle: id.includes('*') ? 'dashed' : 'solid',
        borderColor: mixer ? mixer(color) : color,
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: '24px',
        width: '24px',
        height: '24px',
        color: mixer ? mixer(color) : color,
        fontSize: 1,
        transition: '0.15s',
        fontFamily: 'body',
        letterSpacing: 'body',
        ...sx,
      }}
      {...props}
    >
      <Box sx={{ mt: '1px' }}>{id.replace('*', '')}</Box>
    </Flex>
  )
}

export default Circle
