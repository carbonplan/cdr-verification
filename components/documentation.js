import { Button, Column, Row } from '@carbonplan/components'
import { Left } from '@carbonplan/icons'
import { Box, Flex } from 'theme-ui'
import Page from './page'

const Documentation = ({ back, label, children }) => {
  return (
    <Page
      trayExpanded={false}
      sidebar={
        <>
          <Row columns={[6, 6, 4, 4]} sx={{ pt: 4 }}>
            <Column start={1} width={[6, 6, 3, 3]} sx={{ order: 0 }}>
              <Box
                sx={{
                  pb: [4, 4, 5, 5],
                  fontSize: [5, 6, 6, 7],
                  width: 'fit-content',
                  fontFamily: 'heading',
                  lineHeight: 'heading',
                }}
              >
                CDR Verification Framework Documentation
              </Box>
            </Column>
            <Column
              start={[4, 4, 4, 4]}
              width={[3, 3, 1, 1]}
              sx={{ order: [2, 2, 1, 1] }}
            >
              <Flex sx={{ justifyContent: 'flex-end' }}>
                <Box
                  sx={{
                    ml: [0, 0, '100%', '100%'],
                    mr: [0, 0, '5px', '5px'],
                    mt: [0, 0, '10px', '10px'],
                    writingMode: [
                      'inherit',
                      'inherit',
                      'vertical-lr',
                      'vertical-lr',
                    ],
                    fontFamily: 'mono',
                    letterSpacing: 'mono',
                    color: 'secondary',
                    textTransform: 'uppercase',
                    fontSize: 2,
                  }}
                >
                  Docs: {label}
                </Box>
              </Flex>
            </Column>
            <Column start={1} width={[3, 3, 4, 4]} sx={{ order: [1, 1, 2, 2] }}>
              <Button
                inverted
                size='xs'
                onClick={() => {
                  if (window.history.state?.idx) {
                    window.history.back()
                  } else {
                    window.location.href = back
                  }
                }}
                prefix={<Left />}
                sx={{
                  mt: [1, 1, 0, 0],
                  ml: ['-2px', '-2px', '-2px', '-2px'],
                  '@media print': {
                    display: 'none',
                  },
                }}
              >
                Back to tool
              </Button>
            </Column>
          </Row>

          <Box
            sx={{
              mt: [5, 3, 0, 0],
              display: ['inherit', 'inherit', 'none', 'none'],
            }}
          >
            {children}
          </Box>
        </>
      }
    >
      <Box sx={{ mt: '44px' }}>{children}</Box>
    </Page>
  )
}

export default Documentation
