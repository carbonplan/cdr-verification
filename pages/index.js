import { Filter } from '@carbonplan/components'
import { Tool } from '@carbonplan/layouts'
import { useState } from 'react'
import { OAE, Seaweed, EnhancedWeathering } from '../components/flow-diagrams'

const meta = {
  id: 'cdr-mrv',
  title: 'CDR MRV',
  color: 'pink',
  // card: 'cdr-mrv',
  quickLook: 'TK',
}

const description = (
  <span>
    This tool illustrates different CDR technologies using pathway diagrams. Use
    the menus below to view the underlying [flow diagrams], uncertainty
    information, and chemical equations.
  </span>
)

const Index = () => {
  const [values, setValues] = useState({
    oae: true,
    seaweed: false,
    'enhanced weathering': false,
  })
  return (
    <Tool meta={meta} description={description}>
      <Filter values={values} setValues={setValues} />
      {values.oae && <OAE />}
      {values.seaweed && <Seaweed />}
      {values['enhanced weathering'] && <EnhancedWeathering />}
    </Tool>
  )
}

export default Index
