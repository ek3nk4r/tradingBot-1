const express = require("express");

const closeSell = async (exchangeObject, exchangeName, instrument) => {
  let count = 0;
  try {
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
    // *****PLACE A MARKET BUY ORDER*****
    const order = await exchangeObject.createMarketBuyOrder(instrument, amount);

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

module.exports = { closeSell };
