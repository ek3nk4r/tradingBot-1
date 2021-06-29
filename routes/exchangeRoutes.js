const express = require("express");
const router = express.Router();
const axios = require("axios");
const ccxt = require("ccxt");
const User = require("../models/User");
const ExchangeAccount = require("../models/ExchangeAccount");
const { decrypt } = require("../crypto/crypto");

// const one = new ccxt.bybit();
// console.log(one);

let exchangeObject;

router.get("/tickers/:exchangeName/:userId", (req, res) => {
  const exchangeName = req.params.exchangeName;
  const userId = req.params.userId;
  console.log("***EXCHANGE NAME***", exchangeName, userId);

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

          
          const net = exhangeAccountIdToPopulate.net
          if (net == "api") {
            exchangeObject.urls["api"] = exchangeObject.urls["api"];
          } else if (net == "test") {
            exchangeObject.urls["api"] = exchangeObject.urls["test"];
          }
        

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
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.post("/coinData", (req, res) => {
  const tickerSymbol = req.body.name;

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
