const express = require("express");
const router = express.Router();
const axios = require("axios");
const ccxt = require("ccxt");
// const exchanges = require("../exchangeObjects/exchangeObjects");

var bybit = new ccxt.bybit({
  apiKey: process.env.BYBIT_TESTNET_API_KEY,
  secret: process.env.BYBIT_TESTNET_API_SECRET,
  // apiKey: process.env.BYBIT_API_KEY,
  // secret: process.env.BYBIT_API_SECRET,
  timeout: 5000,
  enableRateLimit: true,
});

var bitmex = new ccxt.bitmex({
  apiKey: process.env.BITMEX_TESTNET_API_KEY,
  secret: process.env.BITMEX_TESTNET_API_SECRET,
  // apiKey: process.env.BYBIT_API_KEY,
  // secret: process.env.BYBIT_API_SECRET,
  timeout: 5000,
  enableRateLimit: true,
});

var phemex = new ccxt.phemex({
  apiKey: process.env.PHEMEX_TESTNET_API_KEY,
  secret: process.env.PHEMEX_TESTNET_API_SECRET,
  // apiKey: process.env.BYBIT_API_KEY,
  // secret: process.env.BYBIT_API_SECRET,
  timeout: 5000,
  enableRateLimit: true,
});

bybit.urls["api"] = bybit.urls["test"];
bitmex.urls["api"] = bitmex.urls["test"];
phemex.urls["api"] = phemex.urls["test"];

// console.log(phemex);

const exchanges = [bybit, bitmex, phemex];

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
  // console.log("WEBHOOK RECEIVED:", req.body.text);

  const exchangeName = req.body.text.exchange;

  const exchangeFilter = exchanges.filter((exchange) => {
    if (exchange.constructor.name == exchangeName) {
      exchangeObject = exchange;
    }
  });

  const webHook = req.body.text;
  res.json(webHook);
  res.status(200).end();

  const buy = async () => {
    let count = 0;
    try {
      let balance;
      if (exchangeName == "phemex") {
        balance = await exchangeObject.fetchBalance(
          (params = { type: "swap", code: "BTC" })
        );
      } else {
        balance = await exchangeObject.fetchBalance();
      }
      const ticker = await exchangeObject.fetchTicker(webHook.instrument);
      const instrument = webHook.instrument;
      const price = ticker.ask;

      let amount;
      if (webHook.amount.includes("%")) {
        amount =
          ((balance.free.BTC *
            Number(webHook.amount.substring(0, webHook.amount.length - 1))) /
            100) *
          price;
      } else {
        amount = Number(webHook.amount);
      }

      const order = await exchangeObject.createMarketBuyOrder(
        instrument,
        amount
      );

      console.log(`${exchangeName}`, "SUCCESSFUL LONG OPENED", amount);
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
    let count = 0;
    try {
      const instrument = webHook.instrument;

      let executions;
      if (exchangeName == "bybit") {
        executions = await exchangeObject.v2PrivateGetPositionList({
          symbol: instrument.replace("/", ""),
        });
      } else if (exchangeName == "bitmex") {
        executions = await exchangeObject.privateGetPosition({
          symbol: instrument.replace("/", ""),
        });
      } else if (exchangeName == "phemex") {
        executions = await exchangeObject.privateGetAccountsPositions({
          currency: instrument.split("/")[0],
        });
      }

      let amount;
      if (exchangeName == "bybit") {
        amount = executions.result.size;
      } else if (exchangeName == "bitmex") {
        amount = executions[0].currentQty;
      } else if (exchangeName == "phemex") {
        amount = executions.data.positions[0].size;
      }
      const order = await exchangeObject.createMarketSellOrder(
        instrument,
        amount
      );
      console.log(`${exchangeName}`, "BUY ORDERS CLOSED SUCCESSFULLY");
    } catch (err) {
      console.error(err);
      if (count <= 10) {
        count++;
        return await closeBuy();
      } else {
        console.log("Max Order Attempts - Try again on he next one!");
      }
    }
  };

  const sell = async () => {
    let count = 0;
    try {
      let balance;
      if (exchangeName == "phemex") {
        balance = await exchangeObject.fetchBalance(
          (params = { type: "swap", code: "BTC" })
        );
      } else {
        balance = await exchangeObject.fetchBalance();
      }
      const ticker = await exchangeObject.fetchTicker(webHook.instrument);
      const instrument = webHook.instrument;
      const price = ticker.ask;

      let amount;
      if (webHook.amount.includes("%")) {
        amount =
          ((balance.free.BTC *
            Number(webHook.amount.substring(0, webHook.amount.length - 1))) /
            100) *
          price;
      } else {
        amount = Number(webHook.amount);
      }

      const order = await exchangeObject.createMarketSellOrder(
        instrument,
        amount
      );

      console.log(`${exchangeName}`, "SUCCESSFUL SHORT OPENED");
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
    let count = 0;
    try {
      const instrument = webHook.instrument;

      let executions;
      if (exchangeName == "bybit") {
        executions = await exchangeObject.v2PrivateGetPositionList({
          symbol: webHook.instrument.replace("/", ""),
        });
      } else if (exchangeName == "bitmex") {
        executions = await exchangeObject.privateGetPosition({
          symbol: webHook.instrument.replace("/", ""),
        });
      } else if (exchangeName == "phemex") {
        executions = await exchangeObject.privateGetAccountsPositions({
          currency: instrument.split("/")[0],
        });
      }

      let amount;
      if (exchangeName == "bybit") {
        amount = executions.result.size;
      } else if (exchangeName == "bitmex") {
        amount = executions[0].currentQty;
      } else if (exchangeName == "phemex") {
        amount = executions.data.positions[0].size;
      }
      const order = await exchangeObject.createMarketBuyOrder(
        instrument,
        amount
      );
      console.log(`${exchangeName}`, "SELL ORDERS CLOSED SUCCESSFULLY");
    } catch (err) {
      console.error(err);
      if (count <= 10) {
        count++;
        return await closeBuy();
      } else {
        console.log("Max Order Attempts - Try again on he next one!");
      }
    }
  };

  if (webHook.signal === "buy") {
    (async function () {
      buy();
    })();
  } else if (webHook.signal === "sell") {
    (async function () {
      sell();
    })();
  } else if (webHook.signal === "close buy") {
    (async function () {
      closeBuy();
    })();
  } else if (webHook.signal === "close sell") {
    (async function () {
      closeSell();
    })();
  }
});

module.exports = router;
