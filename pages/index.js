import { useState } from 'react'
import { Box, Container, Divider, Flex } from 'theme-ui'
import {
  Layout,
  Row,
  Column,
  Filter,
  Select,
  Badge,
  useScrollbarClass,
} from '@carbonplan/components'
import { OAE, Seaweed, EnhancedWeathering } from '../components/flow-diagrams'
import oae from '../data/Ocean_Alkalinity_Enhancement_-_Electrochemical.json'
import seaweed from '../data/Ocean_Biomass_Sinking_No_-_Harvest.json'
import ew from '../data/Enhanced_Weathering.json'
import Element from '../components/element'
import { CATEGORY_COLORS } from '../components/constants'
import { getElements } from '../components/utils'
import TableHeader from '../components/table/header'
import { ElementProvider } from '../components/context/element'

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
  const scrollClass = useScrollbarClass()

  const { pathway_description, VCL, equation, elements } = data[pathway]

  return (
    <Layout
      title='CDR MRV – CarbonPlan'
      container={false}
      footer={false}
      metadata={false}
      nav={'research'}
    >
      <Box>
        <Container>
          <ElementProvider>
            <Row
              sx={{
                height: ['fit-content', 'fit-content', 'calc(100vh - 56px)'],
              }}
            >
              <Column
                start={1}
                width={[6, 7, 4, 4]}
                className={scrollClass}
                sx={{
                  position: 'sticky',
                  top: 56,
                  height: ['fit-content', 'fit-content', 'calc(100vh - 56px)'],
                  overflowY: 'scroll',
                  pl: [4, 5, 5, 6],
                  ml: [-4, -5, -5, -6],
                  // nudge scrollbar over by 1 gutter width + 1/2 column width
                  pr: [
                    `calc(24px + (100vw - 7 * 24px) / 6 / 2)`,
                    `calc(32px + (100vw - 9 * 32px) / 8 / 2)`,
                    `calc(32px + (100vw - 13 * 32px) / 12 / 2)`,
                    `calc(48px + (100vw - 13 * 48px) / 12 / 2)`,
                  ],
                  mr: [
                    `calc(-1 * (24px + (100vw - 7 * 24px) / 6 / 2))`,
                    `calc(-1 * (32px + (100vw - 9 * 32px) / 8 / 2))`,
                    `calc(-1 * (32px + (100vw - 13 * 32px) / 12 / 2))`,
                    `calc(-1 * (48px + (100vw - 13 * 48px) / 12 / 2))`,
                  ],
                }}
              >
                <Box
                  sx={{
                    pt: 4,
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
                    top: 0,
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

                  <Divider
                    sx={{ mb: 5, mt: 3, mr: [0, 0, '-32px', '-48px'] }}
                  />
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
                  <Column start={[5, 6, 4, 4]} width={1}>
                    <TableHeader
                      sort={sort}
                      setSort={setSort}
                      id='uncertainty'
                      label='Uncertainty'
                    />
                  </Column>
                </Row>
                {getElements(elements, filters, sort).map((d) => (
                  <Element key={d.element} {...d} />
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
              </Column>
              <Column
                start={[1, 2, 6, 6]}
                width={[6, 6, 7, 7]}
                className={scrollClass}
                sx={{
                  position: 'sticky',
                  top: 56,
                  height: ['fit-content', 'fit-content', 'calc(100vh - 56px)'],
                  overflowY: 'scroll',
                  px: [4, 5, 5, 6],
                  mx: [-4, -5, -5, -6],
                }}
              >
                <Box
                  sx={{
                    position: 'sticky',
                    pt: '44px',
                    top: 0,
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
                      onChange={(e) => {
                        setPathway(e.target.value)
                        // setElement(null)
                      }}
                    >
                      <option value='oae'>{data.oae.pathway_name}</option>
                      <option value='seaweed'>
                        {data.seaweed.pathway_name}
                      </option>
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
          </ElementProvider>
        </Container>
      </Box>
    </Layout>
  )
}

export default Index
