const express = require("express");
const router = express.Router();
const axios = require("axios");
const exchange = require("../exchangeObjects/exchangeObjects");
const { buy } = require("../tradeExecution/buy");
const { closeBuy } = require("../tradeExecution/closeBuy");
const { sell } = require("../tradeExecution/sell");
const { closeSell } = require("../tradeExecution/closeSell");

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
  const instrument = webHook.instrument;
  const coin = instrument.slice(0, instrument.indexOf("/"));
  res.json(webHook);
  res.status(200).end();

  if (webHook.alert_message === "buy") {
    (async function () {
      buy(exchangeObject, exchangeName, webHook, instrument, coin);
    })();
  } else if (webHook.alert_message === "sell") {
    (async function () {
      sell(exchangeObject, exchangeName, webHook, instrument, coin);
    })();
  } else if (webHook.alert_message === "close buy") {
    (async function () {
      closeBuy(exchangeObject, exchangeName, instrument);
    })();
  } else if (webHook.alert_message === "close sell") {
    (async function () {
      closeSell(exchangeObject, exchangeName, instrument);
    })();
  }
});

module.exports = router;
