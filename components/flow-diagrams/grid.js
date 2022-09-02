import { Box } from 'theme-ui'

const Grid = ({ height = 30, children, debug = false }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        ml: [0, 0, -32, -48],
        gridTemplateColumns: `repeat(36, ${100 / 36}%)`,
        gridTemplateRows: `repeat(${height}, ${100 / height}%)`,
        gridAutoColumns: '1fr',
        gridAutoRows: '1fr',
        height: [
          `calc(${height} / 30 * 2 * (6 * (100vw - 7 * 24px) / 6 + 5 * 24px))`,
          `calc(${height} / 30 * (6 * (100vw - 9 * 32px) / 8 + 5 * 32px))`,
          `calc(${height} / 30 * (7 * (100vw - 13 * 32px) / 12 + 7 * 32px))`,
          `min(600px, calc(${height} / 30 * (7 * (100vw - 13 * 48px) / 12 + 7 * 48px)))`,
        ],
      }}
    >
      {debug &&
        Array(36 * 20)
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
