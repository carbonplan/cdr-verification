import { useMemo } from 'react'
import Select from './select'

const PathwaySelector = ({
  pathway,
  pathways,
  setPathway,
  version,
  size,
  sx,
}) => {
  const options = useMemo(
    () => pathways.map((p) => ({ value: p.pathway_id, label: p.pathway_name })),
    [pathways]
  )

  return (
    <Select
      value={pathway}
      options={options}
      onChange={setPathway}
      versionInfo={{
        version,
        href: `/research/cdr-verification/docs/pathways/${pathway}`,
      }}
      sx={sx}
      size={size}
    />
  )
}

export default PathwaySelector
