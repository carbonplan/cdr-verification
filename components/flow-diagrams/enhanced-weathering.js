import Rectangle from './rectangle'
import Grid from './grid'
import Arrow from './arrow'

const Flow = () => {
  return (
    <Grid>
      <Rectangle
        id='8'
        start={[5, 2]}
        height={1}
        width={4}
        borderStyle='none'
      />

      <Rectangle
        id='9'
        start={[8, 2]}
        height={1}
        width={4}
        borderStyle='none'
      />
      <Arrow start={[7, 3]} length={1} down />
      <Arrow start={[10, 3]} length={1} down />

      <Rectangle start={[5, 5]} width={16} height={8} id='15' label='' />

      <Rectangle start={[7, 7]} id='1' width={4} />

      <Arrow start={[12, 9]} length={2} right />

      <Rectangle width={4} label='Mineral weathering' start={[15, 7]} />

      <Arrow start={[20, 9]} length={2} right />

      <Rectangle id='2' start={[23, 7]} width={5} />

      <Arrow start={[29, 9]} length={2} right />
      <Arrow start={[30, 6]} length={3} up />

      <Rectangle
        id='6'
        start={[28, 4]}
        width={4}
        height={1}
        borderStyle='none'
      />
      <Rectangle id='14' start={[32, 7]} />

      <Arrow start={[9, 12]} length={2} down />

      <Rectangle start={[6, 15]} width={6} height={3} id='7*' />

      <Rectangle start={[6, 19]} width={6} height={3} id='10*' />

      <Rectangle start={[6, 23]} width={6} height={3} id='11*' />

      <Rectangle start={[6, 27]} width={6} height={3} id='12*' />

      <Arrow start={[17, 12]} length={2} down />

      <Rectangle id='3' height={3} start={[14, 15]} />
      <Rectangle id='4' height={3} start={[14, 19]} />
      <Rectangle id='5' height={3} start={[14, 23]} />

      <Arrow start={[21, 24]} length={2} right />

      <Rectangle id='13' height={3} start={[24, 23]} />
    </Grid>
  )
}

export default Flow
