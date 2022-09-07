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
        label='CDR activity'
        secondary
      />

      <Rectangle start={[6, 7]} id='1' />

      <Arrow start={[13, 9]} length={2} right />

      <Rectangle id='2' start={[16, 7]} />

      <Arrow start={[23, 9]} length={2} right />

      <Rectangle id='3' start={[26, 5]} width={8} height={3} />

      <Rectangle id='4' start={[26, 9]} width={8} height={3} />
      <Rectangle id='5*' start={[26, 13]} width={8} height={3} />
      <Rectangle id='6' start={[26, 17]} width={8} height={3} />

      <Arrow start={[30, 21]} length={1} down />

      <Rectangle id='9' start={[26, 23]} width={8} height={3} />
    </Grid>
  )
}

export default Flow
