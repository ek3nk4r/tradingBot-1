const express = require("express");

const closeBuy = async (exchangeObject, exchangeName, instrument) => {
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
    // *****PLACE A MARKET SELL ORDER*****
    const order = await exchangeObject.createMarketSellOrder(
      instrument,
      amount
    );

    console.log(
      `${exchangeName}`,
      `${instrument} BUY ORDERS CLOSED SUCCESSFULLY`
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = { closeBuy };
