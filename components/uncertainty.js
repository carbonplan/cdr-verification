import { Box, Flex, useThemeUI } from 'theme-ui'
import { alpha, mix } from '@theme-ui/color'
import { UNCERTAINTIES } from './constants'

const Uncertainty = ({ color, min, max, sx }) => {
  const { colorMode } = useThemeUI()
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
        let backgroundColor =
          colorMode === 'light' ? alpha('muted', 0.3) : 'muted'
        if (start === -1 || end === -1) {
          backgroundColor =
            colorMode === 'light' ? alpha('muted', 0.11) : alpha('muted', 0.3)
        } else if (i <= start) {
          backgroundColor = color
        } else if (i <= end) {
          backgroundColor =
            colorMode === 'light'
              ? mix(color, '#eaeaea', 0.5) // mix with muted at 0.3 opacity
              : mix(color, 'muted', 0.5)
        }
        return <Box key={i} sx={{ flex: 1, backgroundColor }} />
      })}
    </Flex>
  )
}

export default Uncertainty
