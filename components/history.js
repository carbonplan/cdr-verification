import { Box, Divider, Flex, useThemeUI } from 'theme-ui'
import { Column, formatDate, Row } from '@carbonplan/components'
import { useMemo } from 'react'

import Description from './description'

const History = ({ history, sx }) => {
  const sortedEntries = useMemo(
    () => history.sort((a, b) => new Date(b.date) - new Date(a.date)),
    [history]
  )
  const { theme } = useThemeUI()
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        gap: 3,
        ...sx,
      }}
    >
      <Row
        columns={[6, 6, 4, 4]}
        sx={{ height: '100%', position: 'relative', mb: 4 }}
      >
        <Column
          start={1}
          width={1}
          sx={{ position: 'absolute', height: '100%', width: '100%' }}
        >
          <Box
            sx={{
              width: '50%',
              height: '100%',
              borderWidth: 0,
              borderRight: '1px',
              borderColor: 'secondary',
              borderStyle: 'solid',
            }}
          />
        </Column>
        {sortedEntries.map(({ date, note, version }) => (
          <Column
            key={date}
            start={2}
            width={[4, 4, 3, 3]}
            sx={{ position: 'relative', mt: 3, mb: 2 }}
          >
            <Box
              as='svg'
              width='12'
              height='12'
              viewBox='0 0 13 13'
              fill='none'
              sx={{
                position: 'absolute',
                mt: '-6px',
                ml: [
                  `calc(-7.25px - (24px + (100vw - 7 * 24px) / 6 / 2))`,
                  `calc(-7px - (32px + (100vw - 9 * 32px) / 8 / 2))`,
                  `calc(-6.25px - (32px + (100vw - 13 * 32px) / 12 / 2))`,
                  `calc(-6.25px - (48px + (100vw - 13 * 48px) / 12 / 2))`,
                ],
              }}
            >
              <circle
                cx='6.5'
                cy='6.5'
                r='6'
                fill={theme.colors.background}
                stroke={theme.colors.secondary}
              />
            </Box>

            <Divider sx={{ my: 0 }} />
            <Row
              columns={[4, 4, 3, 3]}
              sx={{
                color: 'secondary',
                fontFamily: 'mono',
                letterSpacing: '0.05em',
                fontSize: [1, 1, 1, 2],
                userSelect: 'none',
                textTransform: 'uppercase',
                flexShrink: 0,
                mt: 2,
                mb: 3,
              }}
            >
              <Column start={1} width={2}>
                {formatDate(date)}
              </Column>
              {version && (
                <Column start={3} width={1} sx={{ textTransform: 'none' }}>
                  v{version}
                </Column>
              )}
            </Row>

            <Description sx={{ fontSize: 1 }} value={note} />
          </Column>
        ))}
      </Row>
    </Flex>
  )
}

export default History
