import { Box, Stack, Text } from 'degen'
import React, { ReactNode } from 'react'

import usePool from '../../hooks/usePool'
import { PoolAccount } from '../../stores/useWalletStore'
import CardBase from './CardBase'
import PoolCountdown from './PoolCountdown'

interface CardOverlayProps {
  pool: PoolAccount
  title: string
  children: ReactNode
}

const CardOverlay: React.FC<CardOverlayProps> = ({ children, pool, title }) => {
  const { startIdo, endIdo, startRedeem, poolStatus } = usePool(pool)
  const notStarted = startIdo.isAfter()
  const notRedeem = endIdo.isBefore() && startRedeem.isAfter()

  const hasEnded = endIdo.isBefore()
  const hasOverlay = notStarted

  return (
    <CardBase
      title={title}
      overlayContent={
        hasOverlay && (
          <Box
            position="fixed"
            zIndex="100"
            width="full"
            paddingX="8"
            height="full"
            display="flex"
            top="0"
            left="0"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              backgroundColor="background"
              width="full"
              padding="6"
              borderRadius="3xLarge"
            >
              <Stack align="center" direction="vertical" space="3">
                {notStarted && <Text as="h3">Entry Starts</Text>}
                {notRedeem && <Text as="h3">Redeem Starts</Text>}
                <PoolCountdown
                  date={notStarted ? startIdo : startRedeem}
                  poolStatus={poolStatus}
                />
              </Stack>
            </Box>
          </Box>
        )
      }
      titleRight={
        !hasEnded && (
          <div className="bg-brandSecondary rounded-3xl mt-1 px-3 py-2 text-xs font-bold">
            {/* {notRedeem ? 'Grace Period' : 'Sale Period'} */}
          </div>
        )
      }
    >
      {children}
    </CardBase>
  )
}

export default CardOverlay
