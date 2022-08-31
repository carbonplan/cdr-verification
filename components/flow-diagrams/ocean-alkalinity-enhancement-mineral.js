import Rectangle from './rectangle'
import Grid from './grid'
import Arrow from './arrow'

const Flow = () => {
  return (
    <Grid>
      <Rectangle
        id='7'
        width={4}
        start={[5, 3]}
        height={1}
        borderStyle='none'
      />
      <Rectangle
        id='8'
        width={4}
        start={[8, 3]}
        height={1}
        borderStyle='none'
      />
      <Arrow start={[7, 4]} length={1} down />
      <Arrow start={[10, 4]} length={1} down />

      <Rectangle
        start={[5, 6]}
        width={10}
        height={8}
        borderStyle='dashed'
        id='10'
        label=''
      />

      <Rectangle start={[7, 8]} invert id='1' />

      <Arrow start={[14, 10]} length={2} right />

      <Rectangle id='2' start={[17, 8]} />

      <Arrow start={[24, 10]} length={2} right />

      <Rectangle id='3' start={[27, 6]} width={8} height={3} />

      <Rectangle id='4' start={[27, 10]} width={8} height={3} />
      <Rectangle id='5*' start={[27, 14]} width={8} height={3} />
      <Rectangle id='6' start={[27, 18]} width={8} height={3} />

      <Arrow start={[31, 22]} length={1} down />

      <Rectangle id='9' start={[27, 24]} width={8} />
    </Grid>
  )
}

export default Flow
