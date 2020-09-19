// const express = require("express");
// const router = express.Router();
// const axios = require("axios");
// const ccxt = require("ccxt");

// let kraken = new ccxt.kraken({
// apiKey: process.env.KRAKEN_TESTNET_API_KEY,
// secret: process.env.KRAKEN_TESTNET_API_SECRET,
// apiKey: process.env.KRAKEN_API_KEY,
// secret: process.env.KRAKEN_API_SECRET,
// });

// kraken.urls["api"] = kraken.urls["test"];

// console.log(new ccxt.kraken());

// router.get("/ticker", (req, res) => {
//   (async function () {
//     const exchangeData = await kraken.has;
// const markets = await kraken.load_markets();
// const ticker = await kraken.fetchTicker("BTC/USD");
// const balance = await kraken.fetchBalance();
// const orderBook = await kraken.fetchOrderBook("BTC/USD");
// const krakenData = [markets, ticker, balance, orderBook];
// res.json(krakenData);
// console.log("node async Kraken:", exchangeData);
//   })();
// });

// module.exports = router;
