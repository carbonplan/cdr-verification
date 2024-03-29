import Rectangle from '../rectangle'
import Grid from '../grid'
import Arrow from '../arrow'

const Flow = () => {
  return (
    <Grid height={29}>
      <Rectangle
        id='mat-co2'
        start={[1, 2]}
        height={1}
        width={4}
        borderStyle='none'
      />

      <Rectangle
        id='energy-co2'
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

      <Rectangle start={[3, 7]} id='min-pot' width={4} />

      <Arrow start={[8, 9]} length={2} right />

      <Rectangle width={4} id='alk-release' start={[11, 7]} />

      <Arrow start={[16, 9]} length={1} right hideArrow />
      <Arrow start={[17, 6]} length={6} up hideArrow />
      <Arrow start={[17, 6]} length={2} right />
      <Arrow start={[17, 12]} length={2} right />

      <Rectangle id='carb-terr' start={[20, 5]} />

      <Rectangle label='Alkalinity run-off' start={[20, 11]} height={3} />

      <Arrow start={[27, 6]} length={2} left />

      <Rectangle id='carb-terr-durability' start={[30, 5]} />

      <Arrow start={[27, 12]} length={4} right />
      <Rectangle
        id='evasion'
        start={[31, 12]}
        width={4}
        height={1}
        borderStyle='none'
      />

      <Arrow start={[23, 15]} length={2} down />
      <Rectangle height={3} start={[20, 18]} label='Ocean storage' />
      <Arrow start={[23, 22]} length={2} up />
      <Rectangle id='tau-dic' height={3} start={[20, 25]} />
      <Arrow start={[27, 19]} length={2} right />
      <Rectangle id='carb-marine' height={3} start={[30, 18]} />
      <Arrow start={[33, 22]} length={2} up />
      <Rectangle id='tau-carb-marine' height={3} start={[30, 25]} />

      <Arrow start={[5, 12]} length={2} down />

      <Rectangle start={[2, 15]} width={6} height={3} id='soil-c' />

      <Rectangle start={[2, 19]} width={6} height={3} id='lime-reduce' />

      <Rectangle start={[2, 23]} width={6} height={3} id='fert-reduce' />

      <Rectangle start={[2, 27]} width={6} height={3} id='n2o-reduce' />

      <Arrow start={[13, 12]} length={2} down />

      <Rectangle id='alk-loss' height={3} start={[10, 15]} />
      <Rectangle id='min-sec' height={3} start={[10, 19]} />
    </Grid>
  )
}

export default Flow
