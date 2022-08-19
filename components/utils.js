import { UNCERTAINTIES } from './constants'

const sortByUncertainty = (a, b) => {
  if (a.uncertainty_magnitude_max !== b.uncertainty_magnitude_max) {
    return (
      UNCERTAINTIES.indexOf(b.uncertainty_magnitude_max) -
      UNCERTAINTIES.indexOf(a.uncertainty_magnitude_max)
    )
  } else if (a.uncertainty_magnitude_min !== b.uncertainty_magnitude_min) {
    return (
      UNCERTAINTIES.indexOf(b.uncertainty_magnitude_min) -
      UNCERTAINTIES.indexOf(a.uncertainty_magnitude_min)
    )
  } else {
    return a.element.localeCompare(b.element)
  }
}

export const getElements = (elements, filters, sort = 'number') => {
  const filtered = elements.filter((e) =>
    ['permanence', 'operations'].includes(e.category)
      ? filters.other
      : filters[e.category]
  )

  switch (sort) {
    case 'uncertainty':
      return filtered.sort(sortByUncertainty)
    default:
      return filtered.sort((a, b) => a.element.localeCompare(b.element))
  }
}
