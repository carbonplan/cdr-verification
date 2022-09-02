import Rectangle from './rectangle'
import Grid from './grid'
import Arrow from './arrow'

const Flow = () => {
  return (
    <Grid height={28}>
      <Rectangle start={[2, 9]} width={2} borderStyle='none' label='Seawater' />
      <Arrow start={[5, 11]} length={2} right />

      <Rectangle
        id='7'
        width={4}
        start={[6, 3]}
        height={1}
        borderStyle='none'
      />
      <Rectangle
        id='8'
        width={4}
        start={[9, 3]}
        height={1}
        borderStyle='none'
      />
      <Arrow start={[8, 4]} length={2} down />
      <Arrow start={[11, 4]} length={2} down />

      <Arrow start={[13, 3]} length={2} right />

      <Rectangle id='9' height={3} start={[16, 2]} />

      <Rectangle start={[6, 7]} width={20} height={14} id='11' label='' />

      <Rectangle start={[8, 9]} label='Electrochemical separation' />

      <Arrow start={[15, 11]} length={2} right />
      <Arrow start={[11, 14]} length={1} down />

      <Rectangle id='1' start={[18, 9]} />

      <Arrow start={[25, 11]} length={2} right />

      <Rectangle start={[8, 16]} height={3} label='Acid bi-product disposal' />

      <Arrow start={[11, 20]} length={2} down />

      <Rectangle id='6' start={[8, 23]} height={3} />

      <Rectangle id='2' start={[28, 7]} width={8} height={3} />

      <Rectangle id='3' start={[28, 11]} width={8} height={3} />
      <Rectangle id='4*' start={[28, 15]} width={8} height={3} />
      <Rectangle id='5' start={[28, 19]} width={8} height={3} />

      <Arrow start={[32, 23]} length={1} down />

      <Rectangle id='10' start={[28, 25]} width={8} height={3} />
    </Grid>
  )
}

export default Flow
