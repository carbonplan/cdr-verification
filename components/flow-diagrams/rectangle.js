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
  borderColor = 'primary',
  borderStyle = 'solid',
  label,
}) => {
  const { active, setActive, setHovered } = useElement(id)

  return (
    <Box
      id={id}
      tabIndex={id ? 0 : null}
      onClick={id ? setActive : null}
      sx={{
        cursor: id ? 'pointer' : 'default',
        position: 'relative',
        gridColumnStart,
        gridColumnEnd: gridColumnStart + width,
        gridRowStart,
        gridRowEnd: gridRowStart + height,
        backgroundColor: invert ? 'primary' : null,
        borderColor: invert ? null : borderColor,
        borderWidth: '1px',
        borderStyle,
        color: invert ? 'background' : 'primary',
        transition: 'background-color, color, border-color 0.15s',
        '&:hover': id
          ? {
              backgroundColor: invert ? alpha('primary', 0.5) : null,
              borderColor: invert ? null : alpha(borderColor, 0.5),
              color: invert ? 'background' : alpha('primary', 0.5),
            }
          : {},
      }}
    >
      {label && (
        <Box
          sx={{
            color: borderColor,
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
