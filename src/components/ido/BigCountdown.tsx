import classNames from 'classnames'
import { Box, Card, Stack, Text } from 'degen'
import moment from 'moment'
import Countdown from 'react-countdown'

interface CountdownBlockProps {
  count: string
  label: string
  isLast?: boolean
}

const CountdownBlock: React.FC<CountdownBlockProps> = ({
  count,
  label,
  isLast,
}) => {
  return (
    <>
      <Card padding="5">
        <Box width="15">
          <Stack>
            <Box>
              <Text align="center" size="headingTwo" color="accent">
                {count}
              </Text>
            </Box>
            <Box>
              <Text align="center">{label}</Text>
            </Box>
          </Stack>
        </Box>
      </Card>
      {!isLast && (
        <Box display="flex" alignItems="center">
          <Text size="headingTwo" color="accent">
            :
          </Text>
        </Box>
      )}
    </>
  )
}

interface BigCountdownProps {
  date: moment.Moment
  className?: string
  onComplete: () => void
}

const BigCountdown: React.FC<BigCountdownProps> = ({
  className,
  date,
  onComplete,
}) => {
  const renderCountdown = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <div />
    } else {
      return (
        <Box marginY="10">
          <Stack wrap direction="horizontal" justify="center">
            <CountdownBlock count={days} label="DAYS" />
            <CountdownBlock count={hours} label="HOURS" />
            <CountdownBlock count={minutes} label="MINS" />
            <CountdownBlock count={seconds} label="SECS" isLast />
          </Stack>
        </Box>
      )
    }
  }

  if (date) {
    return (
      <Countdown
        date={date.format()}
        renderer={renderCountdown}
        onComplete={onComplete}
      />
    )
  } else {
    return null
  }
}

export default BigCountdown
