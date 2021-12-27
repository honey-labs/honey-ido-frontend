import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'

const faqs = [
  {
    question: 'When is the IDO taking place?',
    answer: 'The IDO begins on January 3rd, 2022 @ 2:00pm UTC',
  },
  {
    question: 'Will I need USDC?',
    answer: 'Yes, the IDO bids will be placed in USDC',
  },
  {
    question: 'Where will the token be listed post-IDO?',
    answer:
      'Thus far we have gotten firm confirmation of listings on Orca, Raydium, and Aldrin DEX (with more to come)!',
  },
  {
    question: 'How does the IDO work?',
    answer: (
      <>
        <p>
          Step #1 - Connect your wallet (we recommend using Phantom). You will
          need to have USDC in your wallet in order to participate in the IDO.
          You do not need to own a Shadowy Super Coder NFT in order to
          participate in the IDO.
        </p>
        <br />
        <p>
          Step #2 - Enter the amount of USDC you wish to contribute to the IDO
          pool and click deposit.
        </p>
        <br />
        <p>
          Step #3 - Confirm the amount of USDC you wish to contribute to the IDO
          pool. This finalizes your deposit.
        </p>
        <br />
        <p>
          Step #4 - Wait until the bidding phase of the IDO expires. The bidding
          phase opens on Jan 3rd at 2pm UTC and will last for 24 hours in order
          to ensure people from all time zones are able to participate.
        </p>
        <br />
        <p>
          Step #5 - After the bidding phase has expired, you can return to the
          IDO page and collect your $SHDW token! The redemption phase will last
          for as long as there are outstanding $SHDW tokens needing to be
          redeemed.
        </p>
        <br />
        <p>
          Step #6 - Congratulations! Your $SHDW tokens are now in your wallet!
        </p>
        <br />
      </>
    ),
  },
  {
    question: `Where do I need to start accruing my USDC?`,
    answer: `Your Phantom wallet! Phantom's code is battle tested and we love the focus they have on protecting their uses. So, you'll just be connecting your Phantom wallet to the IDO site. Ez pz!`,
  },
  {
    question: `Can I participate in the IDO even if I don't have a SSC NFT?`,
    answer:
      'Of course! The IDO is not tied to owning a Shadowy Super Coder NFT.',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function FAQs() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto pt-6 pb-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
          <h2 className="text-center text-2xl font-extrabold text-gray-900">
            Frequently asked questions
          </h2>
          <dl className="mt-6 space-y-6 divide-y divide-gray-200">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt className="text-md">
                      <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                        <span className="font-bold text-gray-900">
                          {faq.question}
                        </span>
                        <span className="ml-6 h-7 flex items-center">
                          <ChevronDownIcon
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
                      <p className="text-base text-gray-500 leading-snug">
                        {faq.answer}
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
