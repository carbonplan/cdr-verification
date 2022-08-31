import Rectangle from './rectangle'
import Grid from './grid'
import Arrow from './arrow'

const Flow = () => {
  return (
    <Grid>
      <Rectangle
        id='5'
        width={4}
        start={[5, 3]}
        height={1}
        borderStyle='none'
      />
      <Rectangle
        id='3'
        width={4}
        start={[8, 3]}
        height={1}
        borderStyle='none'
      />

      <Arrow start={[12, 3]} length={2} right />

      <Rectangle id='4' width={4} start={[15, 1]} />

      <Arrow start={[7, 4]} length={1} down />
      <Arrow start={[10, 4]} length={1} down />
      <Rectangle
        start={[5, 6]}
        width={30}
        height={8}
        borderStyle='dashed'
        id='7'
        label=''
      />
      <Rectangle start={[7, 8]} invert label='CO₂ capture' />
      <Arrow start={[14, 10]} length={2} right />
      <Rectangle label='CO₂ transportation' invert start={[17, 8]} />
      <Arrow start={[24, 10]} length={2} right />
      <Rectangle id='1' invert start={[27, 8]} />
      <Arrow start={[30, 13]} length={2} up />

      <Rectangle id='6' start={[27, 16]} />

      <Rectangle id='2' start={[27, 3]} height={1} borderStyle='none' />
      <Arrow start={[30, 4]} length={1} up />
    </Grid>
  )
}

export default Flow
