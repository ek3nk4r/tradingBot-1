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

router.post("/tradingRoutes", (req, res) => {
  console.log("WEBHOOK RECEIVED:", req.body.text);

  const exchangeName = req.body.text.exchange;

  const exchangeFilter = exchanges.filter((exchange) => {
    if (exchange.constructor.name == exchangeName) {
      exchangeObject = exchange;
    }
  });

  const webHook = req.body.text;
  res.json(webHook);
  res.status(200).end();
  const coin = webHook.instrument.slice(0, webHook.instrument.indexOf("/"));

  const buy = async () => {
    let count = 0;
    try {
      let balance;
      if (exchangeName == "phemex") {
        balance = await exchangeObject.fetchBalance(
          (params = { type: "swap", code: coin })
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
          ((balance.free[coin] *
            Number(webHook.amount.substring(0, webHook.amount.length - 1))) /
            100) *
          price;
      } else {
        amount = Number(webHook.amount);
      }
      // *****PLACE A MARKET BUY ORDER*****
      // const order = await exchangeObject.createMarketBuyOrder(
      //   instrument,
      //   amount
      // );
      // *****PLACE A LIMIT BUY ORDER*****
      const order = await exchangeObject.createLimitBuyOrder(
        instrument,
        amount,
        price
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
      // *****PLACE A MARKET SELL ORDER*****
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

  if (webHook.alert_message === "buy") {
    (async function () {
      buy();
    })();
  } else if (webHook.alert_message === "sell") {
    (async function () {
      sell();
    })();
  } else if (webHook.alert_message === "close buy") {
    (async function () {
      closeBuy();
    })();
  } else if (webHook.alert_message === "close sell") {
    (async function () {
      closeSell();
    })();
  }
});

module.exports = router;
