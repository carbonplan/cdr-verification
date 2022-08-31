import Rectangle from './rectangle'
import Grid from './grid'
import Arrow from './arrow'

const Flow = () => {
  return (
    <Grid>
      <Rectangle
        id='6'
        width={4}
        start={[5, 3]}
        height={1}
        borderStyle='none'
      />
      <Rectangle
        id='7'
        width={4}
        start={[8, 3]}
        height={1}
        borderStyle='none'
      />

      <Arrow start={[7, 4]} length={1} down />
      <Arrow start={[10, 4]} length={1} down />
      <Rectangle
        start={[5, 6]}
        width={14}
        height={8}
        borderStyle='dashed'
        id='9'
        label=''
      />
      <Rectangle id='1' invert start={[9, 8]} />
      <Arrow start={[16, 10]} length={6} right />
      <Rectangle id='8' start={[23, 8]} />

      <Rectangle id='2' start={[15, 3]} height={1} borderStyle='none' />
      <Arrow start={[18, 4]} length={1} up />

      <Rectangle
        id='7'
        start={[1, 10]}
        label='Biomass feedstock'
        height={2}
        width={4}
        borderStyle='none'
      />
      <Arrow start={[4, 10]} length={4} right />

      <Arrow start={[3, 12]} length={8} down hideArrow />
      <Arrow start={[3, 20]} length={3} right />
      <Rectangle id='3' height={3} start={[7, 15]} />
      <Rectangle id='4' height={3} start={[7, 19]} />
      <Rectangle id='5' height={3} start={[7, 23]} />
    </Grid>
  )
}

export default Flow
