import Rectangle from './rectangle'
import Grid from './grid'
import Arrow from './arrow'

const Flow = () => {
  return (
    <Grid>
      <Rectangle
        start={[1, 8]}
        width={3}
        id='7'
        category='emissions'
        borderStyle='none'
      >
        Mineral feedstock
      </Rectangle>

      <Rectangle
        id='4'
        category='emissions'
        start={[5, 3]}
        height={1}
        borderStyle='none'
      >
        Energy
      </Rectangle>
      <Rectangle
        id='5'
        category='emissions'
        start={[8, 3]}
        height={1}
        borderStyle='none'
      >
        Materials
      </Rectangle>
      <Arrow start={[7, 4]} length={1} down />
      <Arrow start={[10, 4]} length={1} down />

      <Arrow start={[4, 9]} length={2} right />

      <Rectangle
        start={[5, 6]}
        width={25}
        height={6}
        borderColor='secondary'
        borderStyle='dashed'
        label='Seller'
      />

      <Rectangle start={[7, 8]} id='1' category='operations' invert>
        Mineral applications
      </Rectangle>

      <Arrow start={[12, 9]} length={2} right />

      <Rectangle id='2' category='drawdown' start={[15, 8]}>
        Mineral weathering
      </Rectangle>

      <Arrow start={[20, 9]} length={2} right />

      <Rectangle id='4' category='drawdown' start={[23, 8]} width={5}>
        Secondary mineral weathering
      </Rectangle>

      <Arrow start={[29, 9]} length={3} right />
      <Arrow start={[31, 9]} length={3} down hideArrow />
      <Arrow start={[31, 12]} length={2} right />

      <Rectangle id='9' category='permanence' start={[33, 8]}>
        DIC residence time
      </Rectangle>

      <Rectangle
        id='5'
        category='drawdown'
        start={[33, 12]}
        height={1}
        borderStyle='none'
      >
        Leakage
      </Rectangle>

      <Arrow start={[9, 11]} length={2} down />

      <Rectangle start={[6, 14]} width={6} id='8' category='emissions'>
        Agricultural system counterfactual
      </Rectangle>

      <Arrow start={[17, 11]} length={2} up />

      <Rectangle id='3' category='drawdown' start={[15, 14]}>
        Non-CO₂ acid sources
      </Rectangle>
    </Grid>
  )
}

export default Flow
