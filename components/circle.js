import { Box, useThemeUI } from 'theme-ui'
import { mix } from '@theme-ui/color'

import { CATEGORY_COLORS } from './constants'
import { useComponent } from './context/component'
import CIRCLE_ICONS from './circle-icons'

const Circle = ({ component_id, sx, ...props }) => {
  const { theme } = useThemeUI()
  const { status, data } = useComponent(component_id)

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
  const Icon = CIRCLE_ICONS[data.number]

  if (!Icon) {
    console.warn(`No icon found for component_id: ${component_id}`)
    return null
  }

  return (
    <Box sx={sx} {...props}>
      <Icon color={mixer(color)} background={theme.colors.background} />
    </Box>
  )
}

export default Circle
