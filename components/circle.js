import { Box, useThemeUI } from 'theme-ui'
import { mix } from '@theme-ui/color'

import { CATEGORY_COLORS } from './constants'
import { useElement } from './context/element'
import CIRCLE_ICONS from './circle-icons'

const Circle = ({ id, sx, ...props }) => {
  const { theme } = useThemeUI()
  const { status, data } = useElement(id)

  let mixer
  switch (status) {
    case 'hovered':
      mixer = (color) => theme.colors.primary
      break
    case 'inactive':
      mixer = (color) => mix(color, 'background', 0.5)(theme)
      break
    default:
      mixer = (color) => theme.colors[color]
      break
  }

  const color = CATEGORY_COLORS[data.category] ?? 'secondary'
  const Icon = CIRCLE_ICONS[id]

  if (!Icon) {
    console.warn(`No icon found for id: ${id}`)
    return null
  }

  return (
    <Box sx={sx}>
      <Icon color={mixer(color)} background={theme.colors.background} />
    </Box>
  )
}

export default Circle
