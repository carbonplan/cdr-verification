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
        width={28}
        height={8}
        label='Project activity'
        secondary
      />
      <Rectangle start={[3, 8]} id='bio-feedstock' />
      <Arrow start={[10, 10]} length={1} right />
      <Rectangle start={[12, 8]} label='Biomass processing' />
      <Arrow start={[19, 10]} length={1} right />
      <Rectangle id='biomass-storage' start={[21, 8]} />

      <Arrow start={[6, 13]} length={2} down />
      <Rectangle id='baseline-carbon-stored' start={[3, 16]} />
      <Rectangle id='feedstock-use-counterfactual' start={[3, 21]} />
      <Rectangle id='market-effects' start={[3, 26]} />
      <Rectangle id='avoided-non-co2-emissions' start={[3, 31]} />

      <Arrow start={[28, 10]} length={2} right />
      <Rectangle id='soil-c' start={[31, 8]} />

      <Arrow start={[24, 13]} length={2} up />
      <Rectangle id='store-maint-burial' start={[21, 16]} />

      <Rectangle
        id='store-leak-burial'
        start={[21, 3]}
        height={1}
        borderStyle='none'
      />
      <Arrow start={[24, 4]} length={3} up />
    </Grid>
  )
}

export default Flow
