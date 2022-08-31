import { Box } from 'theme-ui'

const HEIGHTS = [
  `calc(${2} * (${6} * (100vw - 7 * 24px) / 6 + ${5} * 24px))`,
  `calc(${1} * (${6} * (100vw - 9 * 32px) / 8 + ${5} * 32px))`,
  `calc(${1} * (${7} * (100vw - 13 * 32px) / 12 + ${7} * 32px))`,
  `min(600px, calc(${1} * (${7} * (100vw - 13 * 48px) / 12 + ${7} * 48px)))`,
]

const Grid = ({ children, debug = false }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        ml: [0, 0, -32, -48],
        gridTemplateColumns: `repeat(36, ${100 / 36}%)`,
        gridTemplateRows: `repeat(30, ${100 / 30}%)`,
        gridAutoColumns: '1fr',
        gridAutoRows: '1fr',
        height: HEIGHTS,
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
