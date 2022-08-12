import { Box, Flex } from 'theme-ui'

const CATEGORY_MAPPING = {
  operations: 'red',
  gross_volume: 'orange',
  net_volume: 'yellow',
  permanence: 'purple',
}

const Rectangle = ({
  children,
  id,
  category,
  start: [gridColumnStart, gridRowStart],
  width = 4,
  height = 2,
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
        fontSize: 1,
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
            color: CATEGORY_MAPPING[category],
          }}
        >
          <Flex
            sx={{
              backgroundColor: 'background',
              border: (theme) =>
                `1px solid ${theme.colors[CATEGORY_MAPPING[category]]}`,
              alignContent: 'center',
              justifyContent: 'center',
              borderRadius: '24px',
              width: '24px',
              height: '24px',
              mt: borderStyle === 'none' ? '-24px' : '-14px',
              textAlign: 'center',
            }}
          >
            <Box sx={{ mt: '1px' }}>{id}</Box>
          </Flex>
        </Flex>
      ) : null}
      <Flex
        sx={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
          textAlign: 'center',
          justifyContent: 'center',
          fontSize: [0, 0, 1, 1],
        }}
      >
        {children}
      </Flex>
    </Box>
  )
}

export default Rectangle
