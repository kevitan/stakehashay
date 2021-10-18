'use strict';

// coingecko https://api.coingecko.com/api/v3/coins/binancecoin/history?date=29-07-2021

const got = require('got');
const nconf = require('nconf');

const init = () => {
    nconf.argv()
      .env()
      .file(`${__dirname}/config.json`);
}

const getBnbRewards = async (validator) => {
    const limit = nconf.get('bnb:limit') || 10;
    const offset = nconf.get('bnb:offset') || 0;
    const host = `https://api.binance.org/v1/staking/chains/bsc/delegators/`
               + `${validator}/rewards?limit=${limit}&offset=${offset}`;
    try {
        const response = await got(host);
        const rewards = JSON.parse(response.body).rewardDetails;
        return rewards;
    } catch (e) {
        console.log(`Error - ${e}`);
    }
};

const getCoinGeckoData = async () => {
  const getDate = (d) => `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`;
  const date = nconf.get('coinGecko:date') || getDate(new Date());
  const endpoint = `https://api.coingecko.com/api/v3/coins/binancecoin/history?date=${date}`
            try {
                const res = await got(endpoint);
                const priceData = JSON.parse(res.body);
                const priceUSD = priceData.market_data.current_price['usd'];
                return priceUSD;
            } catch (e) {
                console.log(`Error getting CoinGecko Data: ${e}`);
            }
}

const calculate = async () => {
  init();
  const walletAddress = nconf.get('bnb:wallet');
  const priceDataPromise = getBnbRewards(walletAddress);
  const priceUSDPromise = getCoinGeckoData();

  try {
    const values = await Promise.all([priceDataPromise, priceUSDPromise]);
    const priceData =  values[0];
    const priceUSD  = values[1];

    const rewardData = priceData.map(d => ({
        rewardTime: d.rewardTime,
        reward: d.reward,
        priceUSD,
        rewardUSD: priceUSD * d.reward
    }));
    console.log(rewardData.sort((a, b) => a.rewardTime < b.rewardTime));
  } catch (e) {
    console.log(`Error calculating: ${e}`);
  }
}

calculate();
