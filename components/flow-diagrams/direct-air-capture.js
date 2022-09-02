import Rectangle from './rectangle'
import Grid from './grid'
import Arrow from './arrow'

const Flow = () => {
  return (
    <Grid height={19}>
      <Rectangle
        id='3'
        width={4}
        start={[5, 2]}
        height={1}
        borderStyle='none'
      />
      <Rectangle
        id='4'
        width={4}
        start={[8, 2]}
        height={1}
        borderStyle='none'
      />

      <Arrow start={[12, 2]} length={2} right />

      <Rectangle id='5' height={3} start={[15, 1]} />

      <Arrow start={[7, 3]} length={2} down />
      <Arrow start={[10, 3]} length={2} down />
      <Rectangle start={[5, 6]} width={30} height={8} id='7' label='' />
      <Rectangle start={[7, 8]} label='CO₂ capture' />
      <Arrow start={[14, 10]} length={2} right />
      <Rectangle label='CO₂ transportation' start={[17, 8]} />
      <Arrow start={[24, 10]} length={2} right />
      <Rectangle id='1' start={[27, 8]} />
      <Arrow start={[30, 13]} length={2} up />

      <Rectangle id='6' start={[27, 16]} />

      <Rectangle id='2' start={[27, 3]} height={1} borderStyle='none' />
      <Arrow start={[30, 5]} length={2} up />
    </Grid>
  )
}

export default Flow
