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

console.log(bybit.has);

bybit.urls["api"] = bybit.urls["test"];

router.get("/tickers", (req, res) => {
  (async function () {
    const exchangeData = await bybit.has;
    const markets = await bybit.load_markets();
    const tickers = await bybit.fetchTickers();
    const balance = await bybit.fetchBalance();
    const since = undefined;
    const limit = 150;
    const btcusdOrders = await bybit.fetchOrders("BTC/USD", since, limit);
    const ethOrders = await bybit.fetchOrders("ETH/USD", since, limit);
    const eosOrders = await bybit.fetchOrders("EOS/USD", since, limit);
    const xrpOrders = await bybit.fetchOrders("XRP/USD", since, limit);
    const btcusdtOrders = await bybit.fetchOrders("BTC/USDT", since, limit);
    const bybitExchangeData = [
      exchangeData,
      markets,
      tickers,
      balance,
      btcusdOrders,
      ethOrders,
      eosOrders,
      xrpOrders,
      btcusdtOrders,
    ];
    res.json(bybitExchangeData);
    console.log("Bybit Exchange Data:", bybitExchangeData);
  })();
});

// router.post("/ticker", (req, res) => {
//   console.log(req);
//   // const tickerSymbol = JSON.parse(JSON.stringify(req.body));
//   const tickerSymbol = req.body.text;
//   // console.log("FronendTickerSymbolReceived:", Object.values(tickerSymbol));
//   // res.json(tickerSymbol);

//   (async function () {
//     // const ticker = await bybit.fetchTicker("BTC/USD");
//     const symbol = tickerSymbol;
//     const since = undefined;
//     const limit = 150;
//     const trades = await bybit.fetchMyTrades(symbol, since, limit);
//     const orders = await bybit.fetchClosedOrders(symbol, since, limit);
//     const positions = await bybit.privateGetPositionList({
//       symbol: tickerSymbol,
//     });
//     const bybitData = [positions.result, trades, orders];
//     res.json(bybitData);
//     console.log("node async bybit:", ticker);
//   })();
// });

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
