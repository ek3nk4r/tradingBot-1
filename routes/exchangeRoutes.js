const express = require("express");
const router = express.Router();
const axios = require("axios");
const exchange = require("../exchangeObjects/exchangeObjects");

const bybit = exchange.bybit;
const bitmex = exchange.bitmex;
const phemex = exchange.phemex;
const exchanges = [bybit, bitmex, phemex];

bybit.urls["api"] = bybit.urls["test"];
bitmex.urls["api"] = bitmex.urls["test"];
phemex.urls["api"] = phemex.urls["test"];

let exchangeObject;

router.get("/tickers/:exchangeName", (req, res) => {
  const exchangeName = req.params.exchangeName;
  console.log("***EXCHANGE NAME***", exchangeName);

  const exchangeFilter = exchanges.filter((exchange) => {
    if (exchange.constructor.name == exchangeName) {
      exchangeObject = exchange;
    }
  });

  (async function () {
    try {
      const exchangeInfo = await exchangeObject.has;
      const markets = await exchangeObject.load_markets();
      let tickers;
      console.log("***EXCHANGE NAME***", exchangeName);
      if (exchangeName == "phemex") {
        tickers = await exchangeObject.publicGetCfgV2Products();
      } else {
        tickers = await exchangeObject.fetchTickers();
      }
      const exchangeData = [exchangeInfo, markets, tickers];
      res.json(exchangeData);
    } catch (err) {
      console.error(err);
      return {};
    }
  })();
});

router.post("/coinData", (req, res) => {
  console.log(req.body.user_id);
  const tickerSymbol = req.body.name;
  const user_id = req.body.user_id;

  (async function () {
    const symbol = tickerSymbol;
    const since = undefined;
    const limit = 150;
    try {
      const orders = await exchangeObject.fetchClosedOrders(
        symbol,
        since,
        limit
      );
      const balance = await exchangeObject.fetchBalance();
      const coinData = [balance, orders, symbol];
      res.json(coinData);
    } catch (err) {
      console.error(err);
      return {};
    }
  })();
});

module.exports = router;
