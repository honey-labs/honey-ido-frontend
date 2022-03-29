import { Box, Button, Text } from 'degen'
import React, { useState } from 'react'

const SecPopup = ({ popupCallback }) => {
  const [showLegalNotice, setLN] = useState(false)
  if (!showLegalNotice)
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="viewWidth"
        minHeight="viewHeight"
        backgroundColor="backgroundSecondary"
        marginX="auto"
        paddingBottom="8"
        paddingX="10"
      >
        <Text align="center" size="extraLarge" weight="bold">
          Terms of Use
        </Text>
        <Box marginY="8">
          <Text lineHeight="1.625" align="center">
            By using this website and investing in the <b>SHDW</b> token, you
            will be deemed to have: <br /> <br />
            (I) read the{' '}
            <a
              className="text-inputSecondary cursor-pointer"
              onClick={() => setLN(true)}
            >
              <Text color="accent" as="span">
                Legal notice
              </Text>
            </a>
            ,{' '}
            {/* <a
            className="text-inputSecondary"
            rel="noreferrer"
            href="https://genesysgo.net"
            target="_blank"
          >
            Shadow litepaper
          </a>{' '} */}
            and other informational materials about the{' '}
            <a
              className="text-inputSecondary"
              rel="noreferrer"
              href="https://genesysgo.medium.com/the-comprehensive-guide-to-genesysgo-and-the-shdw-ido-278b90d3186c"
              target="_blank"
            >
              <Text color="accent" as="span">
                operation of this IDO
              </Text>
            </a>
            . <br />
            (II) confirmed that you are not based in a jurisdiction where
            buying, trading and/or owning the SHDW token would be prohibited or
            restricted in any manner. <br />
            (III) understood that, despite our best efforts, there can still be
            exploit risks that exist within the app. (Please do not invest more
            than you can afford to lose)
            <br />
          </Text>
        </Box>
        <Button width="76" onClick={popupCallback}>
          Accept
        </Button>
      </Box>
    )
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="viewWidth"
      minHeight="viewHeight"
      backgroundColor="backgroundSecondary"
      marginX="auto"
      paddingBottom="8"
      paddingX="20"
    >
      <Text align="center" size="extraLarge" weight="bold" as="h1">
        Legal notice
      </Text>
      <Box marginY="8">
        <Text lineHeight="1.625" align="center">
          Investment in a token sale entails risks of a partial or complete loss
          of the investment. No guarantee is given regarding the liquidity of
          the tokens acquired in the offering, the existence of a secondary
          market for said tokens, the value of the tokens acquired in the
          offering and the exchange value of said tokens in legal currency.
          Tokens do not constitute financial instruments or securities tokens
          and confer no other right than those described in the litepaper. In
          addition, the regulatory framework applicable to the offering and to
          the tokens as well as the tax regime applicable to the holding of
          tokens are not defined to date in certain jurisdictions. Please
          consult your local tax and legal advisor before considering purchasing
          tokens or interacting with the protocol.
        </Text>
      </Box>
      <a
        className="text-inputSecondary cursor-pointer mt-2"
        onClick={() => setLN(false)}
      >
        <Text color="accent">Go back</Text>
      </a>
    </Box>
  )
}

export default SecPopup
