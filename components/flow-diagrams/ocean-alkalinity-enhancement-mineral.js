import Rectangle from './rectangle'
import Grid from './grid'
import Arrow from './arrow'

const Flow = () => {
  return (
    <Grid height={26}>
      <Rectangle
        id='7'
        width={4}
        start={[4, 2]}
        height={1}
        borderStyle='none'
      />
      <Rectangle
        id='8'
        width={4}
        start={[7, 2]}
        height={1}
        borderStyle='none'
      />
      <Arrow start={[6, 3]} length={1} down />
      <Arrow start={[9, 3]} length={1} down />

      <Rectangle
        start={[4, 5]}
        width={10}
        height={8}
        label='Project activity'
        secondary
      />

      <Rectangle start={[6, 7]} id='1' />

      <Arrow start={[13, 9]} length={2} right />

      <Rectangle id='2' start={[16, 7]} />

      <Arrow start={[19, 12]} length={2} down />

      <Rectangle id='6*' start={[15, 16]} width={8} height={3} />

      <Arrow start={[23, 9]} length={2} right />

      <Rectangle id='3' start={[26, 4]} width={8} height={3} />
      <Rectangle id='4' start={[26, 8]} width={8} height={3} />
      <Rectangle id='5' start={[26, 12]} width={8} height={3} />

      <Arrow start={[30, 16]} length={1} down />
      <Rectangle start={[26, 18]} width={8} height={3} label='Enhanced DIC' />
      <Arrow start={[30, 22]} length={1} up />

      <Rectangle id='9' start={[26, 24]} width={8} height={3} />
    </Grid>
  )
}

export default Flow
