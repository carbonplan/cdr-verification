import { Box, Flex } from 'theme-ui'
import { UNCERTAINTIES } from './constants'
import { mix } from '@theme-ui/color'

const Uncertainty = ({ color, max, sx }) => {
  const quantity = UNCERTAINTIES.indexOf(max)

  return (
    <Flex
      sx={{
        width: '100%',
        height: 22,
        flexDirection: 'row',
        gap: [1, 2],
        ...sx,
      }}
    >
      {new Array(quantity).fill(null).map((_, i) => (
        <Box
          key={i}
          sx={{ flex: 1, backgroundColor: mix(color, 'muted', 0.4) }}
        />
      ))}
      {new Array(UNCERTAINTIES.length - 1 - quantity).fill(null).map((_, i) => (
        <Box key={i} sx={{ flex: 1, backgroundColor: 'muted' }} />
      ))}
    </Flex>
  )
}

export default Uncertainty
