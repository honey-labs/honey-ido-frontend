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
    rpcURL: process.env.NEXT_PUBLIC_RPC_URL,
    rpcName: 'devnet',
    commitment: 'processed' as web3.Commitment,
  },
  // {
  //   id: 'devnet',
  //   network: 'devnet' as web3.Cluster,
  //   rpcURL: 'https://psytrbhymqlkfrhudd.dev.genesysgo.net:8899/',
  //   rpcName: 'Devnet',
  //   commitment: 'processed' as web3.Commitment,
  // },
]

export const IDO_RESULTS = {
  caC9KkfCJtEvAQxmNZuHSGqBFFztuMcFRMLDXTo9kte: {},
}

export const IDO_ENDPOINTS = [
  {
    network: 'devnet',
    programId: 'FLEhhyUCQynj8bWww89wreiDLALrcGrc4ddTRKsSYNx5',
    usdcMint: 'EvKdW6Jg7pc94Yp9FQzkqdehPLPrjq1itHuiXZgoVYeU',
    pools: ['5ntMvuHxteYtv2Q3CHDRzZzC4jrNhhbR6Sup96u49rbg'],
  },

  // {
  //   network: 'devnet',
  //   programId: '9NN9Wux6ZRg9mhrh9wRFfuDRCsN77C2dp3KrkFDcip8B',
  //   usdcMint: '32BQCx7UNNYY7QEExZxDSDt3Y5SZGp8xZR95bYpNjHDm',
  //   pools: ['FtsHJmMVyyFMEXmuT5M7C7xAZnudmUtQ8F8groUXVyqJ'],
  // },
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
