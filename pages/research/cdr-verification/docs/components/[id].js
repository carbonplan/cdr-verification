import { Badge, Button, Column, Row } from '@carbonplan/components'
import { RotatingArrow } from '@carbonplan/icons'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { Box, Flex } from 'theme-ui'

import { CATEGORY_COLORS } from '../../../../../components/constants'
import Description from '../../../../../components/description'
import Documentation from '../../../../../components/documentation'
import History from '../../../../../components/history'
import Select from '../../../../../components/select'
import {
  TooltipButton,
  TooltipContent,
} from '../../../../../components/tooltip'
import Uncertainty from '../../../../../components/uncertainty'
import components from '../../../../../data/components.json'
import { pathways } from '../../../../../utils/data'

const ComponentDocumentation = ({ component, options, pathways }) => {
  const [expanded, setExpanded] = useState(false)
  const router = useRouter()
  const setComponent = useCallback((component_id) => {
    router.replace(`/research/cdr-verification/docs/components/${component_id}`)
  })

  return (
    <Documentation label='Component' back='/research/cdr-verification'>
      <Row columns={[6, 8, 7, 7]}>
        <Column start={1} width={[4, 4, 4, 4]}>
          <Select
            value={component.component_id}
            options={options}
            onChange={setComponent}
            size={['sm', 'sm', 'lg', 'lg']}
          />
        </Column>
        <Column
          start={[5, 5, 6, 6]}
          width={[2, 2, 1, 1]}
          sx={{ mt: 2, position: 'relative' }}
        >
          <Box
            as='span'
            sx={{
              display: ['none', 'none', 'inherit', 'inherit'],
              fontFamily: 'mono',
              letterSpacing: 'mono',
              textTransform: 'uppercase',
              color: 'secondary',
              position: 'absolute',
              right: '100%',
              mr: 3,
            }}
          >
            Uncertainty
          </Box>
          <Uncertainty
            min={component.uncertainty_impact_min}
            max={component.uncertainty_impact_max}
            color={CATEGORY_COLORS[component.category] ?? 'grey'}
          />
          <TooltipButton
            mt='6px'
            sx={{
              position: 'absolute',
              top: 0,
              left: [-4, -4, 'inherit', 'inherit'],
              right: -4,
            }}
            setExpanded={setExpanded}
            expanded={expanded}
          />
        </Column>
        <Column start={1} width={[6, 8, 6, 6]}>
          <TooltipContent expanded={expanded}>
            The potential impact of the uncertainty on final estimates of net
            carbon removal or storage duration: negligible, low, medium, high,
            or very high.
          </TooltipContent>
        </Column>

        <Column
          start={1}
          width={[6, 8, 6, 6]}
          sx={{ mt: [3, 3, 3, 4], fontSize: [1] }}
        >
          <Description value={component.description} />
        </Column>

        <Column start={1} width={[6, 6, 4, 4]} sx={{ mt: 6 }}>
          <Box sx={{ fontSize: 4 }}>Applicable pathways</Box>
          <Row columns={[6, 6, 4, 4]} sx={{ fontFamily: 'heading', my: 4 }}>
            <Column start={1} width={[5, 5, 3, 3]}>
              Pathway
            </Column>

            <Column start={[6, 6, 4, 4]} width={1} sx={{ textAlign: 'right' }}>
              VCL
            </Column>
          </Row>
          <Flex sx={{ mt: 3, flexDirection: 'column', gap: 4 }}>
            {pathways
              .sort((a, b) => a.pathway_name.localeCompare(b.pathway_name))
              .map(({ pathway_id, pathway_name, VCL }) => (
                <Row key={pathway_id} columns={[6, 6, 4, 4]}>
                  <Column start={1} width={[5, 5, 3, 3]}>
                    <Button
                      href={`/research/cdr-verification/${pathway_id}`}
                      inverted
                      size='xs'
                      suffix={<RotatingArrow />}
                    >
                      {pathway_name}
                    </Button>
                  </Column>

                  <Column
                    start={[6, 6, 4, 4]}
                    width={1}
                    sx={{ textAlign: 'right', whiteSpace: 'nowrap' }}
                  >
                    <Badge>{VCL[0] === VCL[1] ? VCL[0] : VCL.join('-')}</Badge>
                  </Column>
                </Row>
              ))}
            {pathways.length === 0 && (
              <Box sx={{ color: 'secondary' }}>No current pathways</Box>
            )}
          </Flex>
        </Column>
        <Column start={1} width={[6, 6, 4, 4]} sx={{ my: [4, 4, 6, 6] }}>
          <Box sx={{ fontSize: 4 }}>Revision history</Box>

          <History history={component.revisions} sx={{ mt: 3 }} />
        </Column>
      </Row>
    </Documentation>
  )
}

export function getStaticProps({ params: { id } }) {
  const component = components.find((c) => c.component_id === id)

  return {
    props: {
      component,
      options: components
        .filter((c) => c.component_id === id || c.pathways.length > 0)
        .map((c) => ({
          value: c.component_id,
          label: c.secondary_name
            ? `${c.component_name} (${c.secondary_name})`
            : c.component_name,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
      pathways: component.pathways.map((id) => {
        const { pathway_id, pathway_name, VCL } = pathways.find(
          (pathway) => pathway.pathway_id === id
        )
        return { pathway_id, pathway_name, VCL }
      }),
    },
  }
}

export function getStaticPaths() {
  return {
    paths: components.map((c) => ({ params: { id: c.component_id } })),
    fallback: false,
  }
}

export default ComponentDocumentation
