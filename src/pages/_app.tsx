import '../components/toast/toast.scss'
import '../components/tooltip/tooltip.scss'
import '../styles/global.scss'

import BigNumber from 'bignumber.js'
import * as Fathom from 'fathom-client'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ThemeProvider } from 'next-themes'
import React, { useEffect } from 'react'

import Ido from './ido'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

function MyApp({ Component, pageProps }) {
  const title = 'Genesys Go IDO'
  const description =
    'This is the IDO (initial DEX offering) page for Genesys Go.'
  const keywords = 'Genesys Go, Shadowy Super Coder Dao, SSC DAO, SSC, Solana'
  const baseUrl = 'https://ido.genesysgo.com'

  const router = useRouter()

  useEffect(() => {
    // Initialize Fathom when the app loads
    Fathom.load('OAIHVCMC', {
      includedDomains: ['ido.genesysgo.com'],
      url: 'https://principled-nutritious.genesysgo.com',
    })

    function onRouteChangeComplete() {
      Fathom.trackPageview()
    }
    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete)

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [])

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
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
        <meta name="twitter:site" content="@genesysgo" />
      </Head>
      <ThemeProvider defaultTheme="dark" attribute="class">
        <Ido Component={Component} pageProps={pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
