import Rectangle from '../rectangle'
import Grid from '../grid'
import Arrow from '../arrow'

const Flow = () => {
  return (
    <Grid height={27}>
      <Rectangle
        id='mat-co2'
        width={4}
        start={[8, 4]}
        height={1}
        borderStyle='none'
      />
      <Rectangle
        id='energy-co2'
        width={4}
        start={[11, 4]}
        height={1}
        borderStyle='none'
      />

      <Arrow start={[15, 4]} length={2} right />
      <Rectangle id='energy-current' start={[18, 2]} />

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

      <Arrow start={[17, 11]} length={4} right />
      <Rectangle start={[22, 9]} id='non-carb-products' />

      <Arrow start={[13, 14]} length={4} down />
      <Rectangle start={[10, 19]} id='carb-mineral' />

      <Arrow start={[17, 21]} length={1} right hideArrow />
      <Arrow start={[18, 19]} length={6} up hideArrow />
      <Arrow start={[18, 19]} length={2} right />
      <Arrow start={[18, 25]} length={2} right />

      <Rectangle id='carb-store' width={5} start={[21, 17]} />
      <Rectangle id='carb-utilize' width={5} start={[21, 23]} />

      <Arrow start={[27, 19]} length={1} right hideArrow />
      <Arrow start={[27, 25]} length={1} right hideArrow />
      <Arrow start={[28, 19]} length={6} up hideArrow />
      <Arrow start={[28, 22]} length={2} right hideArrow />
      <Arrow start={[30, 19]} length={6} up hideArrow />
      <Arrow start={[30, 19]} length={1} right />
      <Arrow start={[30, 25]} length={1} right />

      <Rectangle id='carb-degrade' width={5} start={[32, 17]} />
      <Rectangle id='carb-weather' width={5} start={[32, 23]} />

      <Rectangle
        id='mat-co2'
        start={[2, 11]}
        label='Alkaline feedstock'
        height={2}
        width={4}
        borderStyle='none'
      />
      <Arrow start={[5, 11]} length={4} right />

      <Arrow start={[4, 13]} length={2} down />
      <Rectangle id='carb-baseline-weather' start={[1, 16]} />

      <Arrow start={[4, 7]} length={2} up />
      <Rectangle start={[1, 2]} label='Baseline mineral composition' />
    </Grid>
  )
}

export default Flow
