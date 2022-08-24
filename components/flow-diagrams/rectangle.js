import { Box, Flex } from 'theme-ui'

import Circle from '../circle'

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
  return (
    <Box
      id={id}
      sx={{
        position: 'relative',
        gridColumnStart,
        gridColumnEnd: gridColumnStart + width,
        gridRowStart,
        gridRowEnd: gridRowStart + height,
        backgroundColor: invert ? 'primary' : 'none',
        borderColor: invert ? 'none' : borderColor,
        borderWidth: '1px',
        borderStyle,
        color: invert ? 'background' : 'primary',
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
