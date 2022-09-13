import Rectangle from './rectangle'
import Grid from './grid'
import Arrow from './arrow'

const Flow = () => {
  return (
    <Grid height={20}>
      <Rectangle
        id='3'
        width={4}
        start={[4, 3]}
        height={1}
        borderStyle='none'
      />
      <Rectangle
        id='4'
        width={4}
        start={[7, 3]}
        height={1}
        borderStyle='none'
      />

      <Arrow start={[11, 3]} length={2} right />

      <Rectangle id='5' height={4} start={[14, 2]} />

      <Arrow start={[6, 4]} length={2} down />
      <Arrow start={[9, 4]} length={2} down />
      <Rectangle
        start={[4, 7]}
        width={30}
        height={8}
        label='Project activity'
        secondary
      />
      <Rectangle start={[6, 9]} label='CO₂ capture' />
      <Arrow start={[13, 11]} length={2} right />
      <Rectangle label='CO₂ transportation' start={[16, 9]} />
      <Arrow start={[23, 11]} length={2} right />
      <Rectangle id='1' start={[26, 9]} />
      <Arrow start={[29, 14]} length={2} up />

      <Rectangle id='6' start={[26, 17]} />

      <Rectangle id='2' start={[26, 4]} height={1} borderStyle='none' />
      <Arrow start={[29, 6]} length={2} up />
    </Grid>
  )
}

export default Flow
