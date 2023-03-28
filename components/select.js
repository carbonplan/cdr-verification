import { useMemo, useRef } from 'react'
import { Box, Flex } from 'theme-ui'

const Select = ({
  value,
  options,
  onChange,
  version,
  size: rawSize = 'lg',
  sx,
}) => {
  const ref = useRef(null)
  const size = Array.isArray(rawSize) ? rawSize : [rawSize]
  const { fontSize, width, offset } = size.reduce(
    (accum, sizeEl) => {
      switch (sizeEl) {
        case 'lg':
          accum.width.push(28)
          accum.fontSize.push(4)
          accum.offset.push('3px')
          return accum
        case 'sm':
          accum.width.push(24)
          accum.fontSize.push(3)
          accum.offset.push(0)
          return accum
        default:
          throw new Error(`Unexpected size: ${size}`)
      }
    },
    { fontSize: [], width: [], offset: [] }
  )

  const selectedLabel = useMemo(
    () => options.find((o) => o.value === value).label,
    [options, value]
  )

  return (
    <Flex sx={{ gap: [2, 2, 3, 3], ...sx }}>
      <Box
        sx={{
          position: 'relative',
          height: width.map((w) => `${w}px`),
          width: width.map((w) => `${w}px`),
          flexShrink: 0,
          top: offset,
        }}
      >
        <Box
          as='select'
          ref={ref}
          value={value}
          onChange={(e) => {
            ref.current.blur()
            onChange(e.target.value)
          }}
          sx={{
            cursor: 'pointer',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            border: 'none',
            borderRadius: '5px',
            color: 'transparent',
            backgroundColor: 'primary',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            transition: '0.15s',
            '& option': {
              color: 'background',
            },
            '@media (hover: hover)': {
              '&:hover': {
                backgroundColor: 'secondary',
              },
            },
          }}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Box>
        <Box
          as='svg'
          viewBox='0 0 20 14'
          fill='none'
          stroke='currentColor'
          xmlns='http://www.w3.org/2000/svg'
          sx={{
            width: width.map((w) => `${0.5 * w}px`),
            top: width.map((w) => `${0.25 * w + 3}px`),
            left: width.map((w) => `${0.25 * w}px`),
            position: 'absolute',
            color: 'muted',
            pointerEvents: 'none',
          }}
        >
          <path d='M2 2L10.2051 11L18 2' strokeWidth='3' />
        </Box>
      </Box>
      <Box sx={{ fontSize }}>
        {selectedLabel}
        {version && (
          <Box
            as='span'
            sx={{
              color: 'secondary',
              fontSize: 0,
              fontFamily: 'mono',
              letterSpacing: 'mono',
              ml: 2,
            }}
          >
            v{version}
          </Box>
        )}
      </Box>
    </Flex>
  )
}

export default Select
