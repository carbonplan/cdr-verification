import { useState } from 'react'
import { Box, Divider } from 'theme-ui'
import { Layout, Row, Column, Filter } from '@carbonplan/components'
import { OAE, Seaweed, EnhancedWeathering } from '../components/flow-diagrams'
import data from '../data.json'
import Element from '../components/element'

const Index = () => {
  const [values, setValues] = useState({
    oae: true,
    seaweed: false,
    'enhanced weathering': false,
  })
  const [element, setElement] = useState(null)

  // temporarily hardcode data access
  const { pathway_name, pathway_description, vcl, equation, elements } = data[0]
  return (
    <Layout
      title='CDR MRV – CarbonPlan'
      footer={false}
      metadata={false}
      nav={'research'}
    >
      <Row>
        <Column start={1} width={[6, 7, 3, 3]} mt={4}>
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
          {elements.map((d) => (
            <Element
              key={d.diagram_component}
              {...d}
              active={d.diagram_component === element}
              onClick={() =>
                setElement((prev) =>
                  prev === d.diagram_component ? null : d.diagram_component
                )
              }
            />
          ))}
        </Column>
        <Column start={[1, 2, 4, 4]} width={[0, 0, 1, 1]}>
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
        <Column start={[1, 2, 5, 5]} width={[6, 6, 8, 8]}>
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
