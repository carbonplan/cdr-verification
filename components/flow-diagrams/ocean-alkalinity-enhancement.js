import Rectangle from './rectangle'
import Grid from './grid'
import Arrow from './arrow'

const Flow = () => {
  return (
    <Grid>
      <Rectangle start={[1, 8]} width={3} borderStyle='none'>
        Seawater
      </Rectangle>

      <Rectangle
        id='4'
        category='net volume'
        start={[5, 3]}
        height={1}
        borderStyle='none'
      >
        Energy
      </Rectangle>
      <Rectangle
        id='5'
        category='net volume'
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
        width={18}
        height={6}
        borderColor='secondary'
        borderStyle='dashed'
        label='Seller'
      />

      <Rectangle start={[7, 8]} width={6} invert>
        Electrochemical separation
      </Rectangle>

      <Arrow start={[14, 9]} length={2} right />
      <Arrow start={[10, 11]} length={2} down />

      <Rectangle id='1' category='operations' invert start={[17, 8]}>
        Base dispersal into ocean
      </Rectangle>

      <Arrow start={[22, 9]} length={2} right />

      <Rectangle start={[8, 13]} borderStyle='none'>
        Acid bi-product disposal
      </Rectangle>

      <Arrow start={[13, 14]} length={2} right />

      <Rectangle id='3' category='gross volume' start={[16, 13]}>
        Long-term fate of acid
      </Rectangle>

      <Rectangle
        start={[25, 6]}
        width={11}
        height={9}
        label='Atmospheric carbon removal'
      />
      <Rectangle id='2a' category='gross volume' start={[26, 7]} height={3}>
        Air sea gas exchange efficiency
      </Rectangle>
      <Rectangle id='2b' category='gross volume' start={[31, 7]} height={3}>
        Calcification response
      </Rectangle>
      <Rectangle id='2c' category='gross volume' start={[26, 11]} height={3}>
        Carbonate vs bicarbonate formation
      </Rectangle>
      <Rectangle id='2d' category='gross volume' start={[31, 11]} height={3}>
        Particulate Organic Carbon response
      </Rectangle>

      <Arrow start={[34, 16]} length={1} down />

      <Rectangle id='6' category='permanence' start={[32, 18]}>
        DIC residence time
      </Rectangle>
    </Grid>
  )
}

export default Flow
