import { UNCERTAINTIES } from './constants'

const sortByUncertainty = (a, b) => {
  if (a.uncertainty_impact_max !== b.uncertainty_impact_max) {
    return (
      UNCERTAINTIES.indexOf(b.uncertainty_impact_max) -
      UNCERTAINTIES.indexOf(a.uncertainty_impact_max)
    )
  } else if (a.uncertainty_impact_min !== b.uncertainty_impact_min) {
    return (
      UNCERTAINTIES.indexOf(b.uncertainty_impact_min) -
      UNCERTAINTIES.indexOf(a.uncertainty_impact_min)
    )
  } else {
    return a.number.localeCompare(b.number)
  }
}

export const getComponents = (components, filters, sort = 'component') => {
  const filtered = components.filter((e) => filters[e.category])

  switch (sort) {
    case 'uncertainty':
      return filtered.sort(sortByUncertainty)
    default:
      return filtered.sort(
        (a, b) =>
          Number(a.number.replace(/\D/g, '')) -
          Number(b.number.replace(/\D/g, ''))
      )
  }
}
