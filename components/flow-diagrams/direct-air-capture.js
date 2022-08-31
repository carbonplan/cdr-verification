import Rectangle from './rectangle'
import Grid from './grid'
import Arrow from './arrow'

const Flow = () => {
  return (
    <Grid>
      <Rectangle
        id='5'
        width={4}
        start={[5, 2]}
        height={1}
        borderStyle='none'
      />
      <Rectangle
        id='3'
        width={4}
        start={[8, 2]}
        height={1}
        borderStyle='none'
      />

      <Arrow start={[12, 2]} length={2} right />

      <Rectangle id='4' height={3} start={[15, 1]} />

      <Arrow start={[7, 3]} length={1} down />
      <Arrow start={[10, 3]} length={1} down />
      <Rectangle
        start={[5, 5]}
        width={30}
        height={8}
        borderStyle='dashed'
        id='7'
        label=''
      />
      <Rectangle start={[7, 7]} invert label='CO₂ capture' />
      <Arrow start={[14, 9]} length={2} right />
      <Rectangle label='CO₂ transportation' invert start={[17, 7]} />
      <Arrow start={[24, 9]} length={2} right />
      <Rectangle id='1' invert start={[27, 7]} />
      <Arrow start={[30, 12]} length={2} up />

      <Rectangle id='6' start={[27, 15]} />

      <Rectangle id='2' start={[27, 2]} height={1} borderStyle='none' />
      <Arrow start={[30, 3]} length={1} up />
    </Grid>
  )
}

export default Flow
