import { Box, Flex } from 'theme-ui'
import { UNCERTAINTIES } from './constants'
import { mix } from '@theme-ui/color'

const Uncertainty = ({ color, min, max, sx }) => {
  const start = UNCERTAINTIES.indexOf(min)
  const end = UNCERTAINTIES.indexOf(max)

  return (
    <Flex
      sx={{
        width: '100%',
        height: 22,
        flexDirection: 'row',
        gap: [1, 2, '5px', '5px'],
        ...sx,
      }}
    >
      {new Array(UNCERTAINTIES.length).fill(null).map((_, i) => {
        let backgroundColor = 'muted'
        if (i <= start) {
          backgroundColor = color
        } else if (i <= end) {
          backgroundColor = mix(color, 'muted', 0.2)
        }
        return <Box key={i} sx={{ flex: 1, backgroundColor }} />
      })}
    </Flex>
  )
}

export default Uncertainty
