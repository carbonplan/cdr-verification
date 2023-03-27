import { Button, Column, Row } from '@carbonplan/components'
import { Left } from '@carbonplan/icons'
import { Box } from 'theme-ui'
import Page from './page'

const Documentation = ({ back, label, children }) => {
  return (
    <Page
      trayExpanded={false}
      sidebar={
        <>
          <Row columns={[6, 6, 4, 4]} sx={{ pt: 4 }}>
            <Column start={1} width={[6, 6, 3, 3]}>
              <Box
                sx={{
                  pb: [3],
                  fontSize: [5, 6, 6, 7],
                  width: 'fit-content',
                  fontFamily: 'heading',
                  lineHeight: 'heading',
                }}
              >
                CDR Verification Framework Documentation
              </Box>
            </Column>
            <Column start={[1, 1, 4, 4]} width={[6, 6, 1, 1]}>
              <Box sx={{ writingMode: 'vertical-lr' }}>{label}</Box>
            </Column>
          </Row>

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
              ml: ['-2px', '-2px', '-2px', '-2px'],
              '@media print': {
                display: 'none',
              },
            }}
          >
            Back to tool
          </Button>

          <Box sx={{ display: ['inherit', 'inherit', 'none', 'none'] }}>
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
