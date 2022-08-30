import oae from '../data/Ocean_Alkalinity_Enhancement_-_Electrochemical.json'
import seaweed from '../data/Ocean_Biomass_Sinking_No_-_Harvest.json'
import ew from '../data/Enhanced_Weathering.json'

export const CATEGORY_COLORS = {
  drawdown: 'teal',
  emissions: 'yellow',
  operations: 'red',
  permanence: 'pink',
}

export const UNCERTAINTIES = [
  'negligible',
  'low',
  'medium',
  'high',
  'very high',
]

// TODO: remove when script generates array of pathways
export const DATA = {
  oae,
  seaweed,
  ew,
}
