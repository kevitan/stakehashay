# barebnb
A simple node application to calculate gains from crypto staking rewards (delegated validation) based on a given delagator wallet address.

This program leverages the [CoinGecko API](https://www.coingecko.com/en) as well as the [Binance API](https://docs.binance.org/api-reference/dex-api/staking.html)
to cross-reference staking rewards and historical price data to calculate gains in fiat currency amounts.

This is useful for jurisdictions where staking rewards cost basis needs to be tracked for tax reporting purposes.

## Currently Supported Crypto:
- [BNB](https://www.binance.org/en/staking)

## Currently Supported Physical Currencies:
- USD

## Limitations
 - Binance API can only return a maximum of 100 records at a time

### Other Resources
 - [Staking BNB with Trust Wallet](https://community.trustwallet.com/t/bnb-staking-with-trust-wallet/113243)
