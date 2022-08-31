import Rectangle from './rectangle'
import Grid from './grid'
import Arrow from './arrow'

const Flow = () => {
  return (
    <Grid>
      <Rectangle
        id='5'
        start={[5, 2]}
        height={1}
        width={4}
        borderStyle='none'
      />
      <Rectangle
        id='6'
        start={[8, 2]}
        height={1}
        width={4}
        borderStyle='none'
      />
      <Arrow start={[7, 3]} length={1} down />
      <Arrow start={[10, 3]} length={1} down />

      <Rectangle
        start={[5, 5]}
        width={24}
        height={8}
        borderStyle='dashed'
        id='8'
        label=''
      />

      <Rectangle start={[7, 7]} width={4} invert label='Buoy deployment' />

      <Arrow start={[12, 9]} length={1} right />

      <Rectangle start={[14, 7]} id='1' width={6} />

      <Arrow start={[21, 9]} length={1} right />

      <Rectangle start={[23, 7]} width={4} label='Buoy sinking' />

      <Arrow start={[28, 9]} length={2} right />

      <Rectangle id='7' start={[31, 7]} />

      <Arrow start={[17, 12]} length={2} down />

      <Rectangle start={[14, 15]} id='3' />

      <Arrow start={[21, 17]} length={2} right />

      <Rectangle id='4' start={[24, 15]} />

      <Rectangle
        id='2'
        start={[15, 2]}
        height={1}
        width={4}
        borderStyle='none'
      />
      <Arrow start={[17, 3]} length={1} up />

      <Rectangle
        id='2'
        start={[23, 2]}
        height={1}
        width={4}
        borderStyle='none'
      />
      <Arrow start={[25, 3]} length={1} up />
    </Grid>
  )
}

export default Flow
