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
      <Rectangle
        id='non-co2-emissions'
        width={6}
        start={[10, 2]}
        height={2}
        borderStyle='none'
      />

      <Arrow start={[5, 3]} length={2} down />
      <Arrow start={[8, 3]} length={2} down />
      <Arrow start={[13, 4]} length={1} up />

      <Rectangle
        start={[3, 6]}
        width={30}
        height={8}
        label='Project activity'
        secondary
      />
      <Rectangle start={[5, 8]} id='bio-feedstock' />
      <Arrow start={[12, 10]} length={2} right />
      <Rectangle start={[15, 8]} id='bio-transformed' />
      <Arrow start={[22, 10]} length={2} right />
      <Rectangle id='bio-injection' start={[25, 8]} />

      <Arrow start={[8, 13]} length={2} down />
      <Rectangle id='baseline-carbon-stored' start={[5, 16]} />
      <Rectangle id='feedstock-use-counterfactual' start={[5, 21]} />
      <Rectangle id='market-effects' start={[5, 26]} />
      <Rectangle id='avoided-non-co2-emissions' start={[5, 31]} />

      <Arrow start={[28, 13]} length={2} up />
      <Rectangle id='store-maint' start={[25, 16]} />

      <Rectangle
        id='store-leak-bioinject'
        start={[25, 3]}
        height={1}
        borderStyle='none'
      />
      <Arrow start={[28, 5]} length={2} up />
    </Grid>
  )
}

export default Flow
