import { default as ALK_WASTE_MIN } from './ALK_WASTE_MIN'
import { default as BiCRS } from './BiCRS'
import { default as BIO_INJECTION } from './BIO_INJECTION'
import { default as BIOCHAR } from './BIOCHAR'
import { default as DAC } from './DAC'
import { default as DOR } from './DOR'
import { default as EW } from './EW'
import { default as OAE_echem } from './OAE_echem'
import { default as OAE_mineral } from './OAE_mineral'
import { default as OCEAN_BIO_no_harvest } from './OCEAN_BIO_no_harvest'
import { default as OCEAN_BIO_harvest } from './OCEAN_BIO_harvest'
import { default as TER_BIO } from './TER_BIO'

export default {
  'alkaline-waste-mineralization': ALK_WASTE_MIN,
  'biomass-carbon-removal-and-storage': BiCRS,
  biochar: BIOCHAR,
  'biomaterial-injection': BIO_INJECTION,
  'direct-air-capture': DAC,
  'direct-ocean-removal': DOR,
  'enhanced-weathering': EW,
  'ocean-alkalinity-enhancement-electrochemical': OAE_echem,
  'ocean-alkalinity-enhancement-mineral': OAE_mineral,
  'ocean-biomass-sinking-no-harvest': OCEAN_BIO_no_harvest,
  'ocean-biomass-sinking-harvest': OCEAN_BIO_harvest,
  'terrestrial-biomass-sinking': TER_BIO,
}
