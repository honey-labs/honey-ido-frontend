import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'

const faqs = [
  {
    question: 'When is the IDO taking place?',
    answer: 'The IDO begins on January 3rd, 2022 @ 2:00pm UTC',
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
          We are using a modified version of the Mango/Parrot/Aurory IDO Auction
          Smart Contract. I say modified because, while we borrowed the
          framework we have modified it slightly to better fit our needs and the
          needs of our project.
        </p>
        <br />
        <p>
          The IDO Pool will be 30m $SHDW tokens (15% of total supply) which will
          be listed at a minimum price of $.50 per token and $SHDW tokens will
          continue to be sold at $.50 per token until the bidding window closes.
          In the event that there is more interest than there are tokens, the
          Smart Contract will automatically adjust the token price to account
          for the increased demand. Free market mechanics of supply and demand
          decide the price of the token.
        </p>
      </>
    ),
  },
  {
    question: `So wait... the price can go higher if there is a lot of demand but it can't go lower than $.50?`,
    answer: (
      <>
        <p>
          &quot;Auction&quot; Style IDOs only work when the project selling the
          IDO also has a portion of their tokens allocated to a treasury (or
          other such allocations). If you look at our tokenomics (please see the
          Medium article below), you will find that our tokenomics do not
          include a treasury. If you look at our tokenomics in general, I think
          you will find that they are markedly different than any other project
          out there. The $SHDW token is designed to be a token powered by its
          utility and the way we are conducting our IDO reflects that.
        </p>
        <br />
        <p>
          The team does not stand to make continued money off of an incredibly
          successful IDO. That is to say, we&apos;re not double dipping. A
          successful IDO doesn&apos;t also leave our project with millions and
          millions of tokens to continually dump and sell on the open markets.{' '}
        </p>
        <br />
        <p>
          If the price of the IDO were to finish at $2 per token and then rise
          to $10 in the subsequent years, GenesysGo does not directly benefit
          from that. The increase in capital raised from the IDO allows us to
          accelerate the work we&apos;ve begun on our decentralized RPC network
          and decentralized storage solutions, sure. However, we have no other
          tokens that we are hanging on to so we can dump them down the road.
          The only way we benefit off of that increase in the token price is to
          have the token&apos;s utility be successfully adopted by the Solana
          ecosystem. This is because a % of the fees paid by users of our
          decentralized storage solution (The Shadow Drive) goes to the team.
        </p>
        <br />
        <p>
          Ultimately, our long term financial incentives are directly tied to
          the adoption rate of the $SHDW token in the utility use case it was
          designed for.
        </p>
      </>
    ),
  },
  {
    question: `After the bidding phase ends, what happens?`,
    answer: (
      <>
        <p>
          After the bidding phase ends, you will be able to claim your tokens
          immediately. We have elected to remove the option of a
          &quot;withdrawal&quot; phase from the IDO structure. After speaking
          with previous projects who have used this contract and speaking with
          our community members, we want to protect against intentional market
          manipulation. Aurory&apos;s own mint site required the user click
          &quot;Accept&quot; on a warning box acknowledging that the
          token&apos;s price could be manipulated by large investors and that
          this is a risk that participants in the IDO would have to take in
          order to participate.
        </p>
        <br />
        <p>
          We are not interested in an IDO where participants can play games with
          the token price. We are interested in an IDO where participants are
          bidding on $SHDW because they truly believe in the utility that $SHDW
          tokens provide.
        </p>
      </>
    ),
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
