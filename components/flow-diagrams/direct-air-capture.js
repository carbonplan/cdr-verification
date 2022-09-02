import Rectangle from './rectangle'
import Grid from './grid'
import Arrow from './arrow'

const Flow = () => {
  return (
    <Grid height={20}>
      <Rectangle
        id='3'
        width={4}
        start={[5, 3]}
        height={1}
        borderStyle='none'
      />
      <Rectangle
        id='4'
        width={4}
        start={[8, 3]}
        height={1}
        borderStyle='none'
      />

      <Arrow start={[12, 3]} length={2} right />

      <Rectangle id='5' height={3} start={[15, 2]} />

      <Arrow start={[7, 4]} length={2} down />
      <Arrow start={[10, 4]} length={2} down />
      <Rectangle start={[5, 7]} width={30} height={8} id='7' label='' />
      <Rectangle start={[7, 9]} label='CO₂ capture' />
      <Arrow start={[14, 11]} length={2} right />
      <Rectangle label='CO₂ transportation' start={[17, 9]} />
      <Arrow start={[24, 11]} length={2} right />
      <Rectangle id='1' start={[27, 9]} />
      <Arrow start={[30, 14]} length={2} up />

      <Rectangle id='6' start={[27, 17]} />

      <Rectangle id='2' start={[27, 4]} height={1} borderStyle='none' />
      <Arrow start={[30, 6]} length={2} up />
    </Grid>
  )
}

export default Flow
