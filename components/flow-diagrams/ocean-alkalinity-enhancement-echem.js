import Rectangle from './rectangle'
import Grid from './grid'
import Arrow from './arrow'

const Flow = () => {
  return (
    <Grid height={27}>
      <Rectangle start={[1, 8]} width={2} borderStyle='none' label='Seawater' />
      <Arrow start={[4, 10]} length={2} right />

      <Rectangle
        id='7'
        width={4}
        start={[5, 2]}
        height={1}
        borderStyle='none'
      />
      <Rectangle
        id='8'
        width={4}
        start={[8, 2]}
        height={1}
        borderStyle='none'
      />
      <Arrow start={[7, 3]} length={2} down />
      <Arrow start={[10, 3]} length={2} down />

      <Arrow start={[12, 2]} length={2} right />

      <Rectangle id='9' height={3} start={[15, 1]} />

      <Rectangle start={[5, 6]} width={20} height={14} id='11' label='' />

      <Rectangle start={[7, 8]} label='Electrochemical separation' />

      <Arrow start={[14, 10]} length={2} right />
      <Arrow start={[10, 13]} length={1} down />

      <Rectangle id='1' start={[17, 8]} />

      <Arrow start={[24, 10]} length={2} right />

      <Rectangle start={[7, 15]} height={3} label='Acid bi-product disposal' />

      <Arrow start={[10, 19]} length={2} down />

      <Rectangle id='6' start={[7, 22]} />

      <Rectangle id='2' start={[27, 6]} width={8} height={3} />

      <Rectangle id='3' start={[27, 10]} width={8} height={3} />
      <Rectangle id='4*' start={[27, 14]} width={8} height={3} />
      <Rectangle id='5' start={[27, 18]} width={8} height={3} />

      <Arrow start={[31, 22]} length={1} down />

      <Rectangle id='10' start={[27, 24]} width={8} />
    </Grid>
  )
}

export default Flow
