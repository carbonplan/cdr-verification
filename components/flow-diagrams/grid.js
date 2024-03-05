import { Box } from 'theme-ui'

import { useComponentContext } from '../context/component'

const Grid = ({ height = 30, children, debug = false }) => {
  const { setActive } = useComponentContext()

  return (
    <Box
      onClick={() => setActive(null)}
      sx={{
        display: 'grid',
        ml: [0, 0, -32, -48],
        gridTemplateColumns: `repeat(36, ${100 / 36}%)`,
        gridTemplateRows: `repeat(${height}, ${100 / height}%)`,
        gridAutoColumns: '1fr',
        gridAutoRows: '1fr',
        rowGap: '0',
        height: [
          `calc(${height} / 36 * 2 * (6 * (100vw - 7 * 24px) / 6 + 5 * 24px))`,
          `calc(${height} / 36 * (8 * (100vw - 9 * 32px) / 8 + 7 * 32px))`,
          `calc(${height} / 36 * (7 * (100vw - 13 * 32px) / 12 + 7 * 32px))`,
          `calc(${height} / 36 * (5 * (100vw - 13 * 48px) / 12 + 5 * 48px))`,
        ],
        maxWidth: 1500,
        maxHeight: (height / 36) * 1500,
      }}
    >
      {debug &&
        Array(36 * height)
          .fill(null)
          .map((_, i) => (
            <Box
              key={i}
              sx={{ border: (theme) => `0.75px solid ${theme.colors.red}` }}
            />
          ))}
      {children}
    </Box>
  )
}

export default Grid
