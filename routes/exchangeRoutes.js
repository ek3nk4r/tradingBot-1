const express = require("express");
const router = express.Router();
const axios = require("axios");
const ccxt = require("ccxt");

var bybit = new ccxt.bybit({
  apiKey: process.env.BYBIT_TESTNET_API_KEY,
  secret: process.env.BYBIT_TESTNET_API_SECRET,
  // apiKey: process.env.BYBIT_API_KEY,
  // secret: process.env.BYBIT_API_SECRET,
  enableRateLimit: true,
});

var bitmex = new ccxt.bitmex({
  apiKey: process.env.BITMEX_TESTNET_API_KEY,
  secret: process.env.BITMEX_TESTNET_API_SECRET,
  // apiKey: process.env.BYBIT_API_KEY,
  // secret: process.env.BYBIT_API_SECRET,
  enableRateLimit: true,
});

bybit.urls["api"] = bybit.urls["test"];
bitmex.urls["api"] = bitmex.urls["test"];

const exchanges = [bybit, bitmex];
let exchangeObject;

router.get("/tickers/:exchangeName", (req, res) => {
  const exchangeName = req.params.exchangeName;

  const exchangeFilter = exchanges.filter((exchange) => {
    if (exchange.constructor.name == exchangeName) {
      exchangeObject = exchange;
    }
  });
  (async function () {
    try {
      const exchangeInfo = await exchangeObject.has;
      const markets = await exchangeObject.load_markets();
      const tickers = await exchangeObject.fetchTickers();
      const exchangeData = [exchangeInfo, markets, tickers];
      res.json(exchangeData);
    } catch (err) {
      console.error(err);
      return {};
    }
  })();
});

router.post("/coinData", (req, res) => {
  const tickerSymbol = req.body.name;

  (async function () {
    const symbol = tickerSymbol;
    const since = undefined;
    const limit = 150;
    // let count = 0;
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

router.post("/webHookBybit", (req, res) => {
  console.log("WEBHOOK RECEIVED:", req.body.text);
  const webHook = req.body.text;
  res.json(webHook);
  res.status(200).end();

  const buy = async () => {
    let count = 0;
    try {
      const balance = await bybit.fetchBalance();
      const ticker = await bybit.fetchTicker("BTC/USD");
      const instrument = "BTC/USD";
      const price = ticker.ask;
      const amount = balance.free.BTC * 0.01 * price;
      const order = await bybit.createMarketBuyOrder(instrument, amount);

      console.log("BYBIT:", "SUCCESSFUL LONG OPENED");
    } catch (err) {
      console.error(err);
      if (count <= 10) {
        count++;
        return await buy();
      } else {
        console.log("Max Order Attempts - Try again on he next one!");
      }
    }
  };

  const closeBuy = async () => {
    try {
      const executions = await bybit.privateGetPositionList({
        symbol: "BTCUSD",
      });
      const instrument = "BTC/USD";
      const amount = executions.result.size;
      const order = await bybit.createMarketSellOrder(instrument, amount);
      console.log("BYBIT:", "BUY ORDERS CLOSED SUCCESSFULLY");
    } catch (err) {
      console.error(err);
      return await closeBuy();
    }
  };

  const sell = async () => {
    let count = 0;
    try {
      const balance = await bybit.fetchBalance();
      const ticker = await bybit.fetchTicker("BTC/USD");
      const instrument = "BTC/USD";
      const price = ticker.ask;
      const amount = balance.free.BTC * 0.01 * price;
      const order = await bybit.createMarketSellOrder(instrument, amount);

      console.log("BYBIT:", "SUCCESSFUL SHORT OPENED");
    } catch (err) {
      console.error(err);
      if (count <= 10) {
        count++;
        return await sell();
      } else {
        console.log("Max Order Attempts - Try again on he next one!");
      }
    }
  };

  const closeSell = async () => {
    try {
      const positions = await bybit.privateGetPositionList({
        symbol: "BTCUSD",
      });
      const instrument = "BTC/USD";
      const amount = positions.result.size;
      const order = await bybit.createMarketBuyOrder(instrument, amount);
      console.log("BYBIT:", "SELL ORDERS CLOSED SUCCESSFULLY");
    } catch (err) {
      console.error(err);
      return await closeSell();
    }
  };

  if (webHook === "buy") {
    (async function () {
      buy();
    })();
  } else if (webHook === "sell") {
    (async function () {
      sell();
    })();
  } else if (webHook === "close buy") {
    (async function () {
      closeBuy();
    })();
  } else if (webHook === "close sell") {
    (async function () {
      closeSell();
    })();
  }
});

module.exports = router;
