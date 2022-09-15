import { Box, Flex } from 'theme-ui'

import pathways from '../data/pathways.json'

const PathwaySelector = ({ pathway, setPathway, size, sx }) => {
  return (
    <Flex sx={{ gap: [2, 2, 3, 3], ...sx }}>
      <Box
        sx={{
          position: 'relative',
          height: `${size}px`,
          width: `${size}px`,
          flexShrink: 0,
        }}
      >
        <Box
          as='select'
          value={pathway}
          onChange={(e) => setPathway(e.target.value)}
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
          width={`${0.7 * size}px`}
          viewBox='0 0 20 14'
          fill='none'
          stroke='currentColor'
          xmlns='http://www.w3.org/2000/svg'
          sx={{
            top: `${0.15 * size + 5}px`,
            left: `${0.15 * size}px`,
            position: 'absolute',
            color: 'background',
            pointerEvents: 'none',
          }}
        >
          <path d='M2 2L10.2051 11L18 2' stroke-width='3' />
        </Box>
      </Box>

      <Box sx={{ fontSize: [3, 3, 4, 4] }}>{pathway.replace(/_/g, ' ')}</Box>
    </Flex>
  )
}

export default PathwaySelector
