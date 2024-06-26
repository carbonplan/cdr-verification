import Rectangle from '../rectangle'
import Grid from '../grid'
import Arrow from '../arrow'

const Flow = () => {
  return (
    <Grid height={26}>
      <Rectangle
        id='mat-co2'
        start={[1, 2]}
        height={1}
        width={4}
        borderStyle='none'
      />
      <Rectangle
        id='energy-co2'
        start={[4, 2]}
        height={1}
        width={4}
        borderStyle='none'
      />
      <Arrow start={[3, 3]} length={1} down />
      <Arrow start={[6, 3]} length={1} down />

      <Rectangle
        start={[1, 5]}
        width={10}
        height={8}
        label='Project activity'
        secondary
      />

      <Rectangle start={[3, 7]} width={6} label='Buoy seeding and deployment' />

      <Arrow start={[10, 9]} length={2} right />

      <Rectangle start={[13, 7]} id='kelp-grown' width={6} />

      <Arrow start={[20, 9]} length={1} right />

      <Rectangle start={[22, 7]} width={6} label='Buoy sinking' />

      <Arrow start={[29, 9]} length={1} right />

      <Rectangle start={[31, 7]} id='deepwater-storage-solid' />

      <Arrow start={[34, 12]} length={2} down />

      <Rectangle id='deepwater-storage-dissolved' start={[31, 15]} />
      <Arrow start={[34, 20]} length={2} down />
      <Rectangle id='deepwater-outgass' start={[31, 23]} />

      <Arrow start={[16, 12]} length={2} down />

      <Rectangle start={[13, 15]} id='surf-comp' />

      <Arrow start={[16, 20]} length={2} down />

      <Rectangle id='asg' start={[13, 23]} />

      <Rectangle
        id='nsad'
        start={[14, 2]}
        height={1}
        width={4}
        borderStyle='none'
      />
      <Arrow start={[16, 4]} length={2} up />

      <Rectangle
        id='nsad'
        start={[23, 2]}
        height={1}
        width={4}
        borderStyle='none'
      />
      <Arrow start={[25, 4]} length={2} up />
    </Grid>
  )
}

export default Flow
