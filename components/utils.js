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
    return a.element.localeCompare(b.element)
  }
}

export const getElements = (elements, filters, sort = 'component') => {
  const filtered = elements.filter((e) => filters[e.category])

  switch (sort) {
    case 'uncertainty':
      return filtered.sort(sortByUncertainty)
    default:
      return filtered.sort(
        (a, b) =>
          Number(a.element.replace(/\D/g, '')) -
          Number(b.element.replace(/\D/g, ''))
      )
  }
}
