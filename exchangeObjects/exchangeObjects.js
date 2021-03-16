const express = require("express");
const ccxt = require("ccxt");
const { decrypt } = require("../crypto/crypto");
const User = require("../models/User");
const ExchangeAccount = require("../models/ExchangeAccount");

//RETRIEVE API KEYS
const userKeys = (exchangeName, userId) => {
  User.findById(userId)
    .populate("exchangeAccount")
    // .populate("secret")
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
          let hash = secretInfo.secret[0];
          console.log("***DECRYPT***", decrypt(hash));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

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

module.exports = { bybit, bitmex, phemex, userKeys };
