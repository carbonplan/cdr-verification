import { Box, Flex } from 'theme-ui'
import { Badge, Table } from '@carbonplan/components'

const Contributors = ({ contributors, sx }) => {
  return (
    <Table
      sx={sx}
      columns={[6]}
      start={[[1], [1, 4, 4, 4]]}
      width={[
        [6, 3, 3, 3],
        [6, 3, 3, 3],
      ]}
      data={contributors
        .sort((a, b) => a.name.localeCompare(b.name))
        .sort((a, b) => {
          if (a.version.length !== b.version.length) {
            return b.version.length - a.version.length
          } else {
            return a.version.join(', ').localeCompare(b.version.join(', '))
          }
        })
        .map(({ type, name, affiliation, version }) => [
          <Flex key='metadata' sx={{ justifyContent: 'space-between' }}>
            <Badge
              sx={{
                fontSize: 1,
                pt: '1px',
                mb: [2, 2, 0, 0],
                whiteSpace: 'nowrap',
                textAlign: 'right',
              }}
            >
              {type}
            </Badge>

            <Box
              sx={{
                color: 'secondary',
                fontFamily: 'mono',
                fontSize: 1,
                mt: '2px',
              }}
            >
              {version.map((v) => `v${v}`).join(', ')}
            </Box>
          </Flex>,

          <Box key='name'>
            {name} {affiliation ? `(${affiliation})` : ''}
          </Box>,
        ])}
      index={false}
      borderTop={false}
      borderBottom={false}
    />
  )
}

export default Contributors
