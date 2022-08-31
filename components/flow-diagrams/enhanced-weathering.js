import Rectangle from './rectangle'
import Grid from './grid'
import Arrow from './arrow'

const Flow = () => {
  return (
    <Grid>
      <Rectangle
        id='8'
        start={[5, 3]}
        height={1}
        width={4}
        borderStyle='none'
      />

      <Rectangle
        id='9'
        start={[8, 3]}
        height={1}
        width={4}
        borderStyle='none'
      />
      <Arrow start={[7, 4]} length={1} down />
      <Arrow start={[10, 4]} length={1} down />

      <Rectangle
        start={[5, 6]}
        width={16}
        height={8}
        borderStyle='dashed'
        id='15'
        label=''
      />

      <Rectangle start={[7, 8]} id='1' width={4} invert />

      <Arrow start={[12, 10]} length={2} right />

      <Rectangle id='2' width={4} start={[15, 8]} />

      <Arrow start={[20, 10]} length={2} right />

      <Rectangle id='2' label='Alkalinity run-off' start={[23, 8]} width={5} />

      <Arrow start={[29, 10]} length={2} right />
      <Arrow start={[30, 7]} length={3} up />

      <Rectangle
        id='6'
        start={[28, 5]}
        width={4}
        height={1}
        borderStyle='none'
      />
      <Rectangle id='14' start={[32, 8]} />

      <Arrow start={[9, 13]} length={2} down />

      <Rectangle start={[6, 16]} width={6} height={3} id='7*' />

      <Rectangle start={[6, 20]} width={6} height={3} id='10*' />

      <Rectangle start={[6, 24]} width={6} height={3} id='11*' />

      <Rectangle start={[6, 28]} width={6} height={3} id='12*' />

      <Arrow start={[17, 13]} length={2} down />

      <Rectangle id='3' height={3} start={[14, 16]} />
      <Rectangle id='4' height={3} start={[14, 20]} />
      <Rectangle id='5' height={3} start={[14, 24]} />

      <Arrow start={[21, 25]} length={2} right />

      <Rectangle id='13' height={3} start={[24, 24]} />
    </Grid>
  )
}

export default Flow
