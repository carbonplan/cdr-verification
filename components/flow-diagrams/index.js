import { default as OAEEchem } from './ocean-alkalinity-enhancement-echem'
import { default as OAEMineral } from './ocean-alkalinity-enhancement-mineral'
import { default as DAC } from './direct-air-capture'
import { default as BiCRS } from './biomass-carbon-removal-storage'
import { default as SeaweedSinking } from './ocean-biomass-no-harvest'
import { default as SeaweedSinkingHarvest } from './ocean-biomass-harvest'
import { default as TBS } from './terrestrial-biomass-sinking'
import { default as EnhancedWeathering } from './enhanced-weathering'
import { default as AlkalineWasteMineralization } from './alkaline-waste-mineralization'
import { default as Biochar } from './biochar'
import { default as DOR } from './direct-ocean-removal'

export default {
  'ocean-alkalinity-enhancement-electrochemical': <OAEEchem />,
  'ocean-alkalinity-enhancement-mineral': <OAEMineral />,
  'ocean-biomass-sinking-no-harvest': <SeaweedSinking />,
  'ocean-biomass-sinking-harvest': <SeaweedSinkingHarvest />,
  'enhanced-weathering': <EnhancedWeathering />,
  'direct-air-capture': <DAC />,
  'biomass-carbon-removal-and-storage': <BiCRS />,
  'terrestrial-biomass-sinking': <TBS />,
  'alkaline-waste-mineralization': <AlkalineWasteMineralization />,
  biochar: <Biochar />,
  'direct-ocean-removal': <DOR />,
}
