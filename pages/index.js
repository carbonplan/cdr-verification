import { useState } from 'react'
import { Box, Divider } from 'theme-ui'
import { Layout, Row, Column, Filter } from '@carbonplan/components'
import { Tool } from '@carbonplan/layouts'
import { OAE, Seaweed, EnhancedWeathering } from '../components/flow-diagrams'

const Index = () => {
  const [values, setValues] = useState({
    oae: true,
    seaweed: false,
    'enhanced weathering': false,
  })
  return (
    <Layout
      title='CDR MRV – CarbonPlan'
      footer={false}
      metadata={false}
      nav={'research'}
    >
      <Row sx={{ mt: [4] }}>
        <Column start={1} width={[6, 7, 3, 3]}>
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
        </Column>
        <Column start={[1, 2, 5, 5]} width={[6, 6, 8, 8]}>
          <Filter values={values} setValues={setValues} />
        </Column>
      </Row>
      <Row>
        <Column start={1} width={[6, 7, 3, 3]}>
          <Divider sx={{ my: 5, mr: [0, 0, '-16px', '-24px'] }} />
        </Column>
        <Column start={[1, 2, 5, 5]} width={[6, 6, 8, 8]}>
          <Divider sx={{ my: 5, ml: [0, 0, '-16px', '-24px'] }} />
        </Column>
      </Row>
      <Row>
        <Column start={1} width={[6, 7, 3, 3]}>
          List
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
        </Column>
        <Column start={[1, 2, 5, 5]} width={[6, 6, 8, 8]}>
          {values.oae && <OAE />}
          {values.seaweed && <Seaweed />}
          {values['enhanced weathering'] && <EnhancedWeathering />}
        </Column>
      </Row>
    </Layout>
  )
}

export default Index
