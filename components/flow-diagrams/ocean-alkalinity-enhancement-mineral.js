import Rectangle from './rectangle'
import Grid from './grid'
import Arrow from './arrow'

const Flow = () => {
  return (
    <Grid height={26}>
      <Rectangle
        id='7'
        width={4}
        start={[5, 2]}
        height={1}
        borderStyle='none'
      />
      <Rectangle
        id='8'
        width={4}
        start={[8, 2]}
        height={1}
        borderStyle='none'
      />
      <Arrow start={[7, 3]} length={1} down />
      <Arrow start={[10, 3]} length={1} down />

      <Rectangle start={[5, 5]} width={10} height={8} id='10' label='' />

      <Rectangle start={[7, 7]} id='1' />

      <Arrow start={[14, 9]} length={2} right />

      <Rectangle id='2' start={[17, 7]} />

      <Arrow start={[24, 9]} length={2} right />

      <Rectangle id='3' start={[27, 5]} width={8} height={3} />

      <Rectangle id='4' start={[27, 9]} width={8} height={3} />
      <Rectangle id='5*' start={[27, 13]} width={8} height={3} />
      <Rectangle id='6' start={[27, 17]} width={8} height={3} />

      <Arrow start={[31, 21]} length={1} down />

      <Rectangle id='9' start={[27, 23]} width={8} />
    </Grid>
  )
}

export default Flow
