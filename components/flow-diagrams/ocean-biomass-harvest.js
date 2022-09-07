import Rectangle from './rectangle'
import Grid from './grid'
import Arrow from './arrow'

const Flow = () => {
  return (
    <Grid height={18}>
      <Rectangle
        id='5'
        start={[3, 2]}
        height={1}
        width={4}
        borderStyle='none'
      />
      <Rectangle
        id='6'
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

      <Rectangle start={[12, 7]} id='1' width={6} />

      <Arrow start={[19, 9]} length={1} right />

      <Rectangle start={[21, 7]} width={4} label='Macroalgae sinking' />

      <Arrow start={[26, 9]} length={2} right />

      <Rectangle id='7' start={[29, 7]} />

      <Arrow start={[7, 12]} length={2} down />

      <Rectangle start={[4, 15]} id='3' />

      <Arrow start={[11, 17]} length={2} right />

      <Rectangle id='4' start={[14, 15]} />

      <Rectangle
        id='2'
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
