import { Box, Flex } from 'theme-ui'
import { Expander } from '@carbonplan/components'
import Circle from './circle'

const Element = ({
  category,
  comments,
  diagram_component,
  description,
  active,
  onClick,
}) => {
  return (
    <Box sx={{ my: [2, 3, 3, 4] }}>
      <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Flex
          sx={{
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Circle
            id={diagram_component}
            category={category}
            sx={{ flexShrink: 0 }}
          />
          <Box>{description}</Box>
        </Flex>
        <Expander value={active} onClick={onClick} sx={{ flexShrink: 0 }} />
      </Flex>
      {active ? comments : null}
    </Box>
  )
}

export default Element
