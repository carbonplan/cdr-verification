import { useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Flex, Divider } from 'theme-ui'
import { Badge, Row, Column, Filter, Link } from '@carbonplan/components'
import { useRouter } from 'next/router'

import Page from './page'
import FLOW_DIAGRAMS from './flow-diagrams'
import Component from './component'
import { CATEGORY_COLORS } from './constants'
import { getComponents } from './utils'
import TableHeader from './table/header'
import { ComponentProvider } from './context/component'
import PathwayInfo from './pathway-info'
import PathwaySelector from './pathway-selector'
import Tooltip, { TooltipContent, TooltipWrapper } from './tooltip'
import Equation from './equation'
import legend from '../data/legend.json'
import Description from './description'

const Main = ({ pathways, settings, setSettings }) => {
  const router = useRouter()
  const [filters, setFilters] = useState({
    drawdown: true,
    emissions: true,
    durability: true,
  })
  const [sort, setSort] = useState('component')
  const [expanded, setExpanded] = useState(false)

  const pathway = useMemo(
    () => pathways.find((p) => p.pathway_id === router.query.id) ?? pathways[0],
    [router.query.id]
  )
  const {
    pathway_id,
    components,
    pathway_description,
    VCL,
    equation,
    version,
  } = pathway

  useEffect(() => {
    // If the pathway ID in the route does not match pathway ID, we've fallen back
    // to the default and should update the route.
    if (router.query.id && router.query.id !== pathway.pathway_id) {
      router.replace('/research/cdr-verification')
    }
  }, [pathway, router.query.id])

  const openTray = useCallback(() => setSettings(true), [])
  const closeTray = useCallback(() => setSettings(false), [])

  const setPathway = useCallback((name) => {
    router.replace(`/research/cdr-verification/${name}`)
  })

  return (
    <ComponentProvider
      pathways={pathways}
      pathway={pathway_id}
      onComponentChange={closeTray}
    >
      <Page
        sidebar={
          <>
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
              mapping key uncertainties for different CDR pathways. Developed in
              collaboration between CarbonPlan and{' '}
              <Link href='https://frontierclimate.com/'>Frontier</Link>. Read
              the{' '}
              <Link href='https://carbonplan.org/research/cdr-verification-explainer'>
                explainer article
              </Link>
              , the{' '}
              <Link href='http://frontierclimate.com/writing/quantifying-delivered-cdr'>
                Frontier post
              </Link>
              , or{' '}
              <Link href='https://carbonplan.org/research/cdr-verification-methods'>
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
                      pathways={pathways}
                      pathway={pathway_id}
                      setPathway={setPathway}
                      version={version}
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
                        <Description
                          value={pathway_description}
                          sx={{
                            '& a': { color: 'secondary' },
                            '& a:hover': { color: 'primary' },
                          }}
                        />
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

              <Divider sx={{ mb: 4, mt: 3, mr: [0, 0, '-32px', '-48px'] }} />
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
            {getComponents(components, filters, sort).map((d) => (
              <Component key={d.number} openTray={openTray} {...d} />
            ))}
          </>
        }
        trayExpanded={settings}
        trayContent={
          settings && (
            <>
              <Box sx={{ mb: 4 }}>{FLOW_DIAGRAMS[pathway_id]}</Box>
              <Equation components={components} equation={equation} />
            </>
          )
        }
      >
        <Box sx={{ mt: '44px' }}>
          <PathwayInfo
            pathways={pathways}
            pathway={pathway}
            setPathway={setPathway}
          />
          <Divider sx={{ my: 5, ml: [0, 0, '-32px', '-48px'] }} />
        </Box>

        <Row columns={[6, 6, 7, 7]}>
          <Column start={[1, 1, 1, 1]} width={[6, 6, 7, 5]}>
            <Box sx={{ mb: 5 }}>{FLOW_DIAGRAMS[pathway_id]}</Box>
          </Column>
        </Row>
      </Page>
    </ComponentProvider>
  )
}

export default Main
