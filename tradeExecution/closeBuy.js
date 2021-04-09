const closeBuy = async (exchangeObject, exchangeName, webHook, instrument) => {
  console.log("***INSTRUMENT***", instrument);
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

    console.log(
      `${exchangeName}`,
      `${instrument} BUY ORDERS CLOSED SUCCESSFULLY`
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = { closeBuy };
