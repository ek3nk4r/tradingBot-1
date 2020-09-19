const express = require("express");
const router = express.Router();
const axios = require("axios");
const ccxt = require("ccxt");

var bybit = new ccxt.bybit({
  apiKey: process.env.BYBIT_TESTNET_API_KEY,
  secret: process.env.BYBIT_TESTNET_API_SECRET,
  // apiKey: process.env.BYBIT_API_KEY,
  // secret: process.env.BYBIT_API_SECRET,
});

// console.log(bybit.has);

bybit.urls["api"] = bybit.urls["test"];

router.get("/ticker", (req, res) => {
  (async function () {
    const exchangeData = await bybit.has;
    const markets = await bybit.load_markets();
    const ticker = await bybit.fetchTicker("BTC/USD");
    const balance = await bybit.fetchBalance();
    const symbol = "BTC/USD";
    const since = undefined;
    const limit = 150;
    const trades = await bybit.fetchMyTrades(symbol, since, limit);
    const orders = await bybit.fetchClosedOrders(symbol, since, limit);
    const positions = await bybit.privateGetPositionList({
      symbol: "BTCUSD",
    });
    const bybitData = [ticker, balance, positions.result, trades, orders];
    res.json(bybitData);
    console.log("node async bybit:", balance);
  })();
});

router.post("/webHookBybit", (req, res) => {
  console.log("WEBHOOK RECEIVED:", req.body.text);
  const webHook = req.body.text;
  res.json(webHook);
  res.status(200).end();

  if (webHook === "buy") {
    (async function () {
      const balance = await bybit.fetchBalance();
      const ticker = await bybit.fetchTicker("BTC/USD");
      const instrument = "BTC/USD";
      const price = ticker.ask;
      const amount = balance.free.BTC * 0.01 * price;
      const order = await bybit.createMarketBuyOrder(instrument, amount);

      console.log("BYBIT:", "SUCCESSFUL LONG OPENED");
    })();
  } else if (webHook === "sell") {
    (async function () {
      const balance = await bybit.fetchBalance();
      const ticker = await bybit.fetchTicker("BTC/USD");
      const instrument = "BTC/USD";
      const price = ticker.ask;
      const amount = balance.free.BTC * 0.01 * price;
      const order = await bybit.createMarketSellOrder(instrument, amount);

      console.log("BYBIT:", "SUCCESSFUL SHORT OPENED");
    })();
  } else if (webHook === "close buy") {
    (async function () {
      const executions = await bybit.privateGetPositionList({
        symbol: "BTCUSD",
      });
      const instrument = "BTC/USD";
      const amount = executions.result.size;
      const order = await bybit.createMarketSellOrder(instrument, amount);
      console.log("BYBIT:", "BUY ORDERS CLOSED SUCCESSFULLY");
    })();
  } else if (webHook === "close sell") {
    (async function () {
      const positions = await bybit.privateGetPositionList({
        symbol: "BTCUSD",
      });
      const instrument = "BTC/USD";
      const amount = positions.result.size;
      const order = await bybit.createMarketBuyOrder(instrument, amount);
      console.log("BYBIT:", "SELL ORDERS CLOSED SUCCESSFULLY");
    })();
  }
});

module.exports = router;
