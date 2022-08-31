import Rectangle from './rectangle'
import Grid from './grid'
import Arrow from './arrow'

const Flow = () => {
  return (
    <Grid>
      <Rectangle start={[1, 7]} width={2} borderStyle='none' label='Seawater' />
      <Arrow start={[4, 9]} length={2} right />

      <Rectangle
        id='10'
        width={4}
        start={[5, 2]}
        height={1}
        borderStyle='none'
      />
      <Rectangle
        id='8'
        width={4}
        start={[8, 2]}
        height={1}
        borderStyle='none'
      />
      <Arrow start={[7, 3]} length={1} down />
      <Arrow start={[10, 3]} length={1} down />

      <Arrow start={[12, 2]} length={2} right />

      <Rectangle id='9' height={3} start={[15, 1]} />

      <Rectangle
        start={[5, 5]}
        width={20}
        height={14}
        borderStyle='dashed'
        id='12'
        label=''
      />

      <Rectangle start={[7, 7]} invert label='Electrochemical separation' />

      <Arrow start={[14, 9]} length={2} right />
      <Arrow start={[10, 12]} length={1} down />

      <Rectangle id='1' invert start={[17, 7]} />

      <Arrow start={[24, 9]} length={2} right />

      <Rectangle
        start={[7, 14]}
        invert
        height={3}
        label='Acid bi-product disposal'
      />

      <Arrow start={[10, 18]} length={2} down />

      <Rectangle id='7' start={[7, 21]} />

      <Rectangle id='2' start={[27, 5]} width={8} height={3} />

      <Rectangle id='3' start={[27, 9]} width={8} height={3} />
      <Rectangle id='4' start={[27, 13]} width={8} height={3} />
      <Rectangle id='5*' start={[27, 17]} width={8} height={3} />

      <Arrow start={[31, 21]} length={1} down />

      <Rectangle id='6' start={[27, 23]} width={8} />

      <Arrow start={[25, 25]} length={1} left />

      <Rectangle id='11' start={[18, 23]} />
    </Grid>
  )
}

export default Flow
