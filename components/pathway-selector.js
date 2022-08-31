import { Select } from '@carbonplan/components'

import pathways from '../data/pathways.json'

const PathwaySelector = ({ pathway, setPathway, size = 'sm', sx }) => {
  return (
    <Select
      size={size}
      // TODO: remove hacky defaulting
      value={pathway ?? 'Ocean_Alkalinity_Enhancement_-_Electrochemical'}
      onChange={(e) =>
        console.log('in here', e.target.value) || setPathway(e.target.value)
      }
      sx={{
        '& select': { width: '100%', overflow: 'hidden' },
        ...sx,
      }}
    >
      {pathways.map((p) => (
        <option key={p.pathway_name} value={p.pathway_name}>
          {p.pathway_name}
        </option>
      ))}
    </Select>
  )
}

export default PathwaySelector
