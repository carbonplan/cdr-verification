import Rectangle from './rectangle'
import Grid from './grid'
import Arrow from './arrow'

const Flow = () => {
  return (
    <Grid>
      <Rectangle
        id='5'
        start={[5, 3]}
        height={1}
        width={4}
        borderStyle='none'
      />
      <Rectangle
        id='6'
        start={[8, 3]}
        height={1}
        width={4}
        borderStyle='none'
      />
      <Arrow start={[7, 4]} length={1} down />
      <Arrow start={[10, 4]} length={1} down />

      <Rectangle
        start={[5, 6]}
        width={24}
        height={8}
        borderStyle='dashed'
        id='8'
        label=''
      />

      <Rectangle
        start={[7, 8]}
        width={4}
        invert
        label='Macroalgae cultivation'
      />

      <Arrow start={[12, 10]} length={1} right />

      <Rectangle start={[14, 8]} id='1' width={6} invert />

      <Arrow start={[21, 10]} length={1} right />

      <Rectangle start={[23, 8]} width={4} label='Macroalgae sinking' invert />

      <Arrow start={[28, 10]} length={2} right />

      <Rectangle id='7' start={[31, 8]} />

      <Arrow start={[9, 13]} length={2} down />

      <Rectangle start={[6, 16]} id='3' />

      <Arrow start={[13, 18]} length={2} right />

      <Rectangle id='4' start={[16, 16]} />

      <Rectangle
        id='2'
        start={[23, 3]}
        height={1}
        width={4}
        borderStyle='none'
      />
      <Arrow start={[25, 4]} length={1} up />
    </Grid>
  )
}

export default Flow
