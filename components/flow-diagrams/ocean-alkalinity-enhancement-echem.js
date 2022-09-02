import Rectangle from './rectangle'
import Grid from './grid'
import Arrow from './arrow'

const Flow = () => {
  return (
    <Grid height={28}>
      <Rectangle start={[1, 9]} width={2} borderStyle='none' label='Seawater' />
      <Arrow start={[4, 11]} length={2} right />

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
      <Arrow start={[7, 4]} length={2} down />
      <Arrow start={[10, 4]} length={2} down />

      <Arrow start={[12, 3]} length={2} right />

      <Rectangle id='9' height={3} start={[15, 2]} />

      <Rectangle start={[5, 7]} width={20} height={14} id='11' label='' />

      <Rectangle start={[7, 9]} label='Electrochemical separation' />

      <Arrow start={[14, 11]} length={2} right />
      <Arrow start={[10, 14]} length={1} down />

      <Rectangle id='1' start={[17, 9]} />

      <Arrow start={[24, 11]} length={2} right />

      <Rectangle start={[7, 16]} height={3} label='Acid bi-product disposal' />

      <Arrow start={[10, 20]} length={2} down />

      <Rectangle id='6' start={[7, 23]} height={3} />

      <Rectangle id='2' start={[27, 7]} width={8} height={3} />

      <Rectangle id='3' start={[27, 11]} width={8} height={3} />
      <Rectangle id='4*' start={[27, 15]} width={8} height={3} />
      <Rectangle id='5' start={[27, 19]} width={8} height={3} />

      <Arrow start={[31, 23]} length={1} down />

      <Rectangle id='10' start={[27, 25]} width={8} height={3} />
    </Grid>
  )
}

export default Flow
