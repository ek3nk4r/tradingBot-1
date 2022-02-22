const express = require("express");
const router = express.Router();
const axios = require("axios");
const ccxt = require("ccxt");
const User = require("../models/User");
const ExchangeAccount = require("../models/ExchangeAccount");
const { decrypt } = require("../crypto/crypto");
const { order } = require("../tradeExecution/order");
const { closeOrder } = require("../tradeExecution/closeOrder");

router.post("/tradingRoutes", (req, res) => {
  console.log("WEBHOOK RECEIVED:", req.body.text);

  const exchangeName = req.body.text.exchange;
  const userId = req.body.text.userId;
  const webHook = req.body.text;
  const net = webHook.net;
  // const coin = instrument.slice(0, instrument.indexOf("/"));
  res.json(webHook);
  res.status(200).end();

  User.findById(userId)
    .populate("exchangeAccount")
    .then((userInfo) => {
      const [exhangeAccountIdToPopulate] = userInfo.exchangeAccount.filter(
        (el) => {
          if (
            el.exchangeName.toLowerCase() == exchangeName &&
            el.net.toLowerCase() == net
          ) {
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

          if (net == "api") {
            exchangeObject.urls["api"] = exchangeObject.urls["api"];
          } else if (net == "test") {
            exchangeObject.urls["api"] = exchangeObject.urls["test"];
          }

          if (webHook.alert_message === "open") {
            (async function () {
              order(exchangeObject, webHook);
            })();
          } else if (webHook.alert_message === "close") {
            (async function () {
              closeOrder(exchangeObject, webHook);
            })();
          }
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

module.exports = router;
