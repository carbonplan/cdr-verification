import Rectangle from '../rectangle'
import Grid from '../grid'
import Arrow from '../arrow'

const Flow = () => {
  return (
    <Grid height={26}>
      <Rectangle
        id='mat-co2'
        start={[3, 2]}
        height={1}
        width={4}
        borderStyle='none'
      />
      <Rectangle
        id='energy-co2'
        start={[6, 2]}
        height={1}
        width={4}
        borderStyle='none'
      />
      <Arrow start={[5, 3]} length={1} down />
      <Arrow start={[8, 3]} length={1} down />

      <Rectangle
        start={[3, 5]}
        width={24}
        height={8}
        label='Project activity'
        secondary
      />

      <Rectangle start={[5, 7]} width={4} label='Macroalgae cultivation' />

      <Arrow start={[10, 9]} length={1} right />

      <Rectangle start={[12, 7]} id='kelp-harvest' width={6} />

      <Arrow start={[19, 9]} length={1} right />

      <Rectangle start={[21, 7]} width={4} label='Macroalgae sinking' />

      <Arrow start={[26, 9]} length={2} right />

      <Rectangle start={[29, 7]} label='Deepwater storage' />
      <Arrow start={[32, 12]} length={2} up />
      <Rectangle id='t-recirculation' start={[29, 15]} />

      <Arrow start={[7, 12]} length={2} down />

      <Rectangle start={[4, 15]} id='surf-comp' />

      <Arrow start={[7, 20]} length={2} down />

      <Rectangle id='asg' start={[4, 23]} />

      <Rectangle
        id='nsad'
        start={[21, 2]}
        height={1}
        width={4}
        borderStyle='none'
      />
      <Arrow start={[23, 4]} length={2} up />
    </Grid>
  )
}

export default Flow
