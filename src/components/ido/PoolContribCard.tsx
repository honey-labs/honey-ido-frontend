import { Dialog, Transition } from '@headlessui/react'
import {
  ExclamationIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline'
import BigNumber from 'bignumber.js'
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

// import useIpAddress from '../../hooks/useIpAddress's
import useLargestAccounts from '../../hooks/useLargestAccounts'
import usePool from '../../hooks/usePool'
import useVaults from '../../hooks/useVaults'
import { notify } from '../../stores/useNotificationStore'
import useWalletStore, { PoolAccount } from '../../stores/useWalletStore'
import { Button } from '../button'
import { AmountInput } from '../input/AmountInput'
import { ButtonMenu, ButtonMenuItem } from '../menu'
import StatsCard from './StatsCard'

interface PoolContribCardProps {
  pool: PoolAccount
}
function ConfirmDepositModal({ open, setOpen, depositAmount, submitDeposit }) {
  const continueButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={continueButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-0"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-white opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationIcon
                    className="h-6 w-6 text-red-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Confirm IDO deposit
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Once you make your deposit of{' '}
                      <strong>
                        {Number(depositAmount).toLocaleString()} $USDC
                      </strong>{' '}
                      you will not be able to withdraw your funds.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm sm:ml-4"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-brandPrimary hover:bg-brandPrimaryHover text-base font-bold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={submitDeposit}
                  ref={continueButtonRef}
                >
                  Continue with deposit
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

const PoolContribCard: React.FC<PoolContribCardProps> = ({ pool }) => {
  const actions = useWalletStore((s) => s.actions)
  const connected = useWalletStore((s) => s.connected)
  const largestAccounts = useLargestAccounts(pool)
  const { startIdo, endIdo, endDeposits, poolStatus } = usePool(pool)
  const vaults = useVaults(pool)
  // const { ipAllowed } = useIpAddress()

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [isDeposit, setIsDeposit] = useState(true)
  const [inputAmount, setInputAmount] = useState('0')

  const usdcBalance = largestAccounts.usdc?.balance || 0
  const redeemableBalance = largestAccounts.redeemable?.balance || 0
  const totalBalance = isDeposit ? usdcBalance : redeemableBalance
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)

  useEffect(() => {
    setInputAmount('')
  }, [totalBalance])

  const handleSubmitContribution = useCallback(() => {
    setSubmitting(true)
    setConfirmModalOpen(false)
  }, [])

  const handleChangeMode = useCallback(
    (value: number) => {
      setIsDeposit(value === 0)
    },
    [setIsDeposit]
  )

  const handleChangeAmount = useCallback(
    (amount: string) => {
      setInputAmount(amount)
      if (isDeposit && endDeposits?.isBefore() && +amount > redeemableBalance) {
        notify({
          title: 'Deposits ended',
          message: 'Contribution cannot increase',
        })
      }
    },
    [isDeposit, endDeposits, redeemableBalance]
  )

  const handleRefresh = useCallback(async () => {
    // console.log('handleRefresh start')

    setRefreshing(true)
    try {
      await actions.fetchWalletTokenAccounts()
    } finally {
      setTimeout(() => setRefreshing(false), 1000)
    }
  }, [actions])

  const getInputError = useCallback(() => {
    const inputError = {
      hasError: false,
      message: '',
    }
    if (submitting) {
      return inputError
    }

    if (new BigNumber(inputAmount).gt(totalBalance)) {
      inputError.hasError = true
      inputError.message = `Insufficient USDC balance`
      return inputError
    }

    return inputError
  }, [submitting, isDeposit, inputAmount, totalBalance])

  useEffect(() => {
    if (!loading) {
      return
    }
    if (isDeposit && largestAccounts.usdc) {
      setLoading(false)
    }
    if (!isDeposit && largestAccounts.redeemable) {
      setLoading(false)
    }
    setTimeout(() => setLoading(false), 2000)
  }, [largestAccounts])

  const handleModalOpen = () => {
    if (+inputAmount <= 0) {
      notify({
        type: 'warn',
        title: isDeposit
          ? 'Requires a deposit amount'
          : 'Requires a withdraw amount',
        message: 'Please enter a valid amount',
      })
    } else {
      setConfirmModalOpen(true)
    }
  }

  useEffect(() => {
    if (submitting) {
      const handleSubmit = async () => {
        if (+inputAmount <= 0) {
          notify({
            type: 'warn',
            title: isDeposit
              ? 'Requires a deposit amount'
              : 'Requires a withdraw amount',
            message: 'Please enter a valid amount',
          })
          setSubmitting(false)
          return
        }
        try {
          if (isDeposit) {
            await actions.submitDepositContribution(pool, +inputAmount)
          } else {
            await actions.submitWithdrawContribution(pool, +inputAmount)
          }
          setSubmitting(false)
          vaults.fetchVaults()
        } catch (e) {
          notify({
            type: 'error',
            title: isDeposit ? 'Deposit error' : 'Withdraw error',
            message: e.message,
          })
          setSubmitting(false)
        }
      }
      handleSubmit()
    }
  }, [submitting, isDeposit])

  const canDeposit =
    startIdo.isBefore() && endIdo.isAfter() && endDeposits.isAfter()
  const canWithdraw = startIdo.isBefore() && endIdo.isAfter()

  useEffect(() => {
    if (!canDeposit && startIdo.isBefore()) {
      handleChangeMode(1)
    }
  }, [canDeposit, startIdo])

  const inputError = getInputError()

  const disableSubmit =
    !connected ||
    loading ||
    submitting ||
    inputError.hasError ||
    (isDeposit ? !canDeposit : !canWithdraw)

  return (
    <>
      <ConfirmDepositModal
        setOpen={setConfirmModalOpen}
        open={confirmModalOpen}
        submitDeposit={handleSubmitContribution}
        depositAmount={inputAmount}
      />
      {/* <ButtonMenu
        activeIndex={isDeposit ? 0 : 1}
        onItemClick={handleChangeMode}
      >
        <ButtonMenuItem disabled={!canDeposit}>Deposit</ButtonMenuItem>
      </ButtonMenu> */}
      <div className="mt-4" />
      <AmountInput
        title={isDeposit ? 'I want to deposit' : 'Withdraw collateral'}
        placeholder="0"
        maxValue={totalBalance.toString()}
        depositedBalance={redeemableBalance.toString()}
        maxIsLoading={connected && loading}
        maxIsRefreshing={refreshing}
        maxLabel={isDeposit ? `balance:` : `max withdraw:`}
        errorMessage={inputError.message}
        hasError={inputError.hasError}
        tokenSymbol="USDC"
        tokenIcon="usdc.svg"
        value={inputAmount}
        valueRound="ceil"
        decimals={9}
        onRefreshMax={handleRefresh}
        onChange={handleChangeAmount}
        disabled={!connected}
      />
      <Button
        onClick={isDeposit ? handleModalOpen : handleSubmitContribution}
        className="w-full my-4"
        disabled={disableSubmit}
        isLoading={submitting}
      >
        {submitting ? 'Waiting approval' : isDeposit ? `Deposit` : `Withdraw`}
      </Button>
      {/* <Button
        onClick={handleSubmitContribution}
        className="w-full my-4"
        disabled={disableSubmit}
        isLoading={submitting}
      >
        {submitting ? 'Waiting approval' : isDeposit ? `Deposit` : `Withdraw`}
      </Button> */}
      {/* Country Not Allowed 🇺🇸😭 */}
      {endDeposits?.isBefore() && endIdo?.isAfter() && (
        <div className="flex items-center space-x-2 mb-4">
          <InformationCircleIcon className="h-5 w-5 text-secondary" />
          <div className="text-xxs sm:text-xs">
            <p className="mb-1">
              You can only withdraw your contribution during the grace period.
            </p>
            <p>Any withdrawals cannot be reversed.</p>
          </div>
        </div>
      )}
      <StatsCard
        endDeposits={endDeposits}
        endIdo={endIdo}
        poolStatus={poolStatus}
        vaultPrtBalance={vaults.prtBalance}
        vaultUsdcBalance={vaults.usdcBalance}
        estimatedPrice={vaults.estimatedPrice}
      />
    </>
  )
}

export default PoolContribCard
