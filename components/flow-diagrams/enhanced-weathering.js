import Rectangle from './rectangle'
import Grid from './grid'
import Arrow from './arrow'

const Flow = () => {
  return (
    <Grid>
      <Rectangle
        id='8'
        start={[3, 2]}
        height={1}
        width={4}
        borderStyle='none'
      />

      <Rectangle
        id='9'
        start={[6, 2]}
        height={1}
        width={4}
        borderStyle='none'
      />
      <Arrow start={[5, 3]} length={1} down />
      <Arrow start={[8, 3]} length={1} down />

      <Rectangle
        start={[3, 5]}
        width={16}
        height={8}
        label='Project activity'
        secondary
      />

      <Rectangle start={[5, 7]} id='1' width={4} />

      <Arrow start={[10, 9]} length={2} right />

      <Rectangle width={4} label='Mineral weathering' start={[13, 7]} />

      <Arrow start={[18, 9]} length={2} right />

      <Rectangle id='2' start={[21, 7]} width={5} />

      <Arrow start={[27, 9]} length={2} right />
      <Arrow start={[28, 6]} length={3} up />

      <Rectangle
        id='6'
        start={[26, 4]}
        width={4}
        height={1}
        borderStyle='none'
      />
      <Rectangle id='14' width={5} start={[30, 7]} />

      <Arrow start={[7, 12]} length={2} down />

      <Rectangle start={[4, 15]} width={6} height={3} id='7*' />

      <Rectangle start={[4, 19]} width={6} height={3} id='10*' />

      <Rectangle start={[4, 23]} width={6} height={3} id='11*' />

      <Rectangle start={[4, 27]} width={6} height={3} id='12*' />

      <Arrow start={[15, 12]} length={2} down />

      <Rectangle id='3' height={3} start={[12, 15]} />
      <Rectangle id='4' height={3} start={[12, 19]} />
      <Rectangle id='5' height={3} start={[12, 23]} />

      <Arrow start={[19, 24]} length={2} right />

      <Rectangle id='13' height={3} start={[22, 23]} />
    </Grid>
  )
}

export default Flow
