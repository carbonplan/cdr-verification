import Rectangle from '../rectangle'
import Grid from '../grid'
import Arrow from '../arrow'

const Flow = () => {
  return (
    <Grid height={33}>
      <Rectangle
        id='mat-co2'
        width={4}
        start={[1, 2]}
        height={1}
        borderStyle='none'
      />
      <Rectangle
        id='energy-co2'
        width={4}
        start={[4, 2]}
        height={1}
        borderStyle='none'
      />
      <Rectangle
        id='non-co2-emissions'
        width={6}
        start={[8, 2]}
        height={2}
        borderStyle='none'
      />

      <Arrow start={[3, 3]} length={2} down />
      <Arrow start={[6, 3]} length={2} down />
      <Arrow start={[11, 4]} length={1} up />
      <Rectangle
        start={[1, 6]}
        width={27}
        height={8}
        label='Project activity'
        secondary
      />

      <Rectangle id='bio-feedstock' start={[2, 8]} />
      <Arrow start={[9, 10]} length={1} right />
      <Rectangle start={[11, 8]} id='bio-transformed' />
      <Arrow start={[18, 10]} length={1} right />
      <Rectangle id='biochar-applied' start={[20, 8]} />
      <Arrow start={[27, 10]} length={2} right />

      <Arrow start={[5, 13]} length={2} down />
      <Rectangle id='baseline-carbon-stored' start={[2, 16]} height={3} />
      <Rectangle id='feedstock-use-counterfactual' start={[2, 20]} height={3} />
      <Rectangle id='market-effects' start={[2, 24]} height={3} />
      <Rectangle id='avoided-non-co2-emissions' start={[2, 28]} height={3} />

      <Arrow start={[23, 13]} length={2} down />
      <Rectangle id='lime-reduce' start={[20, 16]} height={3} />
      <Rectangle id='fert-reduce' start={[20, 20]} height={3} />
      <Rectangle id='yield-change' start={[20, 24]} height={3} />
      <Rectangle id='soil-c' start={[20, 28]} height={3} />

      <Rectangle id='bio-storage' start={[30, 8]} />
      <Arrow start={[33, 13]} length={2} down />
      <Rectangle id='bio-degrade' start={[30, 16]} />
    </Grid>
  )
}

export default Flow
