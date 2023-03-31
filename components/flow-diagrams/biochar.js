import Rectangle from './rectangle'
import Grid from './grid'
import Arrow from './arrow'

const Flow = () => {
  return (
    <Grid height={33}>
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
        width={20}
        height={8}
        label='Project activity'
        secondary
      />
      <Rectangle start={[11, 7]} id='bio_transformed' />
      <Arrow start={[18, 9]} length={2} right />
      <Rectangle label='Biochar application' start={[21, 7]} />
      <Arrow start={[28, 9]} length={2} right />

      <Arrow start={[4, 2]} length={5} left hideArrow />
      <Arrow start={[4, 2]} length={4} down />
      <Rectangle id='bio_feedstock' start={[1, 7]} />
      <Arrow start={[8, 9]} length={2} right />

      <Arrow start={[4, 12]} length={8} down hideArrow />
      <Arrow start={[4, 20]} length={6} right />
      <Rectangle id='feed_stor' start={[11, 15]} height={3} />
      <Rectangle id='feed_current' start={[11, 19]} height={3} />
      <Rectangle id='LUC_indirect' start={[11, 23]} height={3} />

      <Arrow start={[24, 12]} length={2} down />
      <Rectangle id='soil_c' start={[21, 15]} height={3} />
      <Rectangle id='lime_reduce' start={[21, 19]} height={3} />
      <Rectangle id='fert_reduce' start={[21, 23]} height={3} />
      <Rectangle id='yield_change' start={[21, 27]} height={3} />

      <Rectangle id='bio_storage' start={[31, 7]} />
      <Arrow start={[34, 12]} length={2} down />
      <Rectangle id='bio_degrade' start={[31, 15]} />
    </Grid>
  )
}

export default Flow
