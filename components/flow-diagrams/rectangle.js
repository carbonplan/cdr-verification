import { Box, Flex } from 'theme-ui'
import { alpha } from '@theme-ui/color'

import Circle from '../circle'
import { useElement } from '../context/element'

const Rectangle = ({
  id,
  label,
  start: [gridColumnStart, gridRowStart],
  borderStyle: borderStyleProp,
  width = 6,
  height = 4,
  invert = false,
}) => {
  const { status, data, setActive, setHovered } = useElement(id)
  const deemphasized = id?.includes('*')
  const borderColor = deemphasized ? 'secondary' : 'primary'
  const borderStyle = borderStyleProp ?? (deemphasized ? 'dashed' : 'solid')

  let opacity
  switch (status) {
    case 'hovered':
      opacity = 0.75
      break
    case 'inactive':
      opacity = 0.4
      break
    default:
      opacity = 1
      break
  }

  return (
    <Box
      id={id}
      tabIndex={id ? 0 : null}
      onClick={id ? setActive : null}
      onMouseEnter={id ? () => setHovered(true) : null}
      onMouseLeave={id ? () => setHovered(false) : null}
      sx={{
        cursor: id ? 'pointer' : 'default',
        position: 'relative',
        gridColumnStart,
        gridColumnEnd: gridColumnStart + width,
        gridRowStart,
        gridRowEnd: gridRowStart + height,
        backgroundColor: invert ? alpha('primary', opacity) : null,
        borderColor: invert ? null : alpha(borderColor, opacity),
        borderWidth: invert ? 0 : '1px',
        borderStyle,
        color: invert ? 'background' : alpha('primary', opacity),
        transition: 'background-color, color, border-color 0.15s',
      }}
    >
      {id ? (
        <Flex
          sx={{
            position: 'absolute',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <Circle
            id={id}
            opacity={opacity}
            category={data?.category}
            sx={{
              backgroundColor: 'background',
              mt: borderStyle === 'none' ? '-24px' : '-14px',
            }}
          />
        </Flex>
      ) : null}
      <Flex
        sx={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
          textAlign: 'center',
          justifyContent: 'center',
          fontSize: ['1.6vw', '1.5vw', '1vw', '0.75vw'],
        }}
      >
        <Box sx={{ padding: 1 }}>{label ?? data?.description}</Box>
      </Flex>
    </Box>
  )
}

export default Rectangle
