import Rectangle from './rectangle'
import Grid from './grid'
import Arrow from './arrow'

const Flow = () => {
  return (
    <Grid>
      <Rectangle
        id='5'
        category='net volume'
        start={[5, 3]}
        height={1}
        borderStyle='none'
      >
        Energy
      </Rectangle>
      <Rectangle
        id='6'
        category='net volume'
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
        width={24}
        height={6}
        borderColor='secondary'
        borderStyle='dashed'
        label='Seller'
      />

      <Rectangle start={[7, 8]} id='1' category='operations' invert>
        Buoy deployment
      </Rectangle>

      <Arrow start={[12, 9]} length={1} right />

      <Rectangle start={[14, 8]} id='2' width={6} category='gross volume'>
        Macroalgae growth on drifting buoy
      </Rectangle>

      <Arrow start={[21, 9]} length={1} right />

      <Rectangle start={[23, 8]}>Buoy sinking</Rectangle>

      <Arrow start={[28, 9]} length={2} right />

      <Rectangle id='7' category='permanence' start={[31, 8]}>
        Deepwater recirculation
      </Rectangle>

      <Arrow start={[17, 11]} length={2} down />

      <Rectangle start={[15, 14]}>Acid bi-product disposal</Rectangle>
      <Rectangle start={[15, 16]}>% of DIC from deepwater</Rectangle>

      <Arrow start={[20, 16]} length={2} right />

      <Rectangle id='3' category='gross volume' start={[23, 15]}>
        Atmospheric carbon removal
      </Rectangle>

      <Rectangle
        id='4'
        category='gross volume'
        start={[14, 3]}
        height={1}
        borderStyle='none'
      >
        Leakage
      </Rectangle>
      <Arrow start={[16, 4]} length={1} up />

      <Rectangle
        id='4'
        category='gross volume'
        start={[23, 3]}
        height={1}
        borderStyle='none'
      >
        Leakage
      </Rectangle>
      <Arrow start={[25, 4]} length={1} up />
    </Grid>
  )
}

export default Flow
