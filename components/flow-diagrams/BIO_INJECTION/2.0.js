import Rectangle from '../rectangle'
import Grid from '../grid'
import Arrow from '../arrow'

const Flow = () => {
  return (
    <Grid height={33}>
      <Rectangle
        id='mat-co2'
        width={4}
        start={[3, 2]}
        height={1}
        borderStyle='none'
      />
      <Rectangle
        id='energy-co2'
        width={4}
        start={[6, 2]}
        height={1}
        borderStyle='none'
      />

      <Arrow start={[5, 3]} length={1} down />
      <Arrow start={[8, 3]} length={1} down />
      <Rectangle
        start={[3, 5]}
        width={30}
        height={8}
        label='Project activity'
        secondary
      />
      <Rectangle start={[5, 7]} id='bio-feedstock' />
      <Arrow start={[12, 9]} length={2} right />
      <Rectangle start={[15, 7]} id='bio-transformed' />
      <Arrow start={[22, 9]} length={2} right />
      <Rectangle id='bio-injection' start={[25, 7]} />

      <Arrow start={[8, 12]} length={2} down />
      <Rectangle id='baseline-carbon-stored' start={[5, 15]} />
      <Rectangle id='feedstock-use-counterfactual' start={[5, 20]} />
      <Rectangle id='market-effects' start={[5, 25]} />
      <Rectangle id='avoided-non-co2-emissions' start={[5, 30]} />

      <Arrow start={[28, 12]} length={2} up />
      <Rectangle id='store-maint' start={[25, 15]} />

      <Rectangle
        id='store-leak-bioinject'
        start={[25, 2]}
        height={1}
        borderStyle='none'
      />
      <Arrow start={[28, 4]} length={2} up />
    </Grid>
  )
}

export default Flow
