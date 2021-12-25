import { useWallet } from '@parrotfi/wallets'
import React, { useCallback } from 'react'
import Skeleton from 'react-loading-skeleton'

import { Button } from '../components/button'
import { Footer } from '../components/footer'
import { Header } from '../components/header'
import BigCountdown from '../components/ido/BigCountdown'
import CardBase from '../components/ido/CardBase'
import FAQs from '../components/ido/Faqs'
import PoolCard from '../components/ido/PoolCard'
import SecPopup from '../components/SecPopup'
import { IDO_STARTS } from '../config/constants'
import { useIDO } from '../hooks/useIDO'
import { useRefresh } from '../hooks/useRefresh'
import useWalletStore from '../stores/useWalletStore'

const Main = () => {
  const pools = useWalletStore((s) => s.pools)
  const { endpoint } = useWallet()
  const { loadIDO, loadingIDO, loadingError } = useIDO()

  const handleReload = useCallback(() => {
    loadIDO(endpoint)
  }, [endpoint.rpcURL, loadIDO])

  return (
    <main className="w-full flex flex-col items-center md:items-start justify-center my-4 space-y-4 sm:my-6 md:space-x-6 md:flex-row md:space-y-0 pb:6rem">
      {pools.map((pool, index) => (
        <PoolCard
          key={pool.publicKey.toBase58()}
          pool={pool}
          round={`${index + 1}`}
        />
      ))}
      {!!loadingError && (
        <CardBase title="Error" className="md:col-span-2">
          <p className="leading-snug mb-6">{loadingError}</p>
          <Button size="sm" onClick={handleReload}>
            Retry to load
          </Button>
        </CardBase>
      )}
      {loadingIDO &&
        [1, 2].map((key) => (
          <CardBase key={key} title="Loading...">
            <Skeleton count={3} height={90} className="mt-2" />
          </CardBase>
        ))}
    </main>
  )
}

const Page: React.FC = () => {
  const { doForceRefresh } = useRefresh()
  const isStarted = IDO_STARTS.isBefore()

  return (
    <div className="min-h-screen flex flex-col bg-scaffold">
      <Header />
      <div className="w-full flex justify-center items-center overflow-hidden pt-4">
        <img
          className="hidden sm:block"
          width={'auto'}
          height={'10rem'}
          style={{ height: '20rem' }}
          src={'/images/GEN_FOR_DARK_BG_PNG.png'}
        />
        <img
          className="max-w-none block sm:hidden mt:5rem"
          width={375}
          height={415}
          src={'/images/GEN_FOR_DARK_BG_PNG.png'}
        />
      </div>
      <div>
        {!isStarted && (
          <BigCountdown date={IDO_STARTS} onComplete={doForceRefresh} />
        )}
        {isStarted && <Main />}
      </div>
      <Footer />
      <FAQs />
    </div>
  )
}

export default Page
