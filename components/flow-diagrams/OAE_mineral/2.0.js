import Rectangle from '../rectangle'
import Grid from '../grid'
import Arrow from '../arrow'

const Flow = () => {
  return (
    <Grid height={26}>
      <Rectangle
        id='mat_co2'
        width={4}
        start={[3, 2]}
        height={1}
        borderStyle='none'
      />
      <Rectangle
        id='energy_co2'
        width={4}
        start={[6, 2]}
        height={1}
        borderStyle='none'
      />
      <Arrow start={[5, 3]} length={1} down />
      <Arrow start={[8, 3]} length={1} down />

      <Rectangle
        start={[3, 5]}
        width={10}
        height={8}
        label='Project activity'
        secondary
      />

      <Rectangle start={[5, 7]} id='alk_total' />

      <Arrow start={[12, 9]} length={2} right />

      <Rectangle id='alk_convert' start={[15, 7]} />

      <Arrow start={[18, 12]} length={2} down />

      <Rectangle id='poc' start={[14, 16]} width={8} height={3} />

      <Arrow start={[22, 9]} length={2} right hideArrow />
      <Arrow start={[24, 3]} length={10} up hideArrow />
      <Arrow start={[24, 3]} length={2} right />
      <Arrow start={[24, 7]} length={2} right />
      <Arrow start={[24, 13]} length={2} right />

      <Rectangle id='sec_precip' start={[27, 2]} width={8} height={3} />
      <Rectangle id='calc' start={[27, 6]} width={8} height={3} />
      <Rectangle id='asg' start={[27, 12]} width={8} height={3} />

      <Arrow start={[31, 16]} length={1} down />
      <Rectangle start={[27, 18]} width={8} height={3} label='Enhanced DIC' />
      <Arrow start={[31, 22]} length={1} up />

      <Rectangle id='tau_alk' start={[27, 24]} width={8} height={3} />
    </Grid>
  )
}

export default Flow
