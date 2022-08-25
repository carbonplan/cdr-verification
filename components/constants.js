import oae from '../data/Ocean_Alkalinity_Enhancement_-_Electrochemical.json'
import seaweed from '../data/Ocean_Biomass_Sinking_No_-_Harvest.json'
import ew from '../data/Enhanced_Weathering.json'

export const CATEGORY_COLORS = {
  drawdown: 'teal',
  emissions: 'yellow',
  // TODO: should we combine `operations` and `permanence` in the data?
  operations: 'orange',
  permanence: 'orange',
  // currently used in `Filter` label
  other: 'orange',
}

export const UNCERTAINTIES = ['negligible', 'low', 'medium', 'high']

// TODO: remove when script generates array of pathways
export const DATA = {
  oae,
  seaweed,
  ew,
}
