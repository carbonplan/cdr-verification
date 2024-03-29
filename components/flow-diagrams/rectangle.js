import { Box, Flex } from 'theme-ui'
import { mix } from '@theme-ui/color'
import { useCallback } from 'react'

import Circle from '../circle'
import { useComponent } from '../context/component'

const Rectangle = ({
  id: component_id,
  label,
  secondary,
  start: [gridColumnStart, gridRowStart],
  borderStyle: borderStyleProp,
  width = 6,
  height = 4,
}) => {
  const { status, data, onClick, setHovered } = useComponent(component_id)
  const deemphasized = data?.number?.includes('*')
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

  const handleClick = useCallback(
    (e) => {
      if (component_id) {
        onClick(e)
      }
    },
    [component_id]
  )

  return (
    <Box
      id={component_id}
      tabIndex={component_id ? 0 : null}
      onClick={handleClick}
      onMouseEnter={component_id ? () => setHovered(true) : null}
      onMouseLeave={component_id ? () => setHovered(false) : null}
      sx={{
        cursor: component_id ? 'pointer' : 'default',
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
      {component_id ? (
        <Flex
          sx={{
            position: 'absolute',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <Circle
            component_id={component_id}
            sx={{
              mt: borderStyle === 'none' ? '-24px' : '-14px',
            }}
          />
        </Flex>
      ) : null}
      {secondary && (
        <Box
          sx={{
            ml: ['9px', '10px', '11px', '12px'],
            mt: [1, '7px', 2, 2],
            fontFamily: 'mono',
            letterSpacing: 'mono',
            textTransform: 'uppercase',
            fontSize: ['1.6vw', '1.5vw', '0.9vw', '0.6vw'],
          }}
        >
          {label}
        </Box>
      )}
      <Flex
        sx={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
          textAlign: 'center',
          justifyContent: 'center',
          fontSize: ['1.6vw', '1.5vw', '1vw', '0.65vw'],
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
        {!secondary && <Box sx={{ padding: 1 }}>{label ?? data?.name}</Box>}
      </Flex>
    </Box>
  )
}

export default Rectangle
