import { alpha } from '@theme-ui/color'
import { Box } from 'theme-ui'
import { useElementContext } from '../context/element'

const ArrowEnd = ({ sx }) => (
  <Box
    as='svg'
    viewBox='0 0 24 24'
    fill='none'
    width='24'
    height='24'
    stroke='currentColor'
    sx={sx}
  >
    <line x1='13.4' y1='3.5' x2='21.9' y2='12' />
    <line x1='21.9' y1='12' x2='13.4' y2='20.5' />
  </Box>
)

const getSx = ({ right, down, left, up }) => {
  if (right) {
    return {
      right: 0,
      bottom: 0,
      mb: '-12.5px',
      mr: '-3px',
    }
  } else if (down) {
    return {
      right: 0,
      bottom: 0,
      transform: 'rotate(90deg)',
      mb: '-3px',
      mr: '-12.5px',
    }
  } else if (up) {
    return {
      right: 0,
      top: 0,
      transform: 'rotate(270deg)',
      mt: '-3px',
      mr: '-12.5px',
    }
  } else if (left) {
    return {
      left: 0,
      bottom: 0,
      transform: 'rotate(180deg)',
      mb: '-12.5px',
      ml: '-3px',
    }
  }
}

const Arrow = ({
  start: [gridColumnStart, gridRowStart],
  right = false,
  down = false,
  left = false,
  up = false,
  length,
  hideArrow = false,
}) => {
  const { active } = useElementContext()
  const horizontal = right || left
  const vertical = up || down
  const opacity = active ? 0.4 : 1
  return (
    <Box
      sx={{
        position: 'relative',
        gridColumnStart,
        gridColumnEnd: horizontal ? gridColumnStart + length : gridColumnStart,
        gridRowStart,
        gridRowEnd: vertical ? gridRowStart + length : gridRowStart,
        [horizontal ? 'height' : 'width']: 0,
        color: alpha('primary', opacity),
      }}
    >
      <Box
        sx={{
          zIndex: 1,
          position: 'absolute',
          bg: 'background',
          [horizontal ? 'width' : 'height']: '100%',
          [horizontal ? 'height' : 'width']: '14px',
          [horizontal ? 'mt' : 'ml']: '-7px',
        }}
      />
      <Box
        sx={{
          zIndex: 2,
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderWidth: 0,
          borderStyle: 'solid',
          [horizontal ? 'borderTopWidth' : 'borderLeftWidth']: '1px',
          borderColor: alpha('primary', opacity),
        }}
      />

      {!hideArrow && (
        <ArrowEnd
          sx={{
            zIndex: 2,
            position: 'absolute',
            ...getSx({ right, down, left, up }),
          }}
        />
      )}
    </Box>
  )
}

export default Arrow
