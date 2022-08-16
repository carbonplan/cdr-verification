import { useState } from 'react'
import { Box, Divider, Flex } from 'theme-ui'
import { Layout, Row, Column, Expander, Filter } from '@carbonplan/components'
import { OAE, Seaweed, EnhancedWeathering } from '../components/flow-diagrams'
import data from '../data.json'
import Circle from '../components/circle'

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
          <Divider sx={{ my: 5, mr: [0, 0, '-16px', '-24px'] }} />
          {elements.map((d) => (
            <Box key={d.diagram_component} sx={{ my: [2, 3, 3, 4] }}>
              <Flex
                sx={{ justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Flex
                  sx={{
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <Circle
                    id={d.diagram_component}
                    category={d.category}
                    sx={{ flexShrink: 0 }}
                  />
                  <Box>{d.description}</Box>
                </Flex>
                <Expander
                  value={d.diagram_component === element}
                  onClick={() =>
                    setElement((prev) =>
                      prev === d.diagram_component ? null : d.diagram_component
                    )
                  }
                  sx={{ flexShrink: 0 }}
                />
              </Flex>
              {element === d.diagram_component ? d.comments : null}
            </Box>
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

            <Divider sx={{ my: 5, ml: [0, 0, '-16px', '-24px'] }} />
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
