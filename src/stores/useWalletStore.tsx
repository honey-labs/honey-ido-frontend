import { WalletAdapter, WalletEndpoint } from '@parrotfi/wallets'
import { BN, Idl, Program, Provider, web3 } from '@project-serum/anchor'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import produce from 'immer'
import uniqBy from 'lodash/uniqBy'
import create, { SetState, State } from 'zustand'

import { IDO_ENDPOINTS } from '../config/constants'
import { findLargestBalanceAccountForMint } from '../hooks/useLargestAccounts'
import poolIdl from '../idls/ido_pool.json'
import { createAssociatedTokenAccount } from '../utils/associated'
import { calculateNativeAmountUnsafe } from '../utils/balance'
import { sendTransaction } from '../utils/send'
import {
  getMint,
  getOwnedTokenAccounts,
  MintAccount,
  parseTokenAccount,
  ProgramAccount,
  TokenAccount,
} from '../utils/tokens'

export interface PoolAccount {
  publicKey: web3.PublicKey
  distributionAuthority: web3.PublicKey
  startIdoTs: BN
  endIdoTs: BN
  withdrawHoneyTs: BN
  nonce: number
  numIdoTokens: BN
  poolUsdc: web3.PublicKey
  poolHoney: web3.PublicKey
  honeyMint: web3.PublicKey
  redeemableMint: web3.PublicKey
}

interface WalletStore extends State {
  connected: boolean
  programId: web3.PublicKey
  usdcMint: web3.PublicKey
  poolsPks: web3.PublicKey[]
  wallet: WalletAdapter | undefined
  connection: web3.Connection
  provider: Provider | undefined
  program: Program | undefined
  pools: PoolAccount[]
  tokenAccounts: ProgramAccount<TokenAccount>[]
  mints: { [pubkey: string]: MintAccount }
  set: SetState<WalletStore>
  actions: WalletStoreActions
}

interface WalletStoreActions {
  connectRpc: (endpoint: WalletEndpoint) => void
  fetchPools: () => Promise<void>
  fetchWalletTokenAccounts: () => Promise<void>
  fetchMints: () => Promise<void>
  fetchVaults: (
    pool: PoolAccount
  ) => Promise<{ usdc: TokenAccount; honey: TokenAccount }>
  fetchRedeemableMint: (pool: PoolAccount) => Promise<void>
  submitDepositContribution: (
    pool: PoolAccount,
    amount: number
  ) => Promise<void>
  submitWithdrawContribution: (
    pool: PoolAccount,
    amount: number
  ) => Promise<void>
  submitRedeem: (pool: PoolAccount) => Promise<void>
}

