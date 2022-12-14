import { useMemo, useRef } from 'react'
import { Box, Flex } from 'theme-ui'

import pathways from '../data/pathways.json'

const PathwaySelector = ({ pathway, setPathway, version, size = 'lg', sx }) => {
  const ref = useRef(null)
  let fontSize
  let width
  let offset
  switch (size) {
    case 'lg':
      width = 28
      fontSize = 4
      offset = '3px'
      break
    case 'sm':
      width = 24
      fontSize = 3
      offset = 0
      break
    default:
      throw new Error(`Unexpected size: ${size}`)
  }

  const pathway_name = useMemo(
    () => pathways.find((p) => p.pathway_id === pathway).pathway_name,
    [pathway]
  )

  return (
    <Flex sx={{ gap: [2, 2, 3, 3], ...sx }}>
      <Box
        sx={{
          position: 'relative',
          height: `${width}px`,
          width: `${width}px`,
          flexShrink: 0,
          top: offset,
        }}
      >
        <Box
          as='select'
          ref={ref}
          value={pathway}
          onChange={(e) => {
            ref.current.blur()
            setPathway(e.target.value)
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
          {pathways.map((p) => (
            <option key={p.pathway_id} value={p.pathway_id}>
              {p.pathway_name}
            </option>
          ))}
        </Box>
        <Box
          as='svg'
          width={`${0.5 * width}px`}
          viewBox='0 0 20 14'
          fill='none'
          stroke='currentColor'
          xmlns='http://www.w3.org/2000/svg'
          sx={{
            top: `${0.25 * width + 3}px`,
            left: `${0.25 * width}px`,
            position: 'absolute',
            color: 'muted',
            pointerEvents: 'none',
          }}
        >
          <path d='M2 2L10.2051 11L18 2' strokeWidth='3' />
        </Box>
      </Box>
      <Box sx={{ fontSize }}>
        {pathway_name}
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
      </Box>
    </Flex>
  )
}

export default PathwaySelector
