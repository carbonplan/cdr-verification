import { useCallback, useState } from 'react'
import { Box, Flex, Container, Divider } from 'theme-ui'
import { withAuth } from '@carbonplan/auth'
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
import { useRouter } from 'next/router'

import FLOW_DIAGRAMS from '../components/flow-diagrams'
import Element from '../components/element'
import { CATEGORY_COLORS } from '../components/constants'
import { getElements } from '../components/utils'
import TableHeader from '../components/table/header'
import { ElementProvider } from '../components/context/element'
import PathwayInfo from '../components/pathway-info'
import PathwaySelector from '../components/pathway-selector'
import Tooltip, { TooltipContent, TooltipWrapper } from '../components/tooltip'
import Equation from '../components/equation'
import legend from '../data/legend.json'

const Main = ({ pathway }) => {
  const router = useRouter()
  const [filters, setFilters] = useState({
    drawdown: true,
    emissions: true,
    durability: true,
  })
  const [sort, setSort] = useState('component')
  const [settings, setSettings] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const scrollClass = useScrollbarClass()

  const openTray = useCallback(() => setSettings(true), [])

  const setPathway = useCallback((name) => {
    router.replace(`/${name}`)
  })

  const { elements, pathway_description, pathway_name, VCL, equation } = pathway

  return (
    <Layout
      title='CDR Verification Framework – CarbonPlan'
      description='An interactive tool for understanding CDR verification
      by exploring key uncertainties around carbon removal and
      durability outcomes for different CDR pathways'
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
          <ElementProvider pathway={pathway_name}>
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
                    fontSize: [5, 6, 6, 7],
                    width: 'fit-content',
                    fontFamily: 'heading',
                    lineHeight: 'heading',
                  }}
                >
                  CDR Verification Framework
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
                  This is an interactive tool for understanding Verification
                  Confidence Levels (VCLs) for carbon dioxide removal (CDR) by
                  mapping key uncertainties for different CDR pathways.
                  Developed in collaboration between CarbonPlan and{' '}
                  <Link href='https://frontierclimate.com/'>Frontier</Link>.
                  Read our{' '}
                  <Link href='https://drafts.carbonplan.org/research/cdr-verification-explainer'>
                    explainer article
                  </Link>{' '}
                  or{' '}
                  <Link href='https://drafts.carbonplan.org/research/cdr-verification-methods'>
                    methods
                  </Link>{' '}
                  for more detail.
                </Box>

                <Divider sx={{ mt: 5, mb: 0, mr: [0, 0, '-32px', '-48px'] }} />

                <Box sx={{ mt: 3 }}>
                  <Box sx={{ display: ['initial', 'initial', 'none', 'none'] }}>
                    <Row columns={[6, 8, 4, 4]}>
                      <Column start={1} width={[4, 5, 5, 5]}>
                        <PathwaySelector
                          pathway={pathway_name}
                          setPathway={setPathway}
                          size='sm'
                          sx={{ mb: 2 }}
                        />
                      </Column>

                      <Column start={[5, 6, 6, 6]} width={[2]}>
                        <TooltipWrapper
                          expanded={expanded}
                          setExpanded={setExpanded}
                          align='center'
                          mt='10px'
                        >
                          <Box
                            sx={{
                              flexShrink: 0,
                              fontFamily: 'mono',
                              letterSpacing: 'mono',
                            }}
                          >
                            <Box as='span' sx={{ color: 'secondary' }}>
                              VCL
                            </Box>{' '}
                            <Badge>
                              {VCL[0] === VCL[1] ? VCL[0] : VCL.join('-')}
                            </Badge>
                          </Box>
                        </TooltipWrapper>
                      </Column>

                      <Column start={1} width={[6, 8, 8, 8]}>
                        <TooltipContent expanded={expanded} sx={{ mt: 1 }}>
                          <Flex sx={{ flexDirection: 'column', gap: 2 }}>
                            <Box>{pathway_description}</Box>
                            <Box>{legend.vcl}</Box>
                          </Flex>
                        </TooltipContent>
                      </Column>
                    </Row>

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
                    sx={{ mb: 4, mt: 3, mr: [0, 0, '-32px', '-48px'] }}
                  />
                </Box>

                <Row columns={[6, 8, 4, 4]}>
                  <Column>
                    <TableHeader
                      sort={sort}
                      setSort={setSort}
                      id='component'
                      label='Component'
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

                <Row columns={[6, 6, 7, 7]}>
                  <Column start={[1, 1, 1, 1]} width={[6, 6, 7, 5]}>
                    <Box sx={{ mb: 5 }}>{FLOW_DIAGRAMS[pathway_name]}</Box>
                  </Column>
                </Row>
              </Column>
            </Row>
            <Tray
              expanded={settings}
              className={scrollClass}
              sx={{ maxHeight: 'calc(100vh - 56px)', overflowY: 'scroll' }}
            >
              <Box sx={{ mb: 4 }}>{FLOW_DIAGRAMS[pathway_name]}</Box>
              <Equation elements={elements} equation={equation} />
            </Tray>
          </ElementProvider>
        </Container>
      </Box>
    </Layout>
  )
}

export default withAuth(Main, ['admin', 'guest'])
