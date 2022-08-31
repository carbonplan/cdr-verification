import { default as OAEEchem } from './ocean-alkalinity-enhancement-echem'
import { default as OAEMineral } from './ocean-alkalinity-enhancement-mineral'
import { default as DAC } from './direct-air-capture'
import { default as BiCRS } from './biomass-carbon-removal-storage'
import { default as SeaweedSinking } from './ocean-biomass-no-harvest'
import { default as SeaweedSinkingHarvest } from './ocean-biomass-harvest'
import { default as TBS } from './terrestrial-biomass-sinking'
import { default as EnhancedWeathering } from './enhanced-weathering'

export default {
  'Ocean_Alkalinity_Enhancement_-_Electrochemical': <OAEEchem />,
  'Ocean_Alkalinity_Enhancement_-_Mineral': <OAEMineral />,
  'Ocean_Biomass_Sinking_No_-_Harvest': <SeaweedSinking />,
  'Ocean_Biomass_Sinking_-_Harvest': <SeaweedSinkingHarvest />,
  Enhanced_Weathering: <EnhancedWeathering />,
  Direct_Air_Capture: <DAC />,
  Biomass_Carbon_Removal_and_Storage: <BiCRS />,
  Terrestrial_Biomass_Sinking: <TBS />,
}
