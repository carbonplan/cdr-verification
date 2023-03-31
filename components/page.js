import { useEffect } from 'react'
import { Box, Container } from 'theme-ui'
import { Row, Column, Tray } from '@carbonplan/components'

const Page = ({ children, trayExpanded, trayContent, notice, sidebar }) => {
  useEffect(() => {
    const [body] = document.getElementsByTagName('body')
    if (trayExpanded) {
      // prevent scrolling on body when mobile tray is open
      body.style.overflow = 'hidden'
    } else if (body.style.overflow === 'hidden') {
      // restore scrolling on body when mobile tray is closed
      body.style.overflow = ''
    }
  }, [trayExpanded])

  const headerHeight = notice ? 56 + 42 : 56

  return (
    <Box>
      <Container>
        <Row>
          {notice && (
            <Column
              start={1}
              width={[6, 8, 12, 12]}
              sx={{
                position: 'sticky',
                top: 56,
                py: 2,
                px: [4, 5, 5, 6],
                mx: [-4, -5, -5, -6],
                minHeight: '42px',
                backgroundColor: 'background',
                zIndex: 3,
                borderBottom: ({ colors }) => `solid 1px ${colors.muted}`,
              }}
            >
              {notice}
            </Column>
          )}
          <Column
            start={1}
            width={[6, 8, 4, 4]}
            sx={{
              position: ['relative', 'relative', 'sticky', 'sticky'],
              top: [0, 0, headerHeight, headerHeight],
              height: [
                'auto',
                'auto',
                `calc(100vh - ${headerHeight}px)`,
                `calc(100vh - ${headerHeight}px)`,
              ],
              overflowY: ['auto', 'auto', 'scroll', 'scroll'],
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
            {sidebar}
          </Column>
          <Column
            start={[1, 1, 5, 5]}
            width={[1, 1, 1, 1]}
            sx={{ display: ['none', 'none', 'initial', 'initial'] }}
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
            sx={{
              display: ['none', 'none', 'initial', 'initial'],
              px: [4, 5, 5, 6],
              mx: [-4, -5, -5, -6],
            }}
          >
            {children}
          </Column>
        </Row>
        <Tray
          expanded={trayExpanded}
          sx={{ maxHeight: 'calc(100vh - 56px)', overflowY: 'scroll' }}
        >
          {trayExpanded && trayContent}
        </Tray>
      </Container>
    </Box>
  )
}

export default Page
