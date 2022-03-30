import { Text } from 'degen'
import React from 'react'

const swaps = [
  {
    name: 'Aldrin',
    link: 'https://dex.aldrin.com/swap',
  },
  {
    name: 'Raydium',
    link: 'https://raydium.io/swap/?from=11111111111111111111111111111111&to=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  },
  {
    name: 'Atrix',
    link: 'https://app.atrix.finance/#/swap?to=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&from=Ejmc1UB4EsES5oAaRN63SpoxMJidt3ZGBrqrZk49vjTZ',
  },
]

export const Footer: React.FC = () => {
  return (
    <footer className="px-2 sm:px-6 text-center mb-2 sm:mb-4 mt-4">
      <Text>
        Swap SOL to USDC on{' '}
        {swaps.map((swap) => (
          <span key={`span-${swap.name}`}>
            <a
              key={`swap-${swap.name}`}
              className="text-inputSecondary"
              href={swap.link}
              target="_blank"
              rel="noreferrer"
            >
              <Text as="span" color="accent">
                {swap.name},
              </Text>
            </a>{' '}
          </span>
        ))}
        or transfer USDC from a CEX (FTX, Binance, Coinbase etc) on the Solana
        network.
        <br />
      </Text>
      {/* <div className="mt-2"><a className="underline text-inputSecondary" href="https://b5248a16.sibforms.com/serve/MUIEAHTnEW8RVVNoC8ehxvP_9x2kwbOfTGwt5cfMQ0g7rx7t7GAGl5RTZx3j2lF3uIBBNVeLDkswDoQbROaBl7soNYCxUNZiTJ3YkrWJGonnLZx6cTymSDioMEZe290x6Sw13yIxSjiyby7WBRqmrA4hdKnI0uL0L48Uhn2695dm8VK7XPqJpWWEDpzHkZrInkPg3faTyIGQJqIG" target="_blank" rel="noreferrer">Get notified of our future sales</a></div> */}
    </footer>
  )
}
