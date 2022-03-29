import { QuestionMarkCircleIcon } from '@heroicons/react/outline'
import BigNumber from 'bignumber.js'
import { Box, Text, vars } from 'degen'
import moment from 'moment'
import React from 'react'

import NumberText from '../texts/Number'
import { useTooltip } from '../tooltip'
import PoolCountdown from './PoolCountdown'

interface StatsCardProps {
  endIdo: moment.Moment
  poolStatus: string
  estimatedPrice: BigNumber
  vaultPrtBalance: number
  vaultUsdcBalance: number
}

const StatsCard: React.FC<StatsCardProps> = ({
  endIdo,
  poolStatus,
  estimatedPrice,
  vaultPrtBalance,
  vaultUsdcBalance,
}) => {
  const {
    targetRef: targetSaleRef,
    tooltip: tooltipSale,
    tooltipVisible: tooltipSaleVisible,
  } = useTooltip(
    `In the first 24 hours, you may deposit your USDC into the vault. During the sale period, the HONEY price can fluctuate.`,
    {
      placement: 'bottom-start',
      trigger: 'hover',
    }
  )

  const {
    targetRef: targetGraceRef,
    tooltip: tooltipGrace,
    tooltipVisible: tooltipGraceVisible,
  } = useTooltip(`After 24 hours, deposits will be restricted.`, {
    placement: 'bottom-start',
    trigger: 'hover',
  })

  return (
    <div className="flex flex-col space-y-2">
      <Box
        backgroundColor="backgroundSecondary"
        borderRadius="2xLarge"
        padding="6"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <div>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Text as="p" size="small" color="textSecondary">
              Sale Period Ends
              <QuestionMarkCircleIcon
                color={vars.colors.text}
                className="h-5 w-5"
              />
              {tooltipSaleVisible && <Text size="small">{tooltipSale}</Text>}
            </Text>
          </Box>
          <PoolCountdown
            poolStatus={poolStatus}
            date={endIdo}
            className="justify-center pt-2"
          />
        </div>
        {/* <div>
          <div className="text-sm text-secondary flex flex-row items-center justify-center">
            <span className="mr-1">Grace Period Ends</span>
            <span ref={targetGraceRef}>
              <QuestionMarkCircleIcon className="h-5 w-5" />
            </span>
            {tooltipGraceVisible && tooltipGrace}
          </div>
          <PoolCountdown
            poolStatus={poolStatus}
            date={endIdo}
            className="justify-center pt-2"
          />
        </div> */}
      </Box>
      <Box
        backgroundColor="backgroundSecondary"
        borderRadius="2xLarge"
        padding="6"
        textAlign="center"
      >
        <Text size="small" color="textSecondary">
          USDC Contributed
        </Text>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          paddingTop="2"
        >
          <img
            alt=""
            width="20"
            height="20"
            src="/icons/usdc.svg"
            className="mr-2"
          />
          <NumberText
            className="font-bold text-mdx"
            value={vaultUsdcBalance}
            defaultIfNull="N/A"
          />
        </Box>
      </Box>
      <Box
        backgroundColor="backgroundSecondary"
        borderRadius="2xLarge"
        padding="6"
        textAlign="center"
      >
        <Text size="small" color="textSecondary">
          Estimated Token Price
        </Text>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          paddingTop="2"
        >
          <img
            alt=""
            width="20"
            height="20"
            src="/icons/usdc.svg"
            className="mr-2"
          />
          <NumberText
            className="font-bold text-mdx"
            value={estimatedPrice}
            defaultIfNull="N/A"
            displayDecimals={9}
          />
        </Box>
      </Box>
      <Box
        backgroundColor="backgroundSecondary"
        padding="6"
        textAlign="center"
        borderRadius="2xLarge"
      >
        <Text size="small" color="textSecondary">
          HONEY For Sale
        </Text>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          paddingTop="2"
        >
          <img
            className="h-5 mr-2 w-auto"
            src="/icons/logo.png"
            alt="Genesys Go"
          />
          <NumberText
            className="font-bold text-mdx"
            value={vaultPrtBalance}
            defaultIfNull="N/A"
            displayDecimals={9}
          />
        </Box>
      </Box>
    </div>
  )
}

export default StatsCard
