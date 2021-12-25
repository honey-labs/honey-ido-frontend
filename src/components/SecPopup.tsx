import React, { useState } from 'react'

const SecPopup = ({ popupCallback }) => {
  const [showLegalNotice, setLN] = useState(false)
  if (!showLegalNotice)
    return (
      <div className="h-screen ml-auto mr-auto max-w-4xl pb-8 pl-4 pr-4 flex flex-col w-full h-full justify-center items-center">
        <h1 className="text-center text-lg font-extrabold">Terms of Use</h1>
        <p className="text-center mt-8">
          By using this website and investing in the <b>SHDW</b> token, you will
          be deemed to have: <br /> <br />
          (I) read the{' '}
          <a
            className="text-inputSecondary cursor-pointer"
            onClick={() => setLN(true)}
          >
            Legal notice
          </a>
          ,{' '}
          <a
            className="text-inputSecondary"
            rel="noreferrer"
            href="https://genesysgo.net"
            target="_blank"
          >
            Shadow litepaper
          </a>{' '}
          and other informational materials about the{' '}
          <a
            className="text-inputSecondary"
            rel="noreferrer"
            href="https://genesysgo.net"
            target="_blank"
          >
            operation of this IDO
          </a>
          . <br />
          (II) confirmed that you are not based in a jurisdiction where buying,
          trading and/or owning the SHDW token would be prohibited or restricted
          in any manner. <br />
          (III) understood that, despite our best efforts, there can still be
          exploit risks that exist within the app. (Please do not invest more
          than you can afford to lose)
          <br /> <br />
          Manipulation can also happen within the actual sale period with{' '}
          <b>
            large investors artificially increasing the token&lsquo;s price and
            withdrawing their funds in the last moments
          </b>{' '}
          so bid accordingly. We hope that the sale will meet your expectations
          and hope you will have a pleasant experience.
        </p>
        <button
          className="align-center mt-8 w-56 h-auto p-4 bg-magenta rounded-lg"
          onClick={popupCallback}
        >
          Accept
        </button>
      </div>
    )
  return (
    <div className="h-screen ml-auto mr-auto max-w-4xl pb-8 pl-4 pr-4 flex flex-col w-full h-full justify-center items-center">
      <h1 className="text-center text-lg font-extrabold">Legal notice</h1>
      <p className="text-justify mt-8">
        Investment in a token sale entails risks of a partial or complete loss
        of the investment. No guarantee is given regarding the liquidity of the
        tokens acquired in the offering, the existence of a secondary market for
        said tokens, the value of the tokens acquired in the offering and the
        exchange value of said tokens in legal currency. Tokens do not
        constitute financial instruments or securities tokens and confer no
        other right than those described in the litepaper. In addition, the
        regulatory framework applicable to the offering and to the tokens as
        well as the tax regime applicable to the holding of tokens are not
        defined to date in certain jurisdictions. Please consult your local tax
        and legal advisor before considering purchasing tokens or interacting
        with the protocol.
      </p>
      <a
        className="text-inputSecondary cursor-pointer mt-2"
        onClick={() => setLN(false)}
      >
        Go back
      </a>
    </div>
  )
}

export default SecPopup
