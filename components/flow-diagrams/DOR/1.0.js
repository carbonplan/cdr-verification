import Rectangle from '../rectangle'
import Grid from '../grid'
import Arrow from '../arrow'

const Flow = () => {
  return (
    <Grid height={26}>
      <Rectangle start={[1, 9]} width={4} borderStyle='none' label='Seawater' />
      <Arrow start={[5, 11]} length={2} right />

      <Rectangle
        id='mat_co2'
        width={4}
        start={[6, 3]}
        height={1}
        borderStyle='none'
      />
      <Rectangle
        id='energy_co2'
        width={4}
        start={[9, 3]}
        height={1}
        borderStyle='none'
      />
      <Arrow start={[8, 4]} length={2} down />
      <Arrow start={[11, 4]} length={2} down />

      <Arrow start={[13, 3]} length={1} right />

      <Rectangle id='energy_current' start={[15, 2]} />

      <Rectangle
        start={[6, 7]}
        width={19}
        height={14}
        label='Project activity'
        secondary
      />

      <Rectangle start={[8, 9]} id='co2_removed' />

      <Arrow start={[15, 11]} length={1} right />
      <Arrow start={[11, 14]} length={1} down />

      <Rectangle
        start={[17, 9]}
        label='Dispersal of carbon depleted seawater'
      />

      <Rectangle start={[1, 23]} id='store_maint' />
      <Arrow start={[4, 17]} length={5} up hideArrow />
      <Arrow start={[4, 17]} length={3} right />

      <Rectangle start={[8, 16]} height={3} label='CO₂ storage' />

      <Arrow start={[11, 20]} length={2} down />
      <Rectangle id='store_leak' start={[8, 23]} height={3} />

      <Arrow start={[20, 14]} length={8} down />
      <Rectangle id='poc' start={[16, 23]} width={8} height={3} />

      <Arrow start={[24, 11]} length={2} right hideArrow />
      <Arrow start={[26, 3]} length={10} up hideArrow />
      <Arrow start={[26, 3]} length={2} right />
      <Arrow start={[26, 7]} length={2} right />
      <Arrow start={[26, 13]} length={2} right />

      <Rectangle id='sec_precip' start={[29, 2]} height={3} />
      <Rectangle id='calc' start={[29, 6]} />
      <Rectangle id='asg' start={[29, 12]} height={3} />

      <Arrow start={[32, 16]} length={1} down />

      <Rectangle start={[29, 18]} height={3} label='Restored DIC' />

      <Arrow start={[32, 22]} length={1} up />

      <Rectangle id='tau_alk' start={[29, 24]} height={3} />
    </Grid>
  )
}

export default Flow
