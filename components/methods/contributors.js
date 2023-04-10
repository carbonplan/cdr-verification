import { Table } from '@carbonplan/components'

const normalize = (list, affiliationOnly) => {
  return [
    ...new Set(
      list
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(
          ({ name, affiliation }) =>
            `${affiliationOnly ? (affiliation || name).trim() : name.trim()}${
              affiliation && !affiliationOnly ? ` (${affiliation.trim()})` : ''
            }`
        )
    ),
  ].join(', ')
}

const Contributors = ({ contributors }) => {
  return (
    <Table
      columns={[3, 3, 3, 3]}
      start={[
        [1, 1, 1, 1],
        [1, 2, 2, 2],
      ]}
      width={[
        [3, 1, 1, 1],
        [3, 2, 2, 2],
      ]}
      data={[
        ['CDR Companies', normalize(contributors['CDR Companies'], true)],
        ['Scientific Experts', normalize(contributors['Scientific Experts'])],
        ['Ecosystem Actors', normalize(contributors['Ecosystem Actors'])],
        ['MRV Companies', normalize(contributors['MRV Companies'])],
      ]}
    />
  )
}

export default Contributors
