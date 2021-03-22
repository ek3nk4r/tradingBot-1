const express = require("express");
const router = express.Router();
const axios = require("axios");
const ccxt = require("ccxt");
const User = require("../models/User");
const ExchangeAccount = require("../models/ExchangeAccount");
const { decrypt } = require("../crypto/crypto");
const { buy } = require("../tradeExecution/buy");
const { closeBuy } = require("../tradeExecution/closeBuy");
const { sell } = require("../tradeExecution/sell");
const { closeSell } = require("../tradeExecution/closeSell");

router.post("/tradingRoutes", (req, res) => {
  console.log("WEBHOOK RECEIVED:", req.body.text);

  const exchangeName = req.body.text.exchange;
  const userId = req.body.text.userId;
  const webHook = req.body.text;
  const instrument = webHook.instrument;
  const coin = instrument.slice(0, instrument.indexOf("/"));
  res.json(webHook);
  res.status(200).end();

  User.findById(userId)
    .populate("exchangeAccount")
    .then((userInfo) => {
      const [exhangeAccountIdToPopulate] = userInfo.exchangeAccount.filter(
        (el) => {
          if (el.exchangeName.toLowerCase() == exchangeName) {
            return el._id;
          }
        }
      );
      ExchangeAccount.findById(exhangeAccountIdToPopulate)
        .populate("secret")
        .then((secretInfo) => {
          let key = secretInfo.key;
          let hash = secretInfo.secret[0];
          exchangeObject = new ccxt[exchangeName]({
            apiKey: key,
            secret: decrypt(hash),
            timeout: 5000,
            enableRateLimit: true,
          });

          // exchangeObject.urls["api"] = exchangeObject.urls["test"];
          exchangeObject.urls["api"] = exchangeObject.urls["api"];

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
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

module.exports = router;
