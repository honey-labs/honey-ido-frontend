# GenesysGo IDO - Frontend

A modification of the [Mango Token Sale](https://github.com/blockworks-foundation/mango-token-sale) and Aurory IDO.



# Security

Review that mainnet addresses in [constants.ts](./src/config/constants.ts) match the GenesysGo IDO mainnet addresses:
* programId: BRkhzczJALNLNbaYtLiuo4yQi6i33fQDt3z1wiujyKU4
* usdcMint: EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
* pools: 9KLppKiDcTiaonj55PmwiZCDU62R6JFz1uPEc26wXB5J

# Serving The UI

The IDO UI is hosted at https://ido.genesysgo.com, but if you'd like to server your own UI, a pre-compiled static HTML site is available in `out`. You can use any static web server to serve that content.

For example, to use python's http server:

```
(cd out && python3 -m http.server 8899)
```

Then open http://localhost:8899, you should see the IDO UI:

![](./images/ido-ggui.png)

# Development

To start the vue server:

```bash
yarn dev
```

To build for production:

```bash
yarn build
```

## Configuration

The configuration for the available RPCs and IDO pools are in [constants.ts](./src/config/constants.ts)

## Storybook

We use `storybook` to test the different states of the pool

```bash
yarn storybook:dev
```
