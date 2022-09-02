import { useCallback, useMemo, useState } from 'react'
import { Box, Flex, Container, Divider } from 'theme-ui'
import {
  Badge,
  Layout,
  Row,
  Column,
  Filter,
  Tray,
  useScrollbarClass,
  Link,
} from '@carbonplan/components'
import FLOW_DIAGRAMS from '../components/flow-diagrams'
import Element from '../components/element'
import { CATEGORY_COLORS } from '../components/constants'
import { getElements } from '../components/utils'
import TableHeader from '../components/table/header'
import { ElementProvider } from '../components/context/element'
import PathwayInfo from '../components/pathway-info'
import PathwaySelector from '../components/pathway-selector'
import Tooltip from '../components/tooltip'
import Equation from '../components/equation'
import legend from '../data/legend.json'
import pathways from '../data/pathways.json'

const Index = () => {
  const [pathway, setPathway] = useState(pathways[0].pathway_name)
  const [filters, setFilters] = useState({
    drawdown: true,
    emissions: true,
    operations: true,
    permanence: true,
  })
  const [sort, setSort] = useState('number')
  const [settings, setSettings] = useState(false)
  const scrollClass = useScrollbarClass()

  const openTray = useCallback(() => setSettings(true), [])

  const { elements, pathway_description, VCL, equation } = useMemo(
    () => pathways.find((p) => p.pathway_name === pathway),
    [pathway]
  )

  return (
    <Layout
      title='CDR MRV – CarbonPlan'
      container={false}
      footer={false}
      metadata={false}
      nav={'research'}
      settings={{
        value: settings,
        onClick: () => setSettings((prev) => !prev),
      }}
    >
      <Box>
        <Container>
          <ElementProvider pathway={pathway}>
            <Row>
              <Column
                start={1}
                width={[6, 8, 4, 4]}
                className={scrollClass}
                sx={{
                  position: 'sticky',
                  top: 56,
                  height: 'calc(100vh - 56px)',
                  overflowY: 'scroll',
                  pl: [4, 5, 5, 6],
                  ml: [-4, -5, -5, -6],
                  // nudge scrollbar over for mobile (1 gutter) and desktop (1 gutter + 1/2 column)
                  pr: [
                    16,
                    24,
                    `calc(32px + (100vw - 13 * 32px) / 12 / 2)`,
                    `calc(48px + (100vw - 13 * 48px) / 12 / 2)`,
                  ],
                  mr: [
                    -16,
                    -24,
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
                    fontSize: 1,
                    fontFamily: 'body',
                    lineHeight: 'body',
                  }}
                >
                  This is an interactive tool for exploring the key
                  uncertainties around quantifying net carbon removal and
                  permanence outcomes for different CDR pathways. Read our{' '}
                  <Link href='https://docs.google.com/document/d/1xf6Uvrolq1dPtzV4KUrd21dDxdhWvsBgcvpnD2v65Vk/edit'>
                    explainer article
                  </Link>{' '}
                  or{' '}
                  <Link href='https://docs.google.com/document/d/1n-vM-AySdneugQ_niZuoBVEX_a7S37aq3vzRwV71euY/edit'>
                    methods
                  </Link>{' '}
                  for more detail.
                </Box>

                <Divider sx={{ mt: 5, mb: 0, mr: [0, 0, '-32px', '-48px'] }} />

                <Box sx={{ mt: 3 }}>
                  <Box sx={{ display: ['initial', 'initial', 'none', 'none'] }}>
                    <Tooltip tooltip={pathway_description} align='center'>
                      <Flex sx={{ gap: 2 }}>
                        <PathwaySelector
                          pathway={pathway}
                          setPathway={setPathway}
                          size='md'
                          sx={{ mb: 2 }}
                        />

                        <Badge sx={{ flexShrink: 0, mt: '5px' }}>
                          <Box as='span' sx={{ color: 'secondary' }}>
                            VCL
                          </Box>{' '}
                          {VCL[0] === VCL[1] ? VCL[0] : VCL.join('-')}
                        </Badge>
                      </Flex>
                    </Tooltip>

                    <Divider sx={{ mb: 3, ml: [0, 0, '-32px', '-48px'] }} />
                  </Box>

                  <Tooltip tooltip={legend.category} mt='10px'>
                    <Filter
                      values={filters}
                      setValues={setFilters}
                      colors={CATEGORY_COLORS}
                      showAll
                    />
                  </Tooltip>

                  <Divider
                    sx={{ mb: 5, mt: 3, mr: [0, 0, '-32px', '-48px'] }}
                  />
                </Box>

                <Row columns={[6, 8, 4, 4]}>
                  <Column>
                    <TableHeader
                      sort={sort}
                      setSort={setSort}
                      id='number'
                      label='Number'
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
                  <Element key={d.element} openTray={openTray} {...d} />
                ))}
              </Column>
              <Column
                start={[1, 1, 5, 5]}
                width={[1, 1, 1, 1]}
                sx={{ display: ['none', 'none', 'initial'] }}
              >
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
                  display: ['none', 'none', 'initial', 'initial'],
                  px: [4, 5, 5, 6],
                  mx: [-4, -5, -5, -6],
                }}
              >
                <Box sx={{ mt: '44px' }}>
                  <PathwayInfo pathway={pathway} setPathway={setPathway} />
                  <Divider sx={{ my: 5, ml: [0, 0, '-32px', '-48px'] }} />
                </Box>

                {FLOW_DIAGRAMS[pathway]}
              </Column>
            </Row>
            <Tray
              expanded={settings}
              className={scrollClass}
              sx={{ maxHeight: 'calc(100vh - 56px)', overflowY: 'scroll' }}
            >
              {FLOW_DIAGRAMS[pathway]}
              <Equation elements={elements} equation={equation} />
            </Tray>
          </ElementProvider>
        </Container>
      </Box>
    </Layout>
  )
}

export default Index
