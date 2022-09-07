import { Box, Flex } from 'theme-ui'
import { mix } from '@theme-ui/color'

import Circle from '../circle'
import { useElement } from '../context/element'

const Rectangle = ({
  id,
  label,
  secondary,
  secondaryLabel,
  start: [gridColumnStart, gridRowStart],
  borderStyle: borderStyleProp,
  width = 6,
  height = 4,
}) => {
  const { status, data, setActive, setHovered } = useElement(id)
  const deemphasized = id?.includes('*')
  const borderColor = secondary || deemphasized ? 'secondary' : 'primary'
  const borderStyle = borderStyleProp ?? (deemphasized ? 'dashed' : 'solid')

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
        backgroundColor: null,
        borderColor: mixer(borderColor),
        borderWidth: '1px',
        borderStyle,
        color: mixer(secondary ? 'secondary' : 'primary'),
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
            sx={{
              backgroundColor: 'background',
              mt: borderStyle === 'none' ? '-24px' : '-14px',
            }}
          />
        </Flex>
      ) : null}
      {secondary && (
        <Box
          sx={{
            // color: mixer('secondary'),
            ml: 2,
            mt: 1,
            fontFamily: 'mono',
            letterSpacing: 'mono',
            textTransform: 'uppercase',
            fontSize: 1,
          }}
        >
          {secondaryLabel}
        </Box>
      )}
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
        {borderStyle === 'none' && (
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              mt: '-24px',
            }}
          />
        )}
        <Box sx={{ padding: 1 }}>{label ?? data?.description}</Box>
      </Flex>
    </Box>
  )
}

export default Rectangle
