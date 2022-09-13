import Rectangle from './rectangle'
import Grid from './grid'
import Arrow from './arrow'

const Flow = () => {
  return (
    <Grid height={27}>
      <Rectangle
        id='6'
        width={4}
        start={[6, 2]}
        height={1}
        borderStyle='none'
      />
      <Rectangle
        id='7'
        width={4}
        start={[9, 2]}
        height={1}
        borderStyle='none'
      />

      <Arrow start={[8, 3]} length={1} down />
      <Arrow start={[11, 3]} length={1} down />
      <Rectangle
        start={[6, 5]}
        width={30}
        height={8}
        label='Project activity'
        secondary
      />
      <Rectangle start={[8, 7]} label='Biomass transformation' />
      <Arrow start={[15, 9]} length={2} right />
      <Rectangle label='Transportation' start={[18, 7]} />
      <Arrow start={[25, 9]} length={2} right />
      <Rectangle id='1' start={[28, 7]} />

      <Rectangle
        id='6'
        start={[2, 9]}
        label='Biomass feedstock'
        height={2}
        width={4}
        borderStyle='none'
      />
      <Arrow start={[5, 9]} length={2} right />

      <Arrow start={[4, 11]} length={10} down hideArrow />
      <Arrow start={[4, 21]} length={3} right />
      <Rectangle id='3' start={[8, 14]} />
      <Rectangle id='4' start={[8, 19]} />
      <Rectangle id='5' start={[8, 24]} />

      <Arrow start={[31, 12]} length={2} up />
      <Rectangle id='8' start={[28, 15]} />

      <Rectangle id='2' start={[28, 2]} height={1} borderStyle='none' />
      <Arrow start={[31, 4]} length={2} up />
    </Grid>
  )
}

export default Flow
