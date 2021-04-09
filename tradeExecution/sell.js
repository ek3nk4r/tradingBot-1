const express = require("express");

const sell = async (
  exchangeObject,
  exchangeName,
  webHook,
  instrument,
  coin
) => {
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

    if (webHook.orderType === "limit") {
      const order = await exchangeObject.createLimitSellOrder(
        instrument,
        amount,
        webHook.limitPrice
      );
    } else if (webHook.orderType === "market") {
      const order = await exchangeObject.createMarketSellOrder(
        instrument,
        amount
      );
    }

    console.log(`${exchangeName}`, `SUCCESSFUL ${instrument} SHORT OPENED`);
  } catch (err) {
    console.error(err);
    if (count <= 10) {
      count++;
      return await sell();
    } else {
      console.log("Max Order Attempts - Try again on the next one!");
    }
  }
};

module.exports = { sell };
