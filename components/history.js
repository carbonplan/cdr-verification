import { Box, Divider, Flex, useThemeUI } from 'theme-ui'
import { Button, Column, formatDate, Row } from '@carbonplan/components'
import { useMemo } from 'react'

import Description from './description'
import { RotatingArrow } from '@carbonplan/icons'

const History = ({ history, versionRoutes, sx }) => {
  const { theme } = useThemeUI()
  const sortedEntries = useMemo(
    () => history.sort((a, b) => new Date(b.date) - new Date(a.date)),
    [history]
  )
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        gap: 3,
        ...sx,
      }}
    >
      <Row columns={[6, 6, 4, 4]} sx={{ mb: 4 }}>
        <Column start={2} width={[5, 5, 3, 3]}>
          <Row
            columns={[5, 5, 3, 3]}
            sx={{
              borderWidth: 0,
              borderLeft: '1px',
              borderColor: 'secondary',
              borderStyle: 'solid',
              ml: [
                `calc(-1 * (24px + (100vw - 7 * 24px) / 6 / 2))`,
                `calc(-1 * (32px + (100vw - 9 * 32px) / 8 / 2))`,
                `calc(-1 * (32px + (100vw - 13 * 32px) / 12 / 2))`,
                `calc(-1 * (48px + (100vw - 13 * 48px) / 12 / 2))`,
              ],
              pl: [
                `calc((24px + (100vw - 7 * 24px) / 6 / 2))`,
                `calc((32px + (100vw - 9 * 32px) / 8 / 2))`,
                `calc((32px + (100vw - 13 * 32px) / 12 / 2))`,
                `calc((48px + (100vw - 13 * 48px) / 12 / 2))`,
              ],
            }}
          >
            {sortedEntries.map(({ date, note, version }) => (
              <Column
                key={date}
                start={1}
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
                      {versionRoutes && versionRoutes[version] ? (
                        <Button
                          href={versionRoutes[version]}
                          inverted
                          suffix={
                            <RotatingArrow
                              sx={{ mt: ['-2px', '-2px', '-2px', '-3px'] }}
                            />
                          }
                          sx={{
                            fontFamily: 'mono',
                            letterSpacing: '0.05em',
                            fontSize: [1, 1, 1, 2],
                          }}
                        >
                          v{version}
                        </Button>
                      ) : (
                        `v${version}`
                      )}
                    </Column>
                  )}
                </Row>

                <Description sx={{ fontSize: 1 }} value={note} />
              </Column>
            ))}
          </Row>
        </Column>
      </Row>
    </Flex>
  )
}

export default History
