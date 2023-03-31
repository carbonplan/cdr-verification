import Rectangle from '../rectangle'
import Grid from '../grid'
import Arrow from '../arrow'

const Flow = () => {
  return (
    <Grid height={27}>
      <Rectangle
        id='mat_co2'
        width={4}
        start={[8, 4]}
        height={1}
        borderStyle='none'
      />
      <Rectangle
        id='energy_co2'
        width={4}
        start={[11, 4]}
        height={1}
        borderStyle='none'
      />

      <Arrow start={[15, 4]} length={2} right />
      <Rectangle id='energy_current' start={[18, 2]} />

      <Arrow start={[10, 5]} length={1} down />
      <Arrow start={[13, 5]} length={1} down />
      <Rectangle
        start={[8, 7]}
        width={10}
        height={8}
        label='Project activity'
        secondary
      />
      <Rectangle label='Enhanced weathering intervention' start={[10, 9]} />

      <Arrow start={[17, 11]} length={2} right hideArrow />
      <Arrow start={[19, 9]} length={2} right />
      <Arrow start={[19, 14]} length={2} right />
      <Arrow start={[19, 9]} length={5} up hideArrow />

      <Rectangle start={[22, 7]} id='non-carb_products' />
      <Rectangle start={[22, 12]} id='carb_min' />

      <Arrow start={[29, 14]} length={4} right hideArrow />
      <Arrow start={[33, 14]} length={1} down />
      <Rectangle id='carb_store' start={[30, 17]} />
      <Rectangle id='carb_utilize' start={[30, 23]} />
      <Arrow start={[27, 19]} length={2} left hideArrow />
      <Arrow start={[27, 25]} length={2} left hideArrow />
      <Arrow start={[27, 19]} length={6} up hideArrow />
      <Arrow start={[23, 22]} length={4} left hideArrow />
      <Arrow start={[23, 19]} length={5} up hideArrow />
      <Arrow start={[21, 19]} length={2} left />
      <Arrow start={[21, 24]} length={2} left />
      <Rectangle id='carb_degrade' start={[14, 17]} />
      <Rectangle id='carb_weather' start={[14, 22]} />

      <Rectangle
        id='mat_co2'
        start={[2, 11]}
        label='Alkaline feedstock'
        height={2}
        width={4}
        borderStyle='none'
      />
      <Arrow start={[5, 11]} length={4} right />

      <Arrow start={[4, 13]} length={2} down />
      <Rectangle id='carb_baseline' start={[1, 16]} />

      <Arrow start={[4, 7]} length={2} up />
      <Rectangle start={[1, 2]} label='Baseline mineral composition' />
    </Grid>
  )
}

export default Flow
