import { default as BiCRS } from './BiCRS'
import { default as DAC } from './DAC'
import { default as EW } from './EW'
import { default as OAE_echem } from './OAE_echem'
import { default as OAE_mineral } from './OAE_mineral'
import { default as OCEAN_BIO_no_harvest } from './OCEAN_BIO_no_harvest'
import { default as OCEAN_BIO_harvest } from './OCEAN_BIO_harvest'
import { default as TER_BIO } from './TER_BIO'

export default {
  'enhanced-weathering': EW,
  'direct-air-capture': DAC,
  'biomass-carbon-removal-and-storage': BiCRS,
  'ocean-alkalinity-enhancement-electrochemical': OAE_echem,
  'ocean-alkalinity-enhancement-mineral': OAE_mineral,
  'ocean-biomass-sinking-no-harvest': OCEAN_BIO_no_harvest,
  'ocean-biomass-sinking-harvest': OCEAN_BIO_harvest,
  'terrestrial-biomass-sinking': TER_BIO,
}
