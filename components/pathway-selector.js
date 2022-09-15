import { useRef } from 'react'
import { Box, Flex } from 'theme-ui'

import pathways from '../data/pathways.json'

const PathwaySelector = ({ pathway, setPathway, size = 'lg', sx }) => {
  const ref = useRef(null)
  let fontSize
  let width
  switch (size) {
    case 'lg':
      width = 32
      fontSize = 4
      break
    case 'sm':
      width = 24
      fontSize = 3
      break
    default:
      throw new Error(`Unexpected size: ${size}`)
      break
  }
  return (
    <Flex sx={{ gap: [2, 2, 3, 3], ...sx }}>
      <Box
        sx={{
          position: 'relative',
          height: `${width}px`,
          width: `${width}px`,
          flexShrink: 0,
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
            transition: '0.1s',
            '@media (hover: hover)': {
              '&:hover': {
                backgroundColor: 'secondary',
              },
            },
          }}
        >
          {pathways.map((p) => (
            <option key={p.pathway_name} value={p.pathway_name}>
              {p.pathway_name.replace(/_/g, ' ')}
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
            top: `${0.25 * width + 4}px`,
            left: `${0.25 * width}px`,
            position: 'absolute',
            color: 'muted',
            pointerEvents: 'none',
          }}
        >
          <path d='M2 2L10.2051 11L18 2' stroke-width='3' />
        </Box>
      </Box>

      <Box sx={{ fontSize }}>{pathway.replace(/_/g, ' ')}</Box>
    </Flex>
  )
}

export default PathwaySelector
