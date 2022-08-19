import { useState } from 'react'
import { Box, Divider, Flex } from 'theme-ui'
import {
  Layout,
  Row,
  Column,
  Filter,
  Select,
  Badge,
} from '@carbonplan/components'
import { OAE, Seaweed, EnhancedWeathering } from '../components/flow-diagrams'
import oae from '../data/Ocean_Alkalinity_Enhancement.json'
import seaweed from '../data/Ocean_Biomass_Sinking.json'
import ew from '../data/Enhanced_Weathering.json'
import Element from '../components/element'
import { CATEGORY_COLORS } from '../components/constants'
import { getElements } from '../components/utils'
import TableHeader from '../components/table/header'

const data = {
  oae,
  seaweed,
  ew,
}

const Index = () => {
  const [pathway, setPathway] = useState('oae')
  const [filters, setFilters] = useState({
    drawdown: true,
    emissions: true,
    other: true,
  })
  const [sort, setSort] = useState('number')
  const [element, setElement] = useState(null)

  const { pathway_description, VCL, equation, elements } = data[pathway]

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

          <Divider sx={{ mt: 5, mb: 0, mr: [0, 0, '-32px', '-48px'] }} />

          <Box
            sx={{
              position: 'sticky',
              top: 56,
              background: 'background',
              pt: 3,
              mr: [0, 0, '-32px', '-48px'],
              pr: [0, 0, '32px', '48px'],
              zIndex: 10,
            }}
          >
            <Filter
              values={filters}
              setValues={setFilters}
              colors={CATEGORY_COLORS}
              showAll
            />

            <Divider sx={{ mb: 5, mt: 3, mr: [0, 0, '-32px', '-48px'] }} />
          </Box>

          <Row columns={[6, 7, 4, 4]}>
            <Column>
              <TableHeader
                sort={sort}
                setSort={setSort}
                id='number'
                label='#'
                sx={{ ml: 1 }}
              />
            </Column>
            <Column start={[5, 6, 3, 3]} width={2} sx={{ textAlign: 'right' }}>
              <TableHeader
                sort={sort}
                setSort={setSort}
                id='uncertainty'
                label='Uncertainty'
                sx={{ alignItems: 'flex-end' }}
              />
            </Column>
          </Row>
          {getElements(elements, filters, sort).map((d) => (
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
              pt: '44px',
              top: 56,
              background: 'background',
              ml: [0, 0, '-32px', '-48px'],
              pl: [0, 0, '32px', '48px'],
              zIndex: 10,
            }}
          >
            <Flex sx={{ gap: 3, flexDirection: 'column' }}>
              <Select
                size='md'
                value={pathway}
                onChange={(e) => setPathway(e.target.value)}
              >
                <option value='oae'>{data.oae.pathway_name}</option>
                <option value='seaweed'>{data.seaweed.pathway_name}</option>
                <option value='ew'>{data.ew.pathway_name}</option>
              </Select>

              <Flex sx={{ gap: 3 }}>
                <Badge>
                  {VCL && VCL.find(Boolean) ? VCL.join(' - ') : 'X - X'}
                </Badge>
                <Box sx={{ color: 'secondary' }}>
                  Verification Confidence Level (VCL)
                </Box>
              </Flex>

              <Box>{pathway_description}</Box>
            </Flex>

            <Divider sx={{ my: 5, ml: [0, 0, '-32px', '-48px'] }} />
          </Box>

          {pathway === 'oae' && <OAE />}
          {pathway === 'seaweed' && <Seaweed />}
          {pathway === 'ew' && <EnhancedWeathering />}
        </Column>
      </Row>
    </Layout>
  )
}

export default Index
