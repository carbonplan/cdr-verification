import { useState } from 'react'
import { Box, Divider } from 'theme-ui'
import { Layout, Row, Column, Filter } from '@carbonplan/components'
import { OAE, Seaweed, EnhancedWeathering } from '../components/flow-diagrams'
import oae from '../data/Ocean_Alkalinity_Enhancement.json'
import seaweed from '../data/Ocean_Biomass_Sinking.json'
import ew from '../data/Enhanced_Weathering.json'
import Element from '../components/element'
import { CATEGORY_COLORS } from '../components/constants'
import { getElements } from '../components/utils'
const data = {
  oae,
  seaweed,
  'enhanced weathering': ew,
}

const Index = () => {
  const [values, setValues] = useState({
    oae: true,
    seaweed: false,
    'enhanced weathering': false,
  })
  const [filters, setFilters] = useState({
    drawdown: true,
    emissions: true,
    other: true,
  })
  const value = Object.keys(values).find((k) => values[k])
  const [element, setElement] = useState(null)

  const { pathway_name, pathway_description, vcl, equation, elements } =
    data[value]

  return (
    <Layout
      title='CDR MRV – CarbonPlan'
      footer={false}
      metadata={false}
      nav={'research'}
    >
      <Row>
        <Column start={1} width={[6, 7, 4, 4]} mt={4}>
          <Box
            sx={{
              pb: [3],
              fontSize: [6, 6, 6, 7],
              width: 'fit-content',
              fontFamily: 'heading',
              lineHeight: 'heading',
            }}
          >
            CDR MRV
          </Box>
          <Box
            sx={{
              pt: [0],
              mb: [0, 3, 0, 0],
              fontSize: [2, 2, 2, 3],
              fontFamily: 'body',
              lineHeight: 'body',
            }}
          >
            This tool illustrates different CDR technologies using pathway
            diagrams. Use the menus below to view the underlying [flow
            diagrams], uncertainty information, and chemical equations.
          </Box>
          <Divider sx={{ my: 5, mr: [0, 0, '-32px', '-48px'] }} />
          <Filter
            values={filters}
            setValues={setFilters}
            colors={CATEGORY_COLORS}
            showAll
          />
          <Divider sx={{ my: 5, mr: [0, 0, '-32px', '-48px'] }} />

          {getElements(elements, filters).map((d) => (
            <Element
              key={d.element}
              {...d}
              active={d.element === element}
              onClick={() =>
                setElement((prev) => (prev === d.element ? null : d.element))
              }
            />
          ))}
        </Column>
        <Column start={[1, 2, 5, 5]} width={[0, 0, 1, 1]}>
          <Box
            sx={{
              width: '50%',
              height: '100%',
              borderWidth: 0,
              borderRight: '1px',
              borderColor: 'muted',
              borderStyle: 'solid',
            }}
          />

          <Box
            sx={{
              width: '50%',
              height: '100%',
              borderWidth: 0,
              borderRight: '1px',
              borderColor: 'muted',
              borderStyle: 'solid',
            }}
          />
        </Column>
        <Column start={[1, 2, 6, 6]} width={[6, 6, 7, 7]}>
          <Box
            sx={{
              position: 'sticky',
              pt: 4,
              top: 56,
              background: 'background',
              zIndex: 10,
            }}
          >
            <Filter values={values} setValues={setValues} />

            <Divider sx={{ my: 5, ml: [0, 0, '-32px', '-48px'] }} />
          </Box>

          {values.oae && <OAE />}
          {values.seaweed && <Seaweed />}
          {values['enhanced weathering'] && <EnhancedWeathering />}
        </Column>
      </Row>
    </Layout>
  )
}

export default Index
