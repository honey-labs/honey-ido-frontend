import { WalletEndpoint } from '@parrotfi/wallets'
import { web3 } from '@project-serum/anchor'
import BigNumber from 'bignumber.js'
import moment from 'moment'

export const NETWORK = process.env.NEXT_PUBLIC_NETWORK
export const VERSION = process.env.NEXT_PUBLIC_VERSION

/**
 * Used for lending page countdown
 */
export const IDO_STARTS = moment(process.env.NEXT_PUBLIC_IDO_START)

export const RPC_ENDPOINTS: WalletEndpoint[] = [
  {
    id: 'devnet',
    network: 'devnet' as web3.Cluster,
    rpcURL: 'https://psytrbhymqlkfrhudd.dev.genesysgo.net:8899/',
    rpcName: 'Devnet',
    commitment: 'processed' as web3.Commitment,
  },
]

export const IDO_RESULTS = {
  '14RYJ2zfiwPzNfsRKRvniwSfo1tXGZCt3fTvjN6dLc9s': {},
}

export const IDO_ENDPOINTS = [
  // {
  //   network: 'mainnet-beta' as web3.Cluster,
  //   programId: 'BA1EoUw16zzKEq4HiGzthphLMNnKEnL17QYabAmTXocX',
  //   usdcMint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  //   pools: [
  //     '9MVRpLe86ssuqjfv1KakKz6mt4ndZsnv5g7og2PSq6zh'
  //   ],
  // }
  {
    network: 'devnet',
    programId: '31QBCYu5f7LrNdEca2tanQB7hS5orXky6Q9BZmHkszw6',
    usdcMint: '6Xg9kxbm12y9yVkQmXWD2gHdq7NPjxwTXLYdjxAERySV',
    pools: ['14RYJ2zfiwPzNfsRKRvniwSfo1tXGZCt3fTvjN6dLc9s'],
  },
  // {
  //   network: 'devnet' as web3.Cluster,
  //   programId: '7EYV5r3K4efZXrPynWzidc5KTFTKjCtaQcpLV998zniF',
  //   usdcMint: '7GMQXhBQFmsbZs5P6g8SBdpfLJggwgLtydXtRWLtH2vU',
  //   pools: [
  //     'J1nASk9aWGe9cnUCm3MS5hFmsZC8tuSn7DjZAHPRSQBb'
  //   ],
  // },
]

const defaultNode = undefined

export const DEFAULT_RPC = RPC_ENDPOINTS.find((i) => {
  const r = i.id === `devnet`
  return r
})

export const RANDOM_DEFAULT_RPC_INDEXES = [0, 1]
