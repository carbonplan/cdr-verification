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
        width={30}
        height={8}
        borderStyle='dashed'
        id='9'
        label=''
      />
      <Rectangle start={[7, 8]} invert label='Biomass transformation' />
      <Arrow start={[14, 10]} length={2} right />
      <Rectangle label='Transportation' invert start={[17, 8]} />
      <Arrow start={[24, 10]} length={2} right />
      <Rectangle id='1' invert start={[27, 8]} />

      <Rectangle
        id='7'
        start={[1, 10]}
        label='Biomass feedstock'
        height={2}
        width={4}
        borderStyle='none'
      />
      <Arrow start={[4, 10]} length={2} right />

      <Arrow start={[3, 12]} length={8} down hideArrow />
      <Arrow start={[3, 20]} length={3} right />
      <Rectangle id='3' height={3} start={[7, 15]} />
      <Rectangle id='4' height={3} start={[7, 19]} />
      <Rectangle id='5' height={3} start={[7, 23]} />

      <Arrow start={[30, 13]} length={2} up />
      <Rectangle id='8' start={[27, 16]} />

      <Rectangle id='2' start={[27, 3]} height={1} borderStyle='none' />
      <Arrow start={[30, 4]} length={1} up />
    </Grid>
  )
}

export default Flow
