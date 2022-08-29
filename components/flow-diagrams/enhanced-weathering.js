import Rectangle from './rectangle'
import Grid from './grid'
import Arrow from './arrow'

const Flow = () => {
  return (
    <Grid>
      <Rectangle
        start={[1, 8]}
        width={3}
        height={2}
        id='8'
        borderStyle='none'
      />
      <Rectangle
        id='7'
        start={[5, 3]}
        height={1}
        width={4}
        borderStyle='none'
      />

      <Rectangle
        id='8'
        start={[8, 3]}
        height={1}
        width={4}
        borderStyle='none'
      />
      <Arrow start={[7, 4]} length={1} down />
      <Arrow start={[10, 4]} length={1} down />

      <Arrow start={[4, 9]} length={2} right />

      <Rectangle
        start={[5, 6]}
        width={16}
        height={8}
        borderStyle='dashed'
        id='13'
        label=''
      />

      <Rectangle start={[7, 8]} id='1' width={4} invert />

      <Arrow start={[12, 10]} length={2} right />

      <Rectangle id='2' width={4} start={[15, 8]} />

      <Arrow start={[20, 10]} length={2} right />

      <Rectangle id='4' start={[23, 5]} width={5} />
      <Rectangle
        start={[23, 10]}
        width={5}
        label='Superficial carbonate formation'
      />
      <Rectangle start={[23, 15]} width={5} label='DIC run-off' />

      <Arrow start={[29, 12]} length={2} right />

      <Rectangle id='11' start={[32, 10]} />

      <Arrow start={[29, 17]} length={2} right />
      <Arrow start={[30, 17]} length={3} down hideArrow />
      <Arrow start={[30, 20]} length={2} right />

      <Rectangle id='12' start={[32, 15]} />

      <Rectangle id='5' start={[31, 21]} height={1} borderStyle='none' />

      <Arrow start={[9, 13]} length={2} down />

      <Rectangle start={[6, 16]} width={6} height={3} id='6*' />

      <Rectangle start={[6, 20]} width={6} height={3} id='9*' />

      <Rectangle start={[6, 24]} width={6} height={3} id='10*' />

      <Arrow start={[17, 13]} length={2} up />

      <Rectangle id='3' width={4} height={3} start={[15, 16]} />
    </Grid>
  )
}

export default Flow
