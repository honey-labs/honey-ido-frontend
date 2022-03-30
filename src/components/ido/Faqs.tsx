import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { Box, Stack, Text, vars } from 'degen'

const faqs = [
  {
    question: 'When does the IDO start / finish?',
    answer: 'The IDO begins on March 30th, 2022 5:00pm UTC and ends exactly 24 hours later on March 31st',
  },
  {
    question: 'Will I need SOL in my wallet?',
    answer:
      'Yes, you will need SOL in your wallet to pay for transaction fees. If you have a 0 SOL balance but have USDC, your transactions will fail.',
  },
  {
    question: 'Will I need USDC?',
    answer: 'Yes, you will need to deposit your investment in USDC.',
  },
  {
    question: 'Where will the token be listed post-IDO?',
    answer:
      'We will be using our partners Atrix Finance ',
  },
  {
    question: 'How does the IDO work?',
    answer: (
      <>
        <Text>
          Step #1 - Connect your wallet (we recommend using Phantom). You will
          need to have USDC in your wallet in order to participate in the IDO.
          You do not need to own a Honey Genesis Bee NFT in order to
          participate in the IDO.
        </Text>
        <br />
        <Text>
          Step #2 - Enter the amount of USDC you wish to contribute to the IDO
          pool and click deposit.
        </Text>
        <br />
        <Text>
          Step #3 - Confirm the amount of USDC you wish to contribute to the IDO
          pool. This finalizes your deposit.
        </Text>
        <br />
        <Text>
          Step #4 - Wait until the deposit phase of the IDO expires. The deposit
          phase opens on Jan 3rd at 2pm UTC and will last for 24 hours in order
          to ensure people from all time zones are able to participate.
        </Text>
        <br />
        <Text>
          Step #5 - After the deposit phase has expired, you can return to the
          IDO page and collect your $HONEY token! The redemption phase will last
          for as long as there are outstanding $HONEY tokens needing to be
          redeemed.
        </Text>
        <br />
        <Text>
          Step #6 - Congratulations! Your $HONEY tokens are now in your wallet!
        </Text>
        <br />
        <Text>
          Credit to GenesysGo and Mango Markets for setting up this style of IDO.
        </Text>
        <br />
      </>
    ),
  },
  {
    question: `I bought USDC on a Centralised Exchange (Coinbase, Binance, etc.) where do I send my USDC?`,
    answer: `You can send USDC to your Phantom wallet. Download phantom, send USDC (and at least 0.05 SOL for GAS) then connect with your phantom wallet.`,
  },
  {
    question: `Can I participate in the IDO even if I don't have a Honey Genesis Bee NFT?`,
    answer:
      'Yes ! The IDO is not tied to owning a Honey Genesis Bee NFT.',
  },
  {
    question: `My transaction timed out while trying to deposit.`,
    answer: (
      <>
        <Text>
          This can be caused by numerous different factors. The following steps
          are a good starting point to resolve the issue:
        </Text>
        <br />
        <Text>
          Check that you have SOL in the wallet you&apos;re using. If you do
          not, try sending around 0.1 SOL to your wallet.
        </Text>
        <br />
        <Text>
          Check that you&apos;re using the latest version of
          Chrome/Brave/Firefox.
        </Text>
        <br />
        <Text>
          Try a different network (VPN, connect to a mobile hotspot, etc)
        </Text>
        <br />
        <Text>
          Try a different web browser. Example: if using Chrome, try Firefox.
        </Text>
        <br />
        <Text>Try small test transactions to see if that goes through.</Text>
        <Text>
          Shift your balance to a different wallet and try from that different
          wallet.
        </Text>
        <br />
      </>
    ),
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function FAQs() {
  return (
    <Box>
      <div className="max-w-7xl mx-auto pt-6 pb-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
          <Text as="h2" align="center" size="headingTwo" weight={'bold'}>
            Frequently asked questions
          </Text>
          <Box marginTop="6">
            <Stack space="6">
              {faqs.map((faq) => (
                <Box borderTopWidth="0.5" key={faq.question}>
                  <Disclosure as="div" className="pt-6">
                    {({ open }) => (
                      <>
                        <dt className="text-md">
                          <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                            <Text>{faq.question}</Text>
                            <span className="ml-6 h-7 flex items-center">
                              <ChevronDownIcon
                                color={vars.colors.textSecondary}
                                className={classNames(
                                  open ? '-rotate-180' : 'rotate-0',
                                  'h-6 w-6 transform'
                                )}
                                aria-hidden="true"
                              />
                            </span>
                          </Disclosure.Button>
                        </dt>
                        <Disclosure.Panel as="dd" className="mt-2 pr-12">
                          <Text>{faq.answer}</Text>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </Box>
              ))}
            </Stack>
          </Box>
        </div>
      </div>
    </Box>
  )
}
