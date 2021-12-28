import { WalletProvider } from '@parrotfi/wallets'
import React, { useState } from 'react'

import Notifications from '../components/Notifications'
import SecPopup from '../components/SecPopup'
import { RANDOM_DEFAULT_RPC_INDEXES, RPC_ENDPOINTS } from '../config/constants'
import { IDOProvider } from '../contexts/IDOContext'
import { ModalProvider } from '../contexts/ModalContext'
import { RefreshProvider } from '../contexts/RefreshContext'
import { notify } from '../stores/useNotificationStore'

let choosenRPC = null
function Ido({ Component, pageProps }) {
  const [showPopup, setShowPopup] = useState(true)
  if (choosenRPC == null) {
    choosenRPC = RPC_ENDPOINTS[0]
  }
  const togglePopup = (_) => {
    setShowPopup(false)
  }
  if (showPopup) return <SecPopup popupCallback={togglePopup} />
  return (
    <WalletProvider
      endpoints={RPC_ENDPOINTS}
      defaultEndpoint={choosenRPC}
      onNotify={notify}
    >
      <ModalProvider>
        <IDOProvider>
          <RefreshProvider>
            <Component {...pageProps} />
          </RefreshProvider>
          <Notifications />
          <div id="tooltip-portal-root" />
        </IDOProvider>
      </ModalProvider>
    </WalletProvider>
  )
}

export default Ido
