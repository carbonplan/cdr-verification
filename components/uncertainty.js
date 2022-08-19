import { Box, Flex } from 'theme-ui'
import { Question } from '@carbonplan/icons'
import { UNCERTAINTIES } from './constants'

const Uncertainty = ({ min, max, sx }) => {
  const quantity = UNCERTAINTIES.indexOf(max)
  const asterisk = min !== max

  return (
    <Flex sx={{ position: 'relative', ...sx }}>
      {new Array(quantity).fill(null).map((_, i) => (
        <Question key={i} />
      ))}
      {new Array(3 - quantity).fill(null).map((_, i) => (
        <Question key={i} sx={{ color: 'secondary' }} />
      ))}
      <Box
        sx={{
          fontFamily: 'mono',
          letterSpacing: 'mono',
          color: 'secondary',
          position: 'absolute',
          right: 0,
          mt: -1,
          mr: -2,
        }}
      >
        {asterisk ? '*' : ''}
      </Box>
    </Flex>
  )
}

export default Uncertainty
