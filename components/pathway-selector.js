import { Select } from '@carbonplan/components'

import { DATA } from './constants'

const PathwaySelector = ({ pathway, setPathway, size = 'sm' }) => {
  return (
    <Select
      size={size}
      value={pathway}
      onChange={(e) => setPathway(e.target.value)}
      sx={{
        '& select': { width: '100%', overflow: 'hidden' },
      }}
    >
      <option value='oae'>{DATA.oae.pathway_name}</option>
      <option value='seaweed'>{DATA.seaweed.pathway_name}</option>
      <option value='ew'>{DATA.ew.pathway_name}</option>
    </Select>
  )
}

export default PathwaySelector
