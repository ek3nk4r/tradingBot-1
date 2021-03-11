const express = require("express");

const buy = async (exchangeObject, exchangeName, webHook, instrument, coin) => {
  try {
    let balance;
    if (exchangeName == "phemex") {
      balance = await exchangeObject.fetchBalance(
        (params = { type: "swap", code: coin })
      );
    } else {
      balance = await exchangeObject.fetchBalance();
    }
    const ticker = await exchangeObject.fetchTicker(instrument);
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
  }
};

module.exports = { buy };
