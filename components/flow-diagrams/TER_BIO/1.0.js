import Rectangle from '../rectangle'
import Grid from '../grid'
import Arrow from '../arrow'

const Flow = () => {
  return (
    <Grid height={27}>
      <Rectangle
        id='mat_co2'
        width={4}
        start={[9, 2]}
        height={1}
        borderStyle='none'
      />
      <Rectangle
        id='energy_co2'
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
      <Rectangle id='terr_added' start={[13, 7]} />

      <Arrow start={[20, 9]} length={6} right />
      <Rectangle start={[27, 7]} label='Deepwater storage' />
      <Arrow start={[30, 12]} length={2} up />

      <Rectangle id='t_recirculation' start={[27, 15]} />

      <Rectangle id='nsad' start={[19, 2]} height={1} borderStyle='none' />
      <Arrow start={[18, 2]} length={4} up hideArrow />
      <Arrow start={[18, 2]} length={2} right />

      <Rectangle
        id='mat_co2'
        start={[5, 9]}
        label='Biomass feedstock'
        height={2}
        width={4}
        borderStyle='none'
      />
      <Arrow start={[8, 9]} length={4} right />

      <Arrow start={[7, 11]} length={10} down hideArrow />
      <Arrow start={[7, 21]} length={3} right />
      <Rectangle id='feed_stor' start={[11, 14]} />
      <Rectangle id='feed_current' start={[11, 19]} />
      <Rectangle id='LUC_indirect' start={[11, 24]} />
    </Grid>
  )
}

export default Flow
