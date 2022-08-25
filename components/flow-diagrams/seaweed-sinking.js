import Rectangle from './rectangle'
import Grid from './grid'
import Arrow from './arrow'

const Flow = () => {
  return (
    <Grid>
      <Rectangle
        id='5'
        category='emissions'
        start={[5, 3]}
        height={1}
        width={4}
        borderStyle='none'
      >
        Energy
      </Rectangle>
      <Rectangle
        id='6'
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

      <Rectangle
        start={[5, 6]}
        width={24}
        height={8}
        borderStyle='dashed'
        id='8'
        category='operations'
      />

      <Rectangle start={[7, 8]} width={4} invert>
        Buoy deployment
      </Rectangle>

      <Arrow start={[12, 10]} length={1} right />

      <Rectangle start={[14, 8]} id='1' width={6} category='drawdown'>
        Macroalgae growth on drifting buoy
      </Rectangle>

      <Arrow start={[21, 10]} length={1} right />

      <Rectangle start={[23, 8]} width={4}>
        Buoy sinking
      </Rectangle>

      <Arrow start={[28, 10]} length={2} right />

      <Rectangle id='7' category='permanence' start={[31, 8]}>
        Deepwater recirculation
      </Rectangle>

      <Arrow start={[17, 13]} length={2} down />

      <Rectangle start={[14, 16]} id='3' category='drawdown'>
        Surface competition effects
      </Rectangle>

      <Arrow start={[21, 18]} length={2} right />

      <Rectangle id='4' category='drawdown' start={[24, 16]}>
        Air-sea gas exchange
      </Rectangle>

      <Rectangle
        id='2'
        category='drawdown'
        start={[14, 3]}
        height={1}
        width={4}
        borderStyle='none'
      >
        Leakage
      </Rectangle>
      <Arrow start={[16, 4]} length={1} up />

      <Rectangle
        id='2'
        category='drawdown'
        start={[23, 3]}
        height={1}
        width={4}
        borderStyle='none'
      >
        Leakage
      </Rectangle>
      <Arrow start={[25, 4]} length={1} up />
    </Grid>
  )
}

export default Flow
