import { Box, Flex } from 'theme-ui'

import { CATEGORY_COLORS } from './constants'

const Circle = ({ id, category, sx }) => {
  return (
    <Flex
      sx={{
        backgroundColor: 'background',
        border: (theme) =>
          `1px solid ${theme.colors[CATEGORY_COLORS[category]]}`,
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: '24px',
        width: '24px',
        height: '24px',
        textAlign: 'center',
        color: CATEGORY_COLORS[category],
        fontSize: 1,
        ...sx,
      }}
    >
      <Box sx={{ mt: '1px' }}>{id}</Box>
    </Flex>
  )
}

export default Circle
