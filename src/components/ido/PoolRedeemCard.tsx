import BigNumber from 'bignumber.js'
import { Box, Button, Stack, Text } from 'degen'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { IDO_RESULTS } from '../../config/constants'
import useLargestAccounts from '../../hooks/useLargestAccounts'
import usePool from '../../hooks/usePool'
import useVaults from '../../hooks/useVaults'
import { notify } from '../../stores/useNotificationStore'
import useWalletStore, { PoolAccount } from '../../stores/useWalletStore'
import { calculateSupply } from '../../utils/balance'
import NumberText from '../texts/Number'
import PoolCountdown from './PoolCountdown'
// import * as styles from '../../styles/styles.css'

interface PoolRedeemCardProps {
  pool: PoolAccount
}

const PoolRedeemCard: React.FC<PoolRedeemCardProps> = ({ pool }) => {
  const actions = useWalletStore((s) => s.actions)
  const connected = useWalletStore((s) => s.connected)
  const mints = useWalletStore((s) => s.mints)
  const largestAccounts = useLargestAccounts(pool)
  const { prtBalance, usdcBalance, fetchVaults, estimatedPrice } =
    useVaults(pool)
  const { startRedeem, poolStatus } = usePool(pool)
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  const HONEY_TOTAL = 85_000_000

  const contributeBalance = largestAccounts.redeemable?.balance || 0

  const realTokenPrice = estimatedPrice

  const redeemablePrtAmount = useMemo(() => {
    const redeemableSupply = calculateSupply(mints, pool.redeemableMint)
    // console.log('prt balance', prtBalance)
    // console.log('usdcBalance', usdcBalance)
    // console.log('redeemableSupply', redeemableSupply)
    // console.log('contributeBalance', contributeBalance)
    const basePrice = new BigNumber(0.5)
    return prtBalance && redeemableSupply
      ? (contributeBalance * prtBalance) / redeemableSupply
      : 0
    // console.log('realTokenPrice', realTokenPrice.toString())
    if (realTokenPrice < new BigNumber(0.5)) {
      const tokenMultiple = realTokenPrice.dividedBy(basePrice)
      // console.log('tokenMultiple', tokenMultiple.toString())
      return prtBalance && redeemableSupply
        ? ((contributeBalance * HONEY_TOTAL) / usdcBalance) *
            Number(tokenMultiple.toString())
        : 0
    } else {
      return prtBalance && redeemableSupply
        ? (contributeBalance * prtBalance) / redeemableSupply
        : 0
    }
  }, [prtBalance, contributeBalance, mints, pool.redeemableMint])

  const handleRedeem = useCallback(() => {
    setSubmitting(true)
  }, [])

  useEffect(() => {
    if (pool.redeemableMint) {
      actions.fetchMints()
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    if (largestAccounts.redeemable) {
      setLoading(false)
    }
  }, [largestAccounts])

  useEffect(() => {
    if (submitting) {
      const handleSubmit = async () => {
        try {
          await actions.submitRedeem(pool)
          setSubmitting(false)
          fetchVaults()
        } catch (e) {
          notify({
            type: 'error',
            title: 'Redeem error',
            message: e.message,
          })
          setSubmitting(false)
        }
      }
      handleSubmit()
    }
  }, [submitting])

  // const idoResult = IDO_RESULTS[pool.publicKey.toBase58()]
  // const estimatedPrice = useMemo(() => {
  //   if (realTokenPrice >= new BigNumber(0.5)) {
  //     return realTokenPrice
  //   } else {
  //     return new BigNumber(0.5)
  //   }
  // }, [usdcBalance, prtBalance])
  // const estimatedPrice = new BigNumber(
  //   idoResult?.contributed || usdcBalance
  // ).dividedBy(idoResult?.allocation || prtBalance)

  const disableSubmit =
    !connected || loading || redeemablePrtAmount <= 0 || startRedeem.isAfter()

  return (
    <Stack space="2">
      {startRedeem.isAfter() && (
        <Box
          backgroundColor="backgroundSecondary"
          textAlign="center"
          marginBottom="2"
        >
          <Text size="small" color="textSecondary">
            Redeem starts
          </Text>
          <PoolCountdown
            poolStatus={poolStatus}
            date={startRedeem}
            className="justify-center pt-2"
          />
        </Box>
      )}
      <Box
        backgroundColor="backgroundSecondary"
        borderRadius="2xLarge"
        padding="6"
        textAlign="center"
      >
        <Text size="small" color="textSecondary">
          Total raised
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
            value={usdcBalance}
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
          Token Price
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
            value={usdcBalance / 85000000}
            defaultIfNull="N/A"
            displayDecimals={9}
          />
        </Box>
      </Box>
      <Box
        textAlign="center"
        backgroundColor="backgroundSecondary"
        borderRadius="2xLarge"
        padding="6"
      >
        <Text size="small" color="textSecondary">
          Your contribution
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
            value={contributeBalance}
            defaultIfNull="N/A"
          />
        </Box>
      </Box>
      <Box
        backgroundColor="backgroundSecondary"
        textAlign="center"
        borderRadius="2xLarge"
        padding="6"
      >
        <Text size="small" color="textSecondary">
          Redeemable amount
        </Text>
        <Box
          display="flex"
          paddingTop="2"
          justifyContent="center"
          alignItems="center"
        >
          <img
            alt=""
            width="20"
            height="20"
            src="/icons/logo.png"
            className="mr-2"
          />
          <NumberText
            className="font-bold text-mdx"
            value={redeemablePrtAmount}
            displayDecimals={9}
            defaultIfNull="N/A"
          />
        </Box>
      </Box>
      <Button
        onClick={handleRedeem}
        width="full"
        disabled={disableSubmit}
        loading={submitting}
      >
        {submitting ? 'Waiting approval' : 'Redeem HONEY'}
      </Button>
    </Stack>
  )
}

export default PoolRedeemCard
