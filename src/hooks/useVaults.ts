import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { notify } from '../stores/useNotificationStore'
import useWalletStore, { PoolAccount } from '../stores/useWalletStore'
import { calculateBalance } from '../utils/balance'
import { TokenAccount } from '../utils/tokens'
import useInterval from './useInterval'

export default function useVaults(pool: PoolAccount) {
  const { mints, actions } = useWalletStore((s) => s)
  const [usdcVault, setUsdcVault] = useState<TokenAccount | undefined>()
  const [prtVault, setPrtVault] = useState<TokenAccount | undefined>()

  const fetchVaults = useCallback(async () => {
    const { usdc, honey } = await actions.fetchVaults(pool)
    setUsdcVault(usdc)
    setPrtVault(honey)
  }, [actions, setUsdcVault, setPrtVault])

  useEffect(() => {
    fetchVaults().catch((e) => {
      notify({
        type: 'warn',
        title: 'Update vaults failed',
        message: e.message,
      })
    })
  }, [])

  useInterval(async () => {
    // refresh vaults regularly (to update price/usdc)
    await fetchVaults()
    // fetch RedeemableMint account to update mint total supply
    await actions.fetchRedeemableMint(pool)
  }, 15_000)

  const usdcBalance = useMemo(
    () => calculateBalance(mints, usdcVault),
    [mints, usdcVault]
  )
  const prtBalance = useMemo(
    () => calculateBalance(mints, prtVault),
    [mints, prtVault]
  )

  const estimatedPrice = useMemo(() => {
    // if (usdcBalance && prtBalance) {
    //   const tokenPrice = new BigNumber(usdcBalance).dividedBy(prtBalance)
    //   if (tokenPrice >= new BigNumber(0.5)) {
    //     return tokenPrice
    //   } else {
    //     return new BigNumber(0.5)
    //   }
    // } else {
    //   return new BigNumber(0.5)
    // }

    return new BigNumber(usdcBalance / prtBalance)
  }, [usdcBalance, prtBalance])

  return { usdcBalance, prtBalance, estimatedPrice, fetchVaults }
}
