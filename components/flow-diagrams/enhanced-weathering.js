import Rectangle from './rectangle'
import Grid from './grid'
import Arrow from './arrow'

const Flow = () => {
  return (
    <Grid>
      <Rectangle
        id='8'
        start={[1, 2]}
        height={1}
        width={4}
        borderStyle='none'
      />

      <Rectangle
        id='9'
        start={[4, 2]}
        height={1}
        width={4}
        borderStyle='none'
      />
      <Arrow start={[3, 3]} length={1} down />
      <Arrow start={[6, 3]} length={1} down />

      <Rectangle
        start={[1, 5]}
        width={8}
        height={8}
        label='Project activity'
        secondary
      />

      <Rectangle start={[3, 7]} id='1' width={4} />

      <Arrow start={[8, 9]} length={2} right />

      <Rectangle width={4} label='Mineral weathering' start={[11, 7]} />

      <Arrow start={[16, 9]} length={1} right hideArrow />
      <Arrow start={[17, 6]} length={5} up hideArrow />
      <Arrow start={[17, 6]} length={2} right />
      <Arrow start={[17, 11]} length={2} right />

      <Rectangle id='5' start={[20, 5]} height={3} />

      <Rectangle id='2' start={[20, 10]} height={3} />

      <Arrow start={[27, 6]} length={2} left />

      <Rectangle id='13' height={3} start={[30, 5]} />

      <Arrow start={[23, 14]} length={2} down />
      <Rectangle
        id='6'
        start={[21, 18]}
        width={4}
        height={1}
        borderStyle='none'
      />

      <Arrow start={[27, 11]} length={2} right />
      <Rectangle height={3} start={[30, 10]} label='Ocean storage' />
      <Arrow start={[33, 14]} length={2} up />
      <Rectangle id='14' height={3} start={[30, 17]} />

      <Arrow start={[5, 12]} length={2} down />

      <Rectangle start={[2, 15]} width={6} height={3} id='7*' />

      <Rectangle start={[2, 19]} width={6} height={3} id='10*' />

      <Rectangle start={[2, 23]} width={6} height={3} id='11*' />

      <Rectangle start={[2, 27]} width={6} height={3} id='12*' />

      <Arrow start={[13, 12]} length={2} down />

      <Rectangle id='3' height={3} start={[10, 15]} />
      <Rectangle id='4' height={3} start={[10, 19]} />
    </Grid>
  )
}

export default Flow
