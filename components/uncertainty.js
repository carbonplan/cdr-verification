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
        let backgroundColor = 'muted'
        if (i <= start) {
          backgroundColor = color
        } else if (i <= end || start === -1 || end === -1) {
          backgroundColor =
            colorMode === 'light'
              ? mix(color, 'secondary', 0.35)
              : alpha(color, 0.25)
        }
        return <Box key={i} sx={{ flex: 1, backgroundColor }} />
      })}
    </Flex>
  )
}

export default Uncertainty
