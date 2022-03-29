import { Box, Heading, Stack } from 'degen'
import React from 'react'

import ConnectWallet from '../account/ConnectWallet'
import { Logo } from '../logo'
import { RpcSwitcher } from './RpcSwitcher'

export const Header: React.FC = () => {
  return (
    <Heading>
      <Box paddingX="4" width="full" zIndex="10" height="auto" marginTop="8">
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Logo />
          </Box>
          <Stack space="3.5" direction="horizontal">
            {/* <RpcSwitcher /> */}
            <ConnectWallet />
          </Stack>
        </Box>
      </Box>
    </Heading>
  )
}
