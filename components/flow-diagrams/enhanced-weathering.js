import Rectangle from './rectangle'
import Grid from './grid'
import Arrow from './arrow'

const Flow = () => {
  return (
    <Grid>
      <Rectangle
        start={[1, 8]}
        width={3}
        height={2}
        id='7'
        category='emissions'
        borderStyle='none'
      >
        Mineral feedstock
      </Rectangle>

      <Rectangle
        id='7'
        category='emissions'
        start={[5, 3]}
        height={1}
        width={4}
        borderStyle='none'
      >
        Energy
      </Rectangle>
      <Rectangle
        id='8'
        category='emissions'
        start={[8, 3]}
        height={1}
        width={4}
        borderStyle='none'
      >
        Materials
      </Rectangle>
      <Arrow start={[7, 4]} length={1} down />
      <Arrow start={[10, 4]} length={1} down />

      <Arrow start={[4, 9]} length={2} right />

      <Rectangle
        start={[5, 6]}
        width={16}
        height={8}
        borderColor='secondary'
        borderStyle='dashed'
        label='Seller'
      />

      <Rectangle start={[7, 8]} id='1' category='drawdown' width={4} invert>
        Mineral applications
      </Rectangle>

      <Arrow start={[12, 10]} length={2} right />

      <Rectangle id='2' category='drawdown' width={4} start={[15, 8]}>
        Mineral weathering
      </Rectangle>

      <Arrow start={[20, 10]} length={2} right />

      <Rectangle id='4' category='drawdown' start={[23, 5]} width={5}>
        Secondary mineral formation
      </Rectangle>
      <Rectangle category='drawdown' start={[23, 10]} width={5}>
        Superficial carbonate formation
      </Rectangle>
      <Rectangle category='drawdown' start={[23, 15]} width={5}>
        DIC run-off
      </Rectangle>

      <Arrow start={[29, 12]} length={2} right />

      <Rectangle id='11' category='permanence' start={[32, 10]}>
        Superficial carbonate durability
      </Rectangle>

      <Arrow start={[29, 17]} length={2} right />
      <Arrow start={[30, 17]} length={3} down hideArrow />
      <Arrow start={[30, 20]} length={2} right />

      <Rectangle id='12' category='permanence' start={[32, 15]}>
        DIC residence time
      </Rectangle>

      <Rectangle
        id='5'
        category='drawdown'
        start={[31, 21]}
        height={1}
        borderStyle='none'
      >
        Leakage
      </Rectangle>

      <Arrow start={[9, 13]} length={2} down />

      <Rectangle
        start={[6, 16]}
        width={6}
        height={3}
        id='6'
        category='drawdown'
      >
        Soil carbon impacts
      </Rectangle>
      <Rectangle
        start={[6, 20]}
        width={6}
        height={3}
        id='9'
        category='drawdown'
      >
        Agricultural lime use change
      </Rectangle>
      <Rectangle
        start={[6, 24]}
        width={6}
        height={3}
        id='10'
        category='drawdown'
      >
        Fertilizer use change
      </Rectangle>

      <Arrow start={[17, 13]} length={2} up />

      <Rectangle
        id='3'
        category='drawdown'
        width={4}
        height={3}
        start={[15, 16]}
      >
        Non-CO₂ acid sources
      </Rectangle>
    </Grid>
  )
}

export default Flow
