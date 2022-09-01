import Rectangle from './rectangle'
import Grid from './grid'
import Arrow from './arrow'

const Flow = () => {
  return (
    <Grid>
      <Rectangle
        id='6'
        width={4}
        start={[5, 2]}
        height={1}
        borderStyle='none'
      />
      <Rectangle
        id='7'
        width={4}
        start={[8, 2]}
        height={1}
        borderStyle='none'
      />

      <Arrow start={[7, 3]} length={1} down />
      <Arrow start={[10, 3]} length={1} down />
      <Rectangle start={[5, 5]} width={14} height={8} id='9' label='' />
      <Rectangle id='1' invert start={[9, 7]} />
      <Arrow start={[16, 9]} length={6} right />
      <Rectangle id='8' start={[23, 7]} />

      <Rectangle id='2' start={[15, 2]} height={1} borderStyle='none' />
      <Arrow start={[18, 3]} length={1} up />

      <Rectangle
        id='6'
        start={[1, 9]}
        label='Biomass feedstock'
        height={2}
        width={4}
        borderStyle='none'
      />
      <Arrow start={[4, 9]} length={4} right />

      <Arrow start={[3, 11]} length={8} down hideArrow />
      <Arrow start={[3, 19]} length={3} right />
      <Rectangle id='3' height={3} start={[7, 14]} />
      <Rectangle id='4' height={3} start={[7, 18]} />
      <Rectangle id='5' height={3} start={[7, 22]} />
    </Grid>
  )
}

export default Flow
