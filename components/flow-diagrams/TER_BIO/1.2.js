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
      <Rectangle
        id='non-co2-emissions'
        width={6}
        start={[13, 2]}
        height={2}
        borderStyle='none'
      />

      <Arrow start={[8, 3]} length={2} down />
      <Arrow start={[11, 3]} length={2} down />
      <Arrow start={[16, 4]} length={1} up />

      <Rectangle
        start={[6, 6]}
        width={30}
        height={8}
        label='Project activity'
        secondary
      />
      <Rectangle start={[8, 8]} id='bio-feedstock' />
      <Arrow start={[15, 10]} length={2} right />
      <Rectangle start={[18, 8]} label='Biomass processing' />
      <Arrow start={[25, 10]} length={2} right />
      <Rectangle id='bio-sink' start={[28, 8]} />

      <Arrow start={[11, 13]} length={2} down />
      <Rectangle id='baseline-carbon-stored' start={[8, 16]} />
      <Rectangle id='feedstock-use-counterfactual' start={[8, 21]} />
      <Rectangle id='market-effects' start={[8, 26]} />
      <Rectangle id='avoided-non-co2-emissions' start={[8, 31]} />

      <Arrow start={[31, 13]} length={2} down />
      <Rectangle id='deepwater-storage-solid' start={[28, 16]} />
      <Arrow start={[31, 21]} length={1} down />
      <Rectangle id='deepwater-storage-dissolved' start={[28, 23]} />
      <Arrow start={[31, 28]} length={1} down />
      <Rectangle id='deepwater-outgass' start={[28, 30]} />

      <Rectangle id='nsad' start={[28, 3]} height={1} borderStyle='none' />
      <Arrow start={[31, 5]} length={2} up />
    </Grid>
  )
}

export default Flow
