import Rectangle from './rectangle'
import Grid from './grid'
import Arrow from './arrow'

const Flow = () => {
  return (
    <Grid height={24}>
      <Rectangle
        id='6'
        width={4}
        start={[9, 2]}
        height={1}
        borderStyle='none'
      />
      <Rectangle
        id='7'
        width={4}
        start={[12, 2]}
        height={1}
        borderStyle='none'
      />

      <Arrow start={[11, 3]} length={1} down />
      <Arrow start={[14, 3]} length={1} down />
      <Rectangle
        start={[9, 5]}
        width={14}
        height={8}
        label='Project activity'
        secondary
      />
      <Rectangle id='1' start={[13, 7]} />

      <Arrow start={[20, 9]} length={6} right />
      <Rectangle start={[27, 7]} label='Deepwater storage' />
      <Arrow start={[30, 12]} length={2} up />

      <Rectangle id='8' start={[27, 15]} />

      <Rectangle id='2' start={[19, 2]} height={1} borderStyle='none' />
      <Arrow start={[18, 2]} length={4} up hideArrow />
      <Arrow start={[18, 2]} length={2} right />

      <Rectangle
        id='6'
        start={[5, 9]}
        label='Biomass feedstock'
        height={2}
        width={4}
        borderStyle='none'
      />
      <Arrow start={[8, 9]} length={4} right />

      <Arrow start={[7, 11]} length={8} down hideArrow />
      <Arrow start={[7, 19]} length={3} right />
      <Rectangle id='3' height={3} start={[11, 14]} />
      <Rectangle id='4' height={3} start={[11, 18]} />
      <Rectangle id='5' height={3} start={[11, 22]} />
    </Grid>
  )
}

export default Flow
