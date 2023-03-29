import { Box } from 'theme-ui'
import { Badge, Table } from '@carbonplan/components'

const Contributors = ({ contributors, sx }) => {
  return (
    <Table
      sx={sx}
      columns={[6]}
      start={[[1], [4, 2, 2, 2], [1, 3, 3, 3]]}
      width={[
        [3, 1, 1, 1],
        [3, 1, 1, 1],
        [6, 3, 3, 3],
      ]}
      data={contributors.map(({ type, name, affiliation, version }) => [
        <Badge
          key='type'
          sx={{
            fontSize: 1,
            pt: '1px',
            mb: [2, 2, 0, 0],
            whiteSpace: 'nowrap',
          }}
        >
          {type}
        </Badge>,
        <Box
          key='versions'
          sx={{
            color: 'secondary',
            fontFamily: 'mono',
            textAlign: 'right',
            fontSize: 1,
            mt: '2px',
          }}
        >
          {version.map((v) => `v${v}`).join(', ')}
        </Box>,
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
