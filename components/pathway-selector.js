import { Select } from '@carbonplan/components'

import pathways from '../data/pathways.json'

const PathwaySelector = ({ pathway, setPathway, size = 'md', sx }) => {
  return (
    <Select
      size={size}
      value={pathway}
      onChange={(e) => setPathway(e.target.value)}
      sx={{
        '& select': {
          width: '100%',
          overflow: 'hidden',
          fontSize: [3, 3, 4, 4],
        },
        ...sx,
      }}
    >
      {pathways.map((p) => (
        <option key={p.pathway_name} value={p.pathway_name}>
          {p.pathway_name.replace(/_/g, ' ')}
        </option>
      ))}
    </Select>
  )
}

export default PathwaySelector
