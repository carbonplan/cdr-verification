import Rectangle from './rectangle'
import Grid from './grid'
import Arrow from './arrow'

const Flow = () => {
  return (
    <Grid height={30}>
      <Rectangle start={[1, 9]} width={4} borderStyle='none' label='Seawater' />
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

      <Arrow start={[13, 3]} length={1} right />

      <Rectangle id='9' height={3} start={[15, 2]} />

      <Rectangle
        start={[6, 7]}
        width={19}
        height={14}
        label='Project activity'
        secondary
      />

      <Rectangle start={[8, 9]} label='Electrochemical separation' />

      <Arrow start={[15, 11]} length={1} right />
      <Arrow start={[11, 14]} length={1} down />

      <Rectangle id='1' start={[17, 9]} />

      <Rectangle start={[8, 16]} height={3} label='Acid bi-product disposal' />

      <Arrow start={[11, 20]} length={2} down />

      <Rectangle id='6' start={[8, 23]} height={3} />

      <Arrow start={[22, 3]} length={5} up hideArrow />
      <Arrow start={[22, 3]} length={4} right />

      <Rectangle id='5*' start={[27, 2]} width={8} height={3} />

      <Arrow start={[24, 11]} length={2} right />

      <Rectangle id='2' start={[27, 7]} width={8} height={3} />
      <Rectangle id='3' start={[27, 11]} width={8} height={3} />
      <Rectangle id='4' start={[27, 15]} width={8} height={3} />

      <Arrow start={[31, 19]} length={1} down />

      <Rectangle start={[27, 21]} width={8} height={3} label='Enhanced DIC' />

      <Arrow start={[31, 25]} length={1} up />

      <Rectangle id='10' start={[27, 27]} width={8} height={3} />
    </Grid>
  )
}

export default Flow
