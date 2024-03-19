import Rectangle from '../rectangle'
import Grid from '../grid'
import Arrow from '../arrow'

const Flow = () => {
  return (
    <Grid height={33}>
      <Rectangle
        id='mat-co2'
        width={4}
        start={[6, 2]}
        height={1}
        borderStyle='none'
      />
      <Rectangle
        id='energy-co2'
        width={4}
        start={[9, 2]}
        height={1}
        borderStyle='none'
      />

      <Arrow start={[8, 3]} length={1} down />
      <Arrow start={[11, 3]} length={1} down />
      <Rectangle
        start={[6, 5]}
        width={30}
        height={8}
        label='Project activity'
        secondary
      />
      <Rectangle start={[8, 7]} id='bio-feedstock' />
      <Arrow start={[15, 9]} length={2} right />
      <Rectangle start={[18, 7]} id='bio-transformed' />
      <Arrow start={[25, 9]} length={2} right />
      <Rectangle id='bio-injection' start={[28, 7]} />

      <Arrow start={[11, 12]} length={2} down />
      <Rectangle id='baseline-carbon-stored' start={[8, 15]} />
      <Rectangle id='feedstock-use-counterfactual' start={[8, 20]} />
      <Rectangle id='market-effects' start={[8, 25]} />
      <Rectangle id='avoided-non-co2-emissions' start={[8, 30]} />

      <Arrow start={[31, 12]} length={2} up />
      <Rectangle id='store-maint' start={[28, 15]} />

      <Rectangle
        id='store-leak-bioinject'
        start={[28, 2]}
        height={1}
        borderStyle='none'
      />
      <Arrow start={[31, 4]} length={2} up />
    </Grid>
  )
}

export default Flow
