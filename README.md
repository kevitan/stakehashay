# Stake Hashay
A simple node application to calculate gains from crypto staking rewards (delegated validation) based on a given delagator wallet address.

This program leverages the [CoinGecko API](https://www.coingecko.com/en) as well as the [Binance API](https://docs.binance.org/api-reference/dex-api/staking.html)
to cross-reference staking rewards and historical price data to calculate gains in fiat currency amounts.

This is useful for jurisdictions where staking rewards cost basis needs to be tracked for tax reporting purposes.

## Currently Supported Crypto:
- [BNB](https://www.binance.org/en/staking)

## Currently Supported Physical Currencies:
- USD

## Limitations
 - Binance Staking API can only return a maximum of 100 records at a time

### Other Resources
 - [Staking BNB with Trust Wallet](https://community.trustwallet.com/t/bnb-staking-with-trust-wallet/113243)

## Installation
```
npm install
```
A plain installation of npm modules should be enough to get started.

### Execution
To run the app, simply `npm start`.

### Configuration
Custom parameters can be added. This project uses [nconf](https://www.npmjs.com/package/nconf) to manage its environment,
and is initialised as follows:
```
nconf.argv().env().file(`${__dirname}/config.json`)
```
Configurable options include:
| Variable Name |  Description   | default value |
|-------------|-------|------|
| `bnb:wallet` | wallet address of the BNB staker | none, required|
| `bnb:limit`| limit of rows to return for the BNB call. Limit 100| 10, required|
| `bnb:offset`| offset from the first returned row to count from| 0 |
| `coinGecko:date` | day for historical crypto coin data calculation, in `DD-MM-YYYY` format | current date, required|

## ToDo
- add unit tests
- add integration tests
- support other Crypto (BTC)
