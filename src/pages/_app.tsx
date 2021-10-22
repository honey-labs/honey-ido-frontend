import '../components/toast/toast.scss'
import '../components/tooltip/tooltip.scss'
import '../styles/global.scss'

import BigNumber from 'bignumber.js'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import React from 'react'

import ScriptAnalytics from '../components/ScriptAnalytics'
import Ido from './ido'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

function MyApp({ Component, pageProps }) {
  const title = 'Aurory IDO'
  const description =
    'This is the IDO (initial DEX offering) page for Aurory, a P2E game on Solana!'
  const keywords = 'Aurory, AURY, IDO, P2E, Solana, play2earn'
  const baseUrl = 'https://ido.aurory.io'

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${baseUrl}/images/logo.png`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@auroryproject" />
      </Head>
      <ThemeProvider defaultTheme="dark" attribute="class">
        <Ido Component={Component} pageProps={pageProps} />
        <ScriptAnalytics analyticsID="G-H88T6Y0N85" />
      </ThemeProvider>
    </>
  )
}

export default MyApp
