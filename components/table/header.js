import { Box, Flex } from 'theme-ui'
import { Triangle } from '@carbonplan/icons'

const TableHeader = ({ id, sort, setSort, label, sx }) => {
  return (
    <Flex
      onClick={() => setSort(id)}
      sx={{
        cursor: 'pointer',
        flexDirection: 'column',
        gap: 2,
        ...sx,
      }}
    >
      <Box
        sx={{
          width: '16px',
          height: '16px',
          '@media (hover: hover) and (pointer: fine)': {
            [`&:hover > #${id}-triangle`]: {
              stroke: 'primary',
            },
          },
        }}
      >
        <Triangle
          id={`${id}-triangle`}
          sx={{
            transition: 'stroke 0.15s',
            stroke: sort === id ? 'primary' : 'muted',
            fill: 'none',
            width: 10,
            height: 10,
          }}
        />
      </Box>
      <Box sx={{ fontFamily: 'heading' }}>{label}</Box>
    </Flex>
  )
}

export default TableHeader
