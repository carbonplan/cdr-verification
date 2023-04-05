import Rectangle from '../rectangle'
import Grid from '../grid'
import Arrow from '../arrow'

const Flow = () => {
  return (
    <Grid height={32}>
      <Rectangle start={[1, 9]} width={4} borderStyle='none' label='Seawater' />
      <Arrow start={[5, 11]} length={2} right />

      <Rectangle
        id='mat-co2'
        width={4}
        start={[6, 3]}
        height={1}
        borderStyle='none'
      />
      <Rectangle
        id='energy-co2'
        width={4}
        start={[9, 3]}
        height={1}
        borderStyle='none'
      />
      <Arrow start={[8, 4]} length={2} down />
      <Arrow start={[11, 4]} length={2} down />

      <Arrow start={[13, 3]} length={1} right />

      <Rectangle id='energy-current' start={[15, 2]} />

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

      <Rectangle id='base-total-convert' start={[17, 9]} />

      <Rectangle start={[8, 16]} height={3} label='Acid bi-product disposal' />

      <Arrow start={[11, 20]} length={2} down />
      <Rectangle id='acid-return' start={[8, 23]} height={3} />

      <Arrow start={[20, 14]} length={8} down />
      <Rectangle id='poc' start={[16, 23]} width={8} height={3} />

      <Arrow start={[24, 11]} length={2} right hideArrow />
      <Arrow start={[26, 3]} length={10} up hideArrow />
      <Arrow start={[26, 3]} length={2} right />
      <Arrow start={[26, 7]} length={2} right />
      <Arrow start={[26, 13]} length={2} right />

      <Rectangle id='sec-precip' start={[29, 2]} width={8} height={3} />
      <Rectangle id='calc' start={[29, 6]} width={8} height={3} />
      <Rectangle id='asg' start={[29, 12]} width={8} height={3} />

      <Arrow start={[33, 16]} length={1} down />

      <Rectangle start={[29, 18]} width={8} height={3} label='Enhanced DIC' />

      <Arrow start={[33, 22]} length={1} down />

      <Arrow start={[24, 28]} length={1} up hideArrow />
      <Arrow start={[24, 28]} length={2} right hideArrow />
      <Arrow start={[26, 19]} length={9} up hideArrow />
      <Arrow start={[26, 19]} length={2} right />

      <Rectangle id='tau-alk' start={[20, 30]} width={8} height={3} />

      <Rectangle id='carb-marine' start={[29, 24]} width={8} height={3} />
      <Arrow start={[33, 28]} length={1} up />
      <Rectangle id='tau-carb-marine' start={[29, 30]} width={8} height={3} />
    </Grid>
  )
}

export default Flow