const useWalletStore = create<WalletStore>((set, get) => ({
  connected: false,
  programId: null,
  usdcMint: null,
  poolsPks: [],
  wallet: null,
  connection: null,
  provider: undefined,
  program: undefined,
  pools: [],
  tokenAccounts: [],
  mints: {},
  actions: {
    connectRpc(endpoint: WalletEndpoint) {
      const idoConfig = IDO_ENDPOINTS[0]
      // console.log(idoConfig)
      set((state) => {
        state.programId = new web3.PublicKey(idoConfig.programId)
        state.usdcMint = new web3.PublicKey(idoConfig.usdcMint)
        state.poolsPks = idoConfig.pools.map((i) => new web3.PublicKey(i))
        state.connection = new web3.Connection(
          process.env.NEXT_PUBLIC_RPC_URL,
          {
            commitment: endpoint.commitment,
          }
        )
      })
    },
    async fetchPools() {
      const { wallet, connection, programId, poolsPks, set } = get()

      const provider = new Provider(
        connection,
        wallet,
        Provider.defaultOptions()
      )
      const program = new Program(poolIdl as Idl, programId, provider)

      const pools: PoolAccount[] = []
      for await (const poolPk of poolsPks) {
        const pool = (await program.account.poolAccount.fetch(
          poolPk
        )) as PoolAccount
        pool.publicKey = poolPk
        pools.push(pool)
      }

      set((state) => {
        state.provider = provider
        state.program = program
        state.pools = pools
      })
    },
    async fetchMints() {
      const { connection, usdcMint, pools, set } = get()
      const mintKeys = [
        usdcMint,
        ...pools.map((i) => i.honeyMint),
        ...pools.map((i) => i.redeemableMint),
      ]
      const mints = await Promise.all(
        uniqBy(mintKeys, (i) => i.toBase58()).map((pk) =>
          getMint(connection, pk)
        )
      )
      set((state) => {
        for (const mint of mints) {
          state.mints[mint.publicKey.toBase58()] = mint.account
        }
      })
    },
    async fetchWalletTokenAccounts() {
      const { connection, connected, wallet, set } = get()
      const walletOwner = wallet?.publicKey

      if (connected && walletOwner) {
        const ownedTokenAccounts = await getOwnedTokenAccounts(
          connection,
          walletOwner
        )
        set((state) => {
          state.tokenAccounts = ownedTokenAccounts
        })
      } else {
        set((state) => {
          state.tokenAccounts = []
        })
      }
    },
    async fetchVaults(pool: PoolAccount) {
      const { connection } = get()
      const [accountUsdc, accountHoney] =
        await connection.getMultipleAccountsInfo([
          pool.poolUsdc,
          pool.poolHoney,
        ])
      const usdc = parseTokenAccount(pool.poolUsdc, accountUsdc)
      const honey = parseTokenAccount(pool.poolHoney, accountHoney)
      return { usdc: usdc.account, honey: honey.account }
    },
    async fetchRedeemableMint(pool: PoolAccount) {
      const { connection, set } = get()
      const mintKeys = [pool.redeemableMint]
      const mints = await Promise.all(
        mintKeys.map((pk) => getMint(connection, pk))
      )
      set((state) => {
        for (const mint of mints) {
          state.mints[mint.publicKey.toBase58()] = mint.account
        }
      })
    },
    async submitDepositContribution(pool: PoolAccount, amount: number) {
      const {
        actions,
        usdcMint,
        program,
        provider,
        tokenAccounts,
        mints,
        wallet,
        connection,
      } = get()

      await actions.fetchWalletTokenAccounts()
      const usdc = findLargestBalanceAccountForMint(
        mints,
        tokenAccounts,
        usdcMint
      )

      const [poolSigner] = await web3.PublicKey.findProgramAddress(
        [pool.honeyMint.toBuffer()],
        program.programId
      )

      const depositAmount = calculateNativeAmountUnsafe(mints, usdcMint, amount)
      // console.log(
      //   'submitDepositContribution',
      //   amount,
      //   depositAmount.toString(),
      //   'exchangeUsdcForRedeemable'
      // )

      const redeemableAcc = findLargestBalanceAccountForMint(
        mints,
        tokenAccounts,
        pool.redeemableMint
      )
      let redeemableAccPk = redeemableAcc?.account?.publicKey
      const transaction = new web3.Transaction()
      if (!redeemableAccPk) {
        const [ins, pk] = await createAssociatedTokenAccount(
          wallet.publicKey,
          wallet.publicKey,
          pool.redeemableMint
        )
        transaction.add(ins)
        redeemableAccPk = pk
      }
      transaction.add(
        program.instruction.exchangeUsdcForRedeemable(depositAmount, {
          accounts: {
            poolAccount: pool.publicKey,
            poolSigner: poolSigner,
            redeemableMint: pool.redeemableMint,
            poolUsdc: pool.poolUsdc,
            userAuthority: provider.wallet.publicKey,
            userUsdc: usdc.account.publicKey,
            userRedeemable: redeemableAccPk,
            tokenProgram: TOKEN_PROGRAM_ID,
            clock: web3.SYSVAR_CLOCK_PUBKEY,
          },
        })
      )
      await sendTransaction({ transaction, wallet, connection })
      await actions.fetchWalletTokenAccounts()
    },
    async submitWithdrawContribution(pool: PoolAccount, amount: number) {
      const {
        actions,
        program,
        provider,
        tokenAccounts,
        mints,
        wallet,
        usdcMint,
        connection,
      } = get()

      await actions.fetchWalletTokenAccounts()
      const redeemable = findLargestBalanceAccountForMint(
        mints,
        tokenAccounts,
        pool.redeemableMint
      )
      const usdc = findLargestBalanceAccountForMint(
        mints,
        tokenAccounts,
        usdcMint
      )

      const [poolSigner] = await web3.PublicKey.findProgramAddress(
        [pool.honeyMint.toBuffer()],
        program.programId
      )

      const withdrawAmount = calculateNativeAmountUnsafe(
        mints,
        usdcMint,
        amount
      )
      // console.log(
      //   'submitDepositContribution',
      //   amount,
      //   withdrawAmount.toString(),
      //   'exchangeRedeemableForUsdc'
      // )
      const transaction = new web3.Transaction()
      transaction.add(
        program.instruction.exchangeRedeemableForUsdc(withdrawAmount, {
          accounts: {
            poolAccount: pool.publicKey,
            poolSigner: poolSigner,
            redeemableMint: pool.redeemableMint,
            poolUsdc: pool.poolUsdc,
            userAuthority: provider.wallet.publicKey,
            userUsdc: usdc.account.publicKey,
            userRedeemable: redeemable.account.publicKey,
            tokenProgram: TOKEN_PROGRAM_ID,
            clock: web3.SYSVAR_CLOCK_PUBKEY,
          },
        })
      )

      await sendTransaction({ transaction, wallet, connection })
      await actions.fetchWalletTokenAccounts()
    },
    async submitRedeem(pool: PoolAccount) {
      const { actions, program, tokenAccounts, mints, wallet, connection } =
        get()

      await actions.fetchWalletTokenAccounts()
      const redeemable = findLargestBalanceAccountForMint(
        mints,
        tokenAccounts,
        pool.redeemableMint
      )
      const honey = findLargestBalanceAccountForMint(
        mints,
        tokenAccounts,
        pool.honeyMint
      )

      // console.log('exchangeRedeemableForMango', redeemable, honey)

      const [poolSigner] = await web3.PublicKey.findProgramAddress(
        [pool.honeyMint.toBuffer()],
        program.programId
      )

      const transaction = new web3.Transaction()

      let honeyAccount = honey?.account?.publicKey
      if (!honeyAccount) {
        const [ins, pk] = await createAssociatedTokenAccount(
          wallet.publicKey,
          wallet.publicKey,
          pool.honeyMint
        )
        transaction.add(ins)
        honeyAccount = pk
      }

      transaction.add(
        program.instruction.exchangeRedeemableForHoney(
          redeemable.account.account.amount,
          {
            accounts: {
              poolAccount: pool.publicKey,
              poolSigner,
              redeemableMint: pool.redeemableMint,
              poolHoney: pool.poolHoney,
              userAuthority: wallet.publicKey,
              userHoney: honeyAccount,
              userRedeemable: redeemable.account.publicKey,
              tokenProgram: TOKEN_PROGRAM_ID,
              clock: web3.SYSVAR_CLOCK_PUBKEY,
            },
          }
        )
      )

      await sendTransaction({
        transaction,
        wallet,
        connection,
        sendingMessage: 'Sending redeem transaction...',
        successMessage: 'SHDW redeemed successfully!',
      })
      await actions.fetchWalletTokenAccounts()
    },
  },
  set: (fn: (s: WalletStore) => WalletStore) => set(produce(fn)),
}))

export default useWalletStore
