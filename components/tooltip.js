import { Box, Flex, IconButton } from 'theme-ui'
import { useState } from 'react'
import AnimateHeight from 'react-animate-height'
import { Info } from '@carbonplan/icons'

const Tooltip = ({
  children,
  tooltip,
  mt = '6px',
  sx,
  align = 'flex-start',
  justify,
}) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <Box sx={sx}>
      <Flex sx={{ gap: 2, alignItems: align, justifyContent: justify }}>
        {children}
        <IconButton
          onClick={() => setExpanded(!expanded)}
          role='checkbox'
          aria-checked={expanded}
          aria-label='Information'
          sx={{
            cursor: 'pointer',
            height: '16px',
            width: '16px',
            '@media (hover: hover) and (pointer: fine)': {
              '&:hover > #info': {
                stroke: 'primary',
              },
            },
            p: [0],
            transform: 'translate(0px, -3.75px)',
            mt,
            flexShrink: 0,
          }}
        >
          <Info
            id='info'
            height='16px'
            width='16px'
            sx={{
              stroke: expanded ? 'primary' : 'secondary',
              transition: '0.1s',
            }}
          />
        </IconButton>
      </Flex>
      <AnimateHeight
        duration={100}
        height={expanded ? 'auto' : 0}
        easing={'linear'}
      >
        <Box sx={{ py: 1, fontSize: [1, 1, 1, 2], color: 'secondary' }}>
          {tooltip}
        </Box>
      </AnimateHeight>
    </Box>
  )
}

export default Tooltip
