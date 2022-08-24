import { Box, Flex } from 'theme-ui'
import { alpha } from '@theme-ui/color'

import Circle from '../circle'
import { useElement } from '../context/element'

const Rectangle = ({
  children,
  id,
  category,
  start: [gridColumnStart, gridRowStart],
  width = 6,
  height = 4,
  invert = false,
  borderStyle = 'solid',
  label,
}) => {
  const { status, setActive, setHovered } = useElement(id)

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
        borderColor: invert ? null : alpha('primary', opacity),
        borderWidth: '1px',
        borderStyle,
        color: invert ? 'background' : alpha('primary', opacity),
        transition: 'background-color, color, border-color 0.15s',
      }}
    >
      {label && (
        <Box
          sx={{
            color: 'primary',
            fontFamily: 'mono',
            letterSpacing: 'mono',
            textTransform: 'uppercase',
            position: 'absolute',
            mt: '-20px',
          }}
        >
          {label}
        </Box>
      )}
      {category && id ? (
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
            category={category}
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
          fontSize: [0, 0, 0, 1],
        }}
      >
        <Box sx={{ padding: 1 }}>{children}</Box>
      </Flex>
    </Box>
  )
}

export default Rectangle
