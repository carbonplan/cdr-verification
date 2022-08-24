import Rectangle from './rectangle'
import Grid from './grid'
import Arrow from './arrow'

const Flow = () => {
  return (
    <Grid>
      <Rectangle start={[1, 8]} width={2} borderStyle='none'>
        Seawater
      </Rectangle>
      <Arrow start={[4, 10]} length={2} right />

      <Rectangle
        id='8'
        category='emissions'
        width={4}
        start={[5, 3]}
        height={1}
        borderStyle='none'
      >
        Energy
      </Rectangle>
      <Rectangle
        id='9'
        category='emissions'
        width={4}
        start={[8, 3]}
        height={1}
        borderStyle='none'
      >
        Materials
      </Rectangle>
      <Arrow start={[7, 4]} length={1} down />
      <Arrow start={[10, 4]} length={1} down />

      <Rectangle
        start={[5, 6]}
        width={20}
        height={14}
        borderColor='secondary'
        borderStyle='dashed'
        id='0'
        category='operations'
      />

      <Rectangle start={[7, 8]} invert>
        Electrochemical separation
      </Rectangle>

      <Arrow start={[14, 10]} length={2} right />
      <Arrow start={[10, 13]} length={1} down />

      <Rectangle id='1' category='drawdown' invert start={[17, 8]}>
        Optimal atmospheric removal
      </Rectangle>

      <Arrow start={[24, 10]} length={2} right />

      <Rectangle start={[7, 15]} invert height={3}>
        Acid bi-product disposal
      </Rectangle>

      <Arrow start={[10, 19]} length={2} down />

      <Rectangle id='7' category='drawdown' start={[7, 22]}>
        Long-term fate of acid
      </Rectangle>

      <Rectangle
        id='2'
        category='drawdown'
        start={[27, 6]}
        width={8}
        height={3}
      >
        Carbonate vs. bicarbonate formation
      </Rectangle>
      <Rectangle
        id='3'
        category='drawdown'
        start={[27, 10]}
        width={8}
        height={3}
      >
        Secondary precipitation
      </Rectangle>
      <Rectangle
        id='4'
        category='drawdown'
        start={[27, 14]}
        width={8}
        height={3}
      >
        Calcification response
      </Rectangle>
      <Rectangle
        id='5*'
        category='drawdown'
        start={[27, 18]}
        width={8}
        height={3}
      >
        Particulate Organic Carbon response
      </Rectangle>

      <Arrow start={[31, 22]} length={1} down />

      <Rectangle id='6' category='drawdown' start={[27, 24]} width={8}>
        Air sea gas exchange efficiency
      </Rectangle>

      <Arrow start={[25, 26]} length={1} left />

      <Rectangle id='9' category='permanence' start={[18, 24]}>
        DIC residence time
      </Rectangle>
    </Grid>
  )
}

export default Flow
