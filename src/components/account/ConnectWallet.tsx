import { useWallet, WalletModal } from '@parrotfi/wallets'
import classNames from 'classnames'
import { Button } from 'degen'
import React, { useCallback } from 'react'

import useModal from '../../hooks/useModal'

interface ConnectWalletProps {
  className?: string
  onShowWallets?: () => void
}

export const ConnectWallet: React.FC<ConnectWalletProps> = ({
  className,
  onShowWallets,
}) => {
  const { wallet, connected, deactivate } = useWallet()

  const [onPresentConnectWallet] = useModal(<WalletModal />)

  const handleConnect = useCallback(() => {
    if (connected && wallet) {
      deactivate()
    } else {
      if (onShowWallets) {
        onShowWallets()
      }
      onPresentConnectWallet()
    }
  }, [wallet, connected])

  return (
    <Button width="40" size="small" onClick={handleConnect}>
      {connected == true ? 'Disconnect' : 'Connect Wallet'}
    </Button>
  )
}

export default ConnectWallet
