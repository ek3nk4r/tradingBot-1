const closeSell = async (exchangeObject, exchangeName, webHook, instrument) => {
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
    if (exchangeName == "bybit" && webHook.amount.includes("%")) {
      amount =
        (executions.result.size *
          Number(webHook.amount.substring(0, webHook.amount.length - 1))) /
        100;
    } else if (exchangeName == "bitmex" && webHook.amount.includes("%")) {
      amount =
        (executions[0].currentQty *
          Number(webHook.amount.substring(0, webHook.amount.length - 1))) /
        100;
    } else if (exchangeName == "phemex" && webHook.amount.includes("%")) {
      amount =
        (executions.data.positions[0].size *
          Number(webHook.amount.substring(0, webHook.amount.length - 1))) /
        100;
    } else {
      amount = webhook.amount;
    }

    if (webHook.orderType === "limit") {
      const order = await exchangeObject.createLimitBuyOrder(
        instrument,
        amount,
        webHook.limitPrice
      );
    } else if (webHook.orderType === "market") {
      const order = await exchangeObject.createMarketBuyOrder(
        instrument,
        amount
      );
    }

    console.log(
      `${exchangeName}`,
      `${instrument} SELL ORDERS CLOSED SUCCESSFULLY`
    );
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
