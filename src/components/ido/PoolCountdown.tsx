import classNames from 'classnames'
import { Box, Text } from 'degen'
import moment from 'moment'
import Countdown from 'react-countdown'

import { useRefresh } from '../../hooks/useRefresh'

interface PoolCountdownProps {
  date: moment.Moment
  poolStatus: string
  className?: string
}

const PoolCountdown: React.FC<PoolCountdownProps> = ({
  date,
  poolStatus,
  className,
}) => {
  const { doForceRefresh } = useRefresh()

  const renderCountdown = ({ days, hours, minutes, seconds, completed }) => {
    hours += days * 24
    if (completed) {
      return (
        <Box marginTop="2" paddingY="2">
          <Text size="small">{poolStatus}</Text>
        </Box>
      )
    } else {
      return (
        <Box display="flex" alignItems="center">
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box
              as="span"
              backgroundColor="black"
              textAlign="center"
              marginX="1"
              marginBottom="1"
              width="8"
              display="inline-block"
              paddingY="2"
              borderRadius="medium"
            >
              <Text as="span" weight="bold" color="text">
                {hours < 10 ? `0${hours}` : hours}
              </Text>
            </Box>
            <Text as="span" size="small" color="textSecondary">
              hrs
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box
              as="span"
              backgroundColor="black"
              textAlign="center"
              marginX="1"
              marginBottom="1"
              width="8"
              display="inline-block"
              paddingY="2"
              borderRadius="medium"
            >
              <Text as="span" weight="bold" color="text">
                {minutes < 10 ? `0${minutes}` : minutes}
              </Text>
            </Box>
            <Text as="span" size="small" color="textSecondary">
              mins
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box
              as="span"
              backgroundColor="black"
              textAlign="center"
              marginX="1"
              marginBottom="1"
              width="8"
              display="inline-block"
              paddingY="2"
              borderRadius="medium"
            >
              <Text as="span" weight="bold" color="text">
                {seconds < 10 ? `0${seconds}` : seconds}
              </Text>
            </Box>

            <Text as="span" size="small" color="textSecondary">
              secs
            </Text>
          </Box>
        </Box>
      )
    }
  }

  if (date) {
    return (
      <Countdown
        date={date.format()}
        renderer={renderCountdown}
        onComplete={doForceRefresh}
      />
    )
  } else {
    return null
  }
}

export default PoolCountdown
