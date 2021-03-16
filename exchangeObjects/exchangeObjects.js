const express = require("express");
const ccxt = require("ccxt");
// const { decrypt } = require("./crypto");

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

module.exports = { bybit, bitmex, phemex };
