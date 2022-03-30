import classNames from 'classnames'
import { Box, Card, Text } from 'degen'
import React, { ReactNode } from 'react'

interface CardBaseProps {
  title: string
  titleRight?: ReactNode
  overlayContent?: ReactNode
  className?: string
  children: ReactNode
}

const CardBase: React.FC<CardBaseProps> = ({
  title,
  titleRight,
  overlayContent,
  children,
  className,
}) => {
  return (
    <Card width={{ lg: '112', md: '112', sm: '112', xs: '80' }}>
      {overlayContent}
      <Box width="full" height="full">
        {!!overlayContent && (
          <div className="absolute rounded-3xl z-10 bg-overlay top-0 bottom-0 left-0 right-0" />
        )}
        <Box borderBottomWidth="0.5" padding="6">
          <Text>{title}</Text>
          {/* {titleRight} */}
        </Box>
        <div className="p-4 sm:p-6 break-words">{children}</div>
      </Box>
    </Card>
  )
}

export default CardBase
