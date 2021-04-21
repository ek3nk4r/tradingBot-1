const closeOrder = async (
  exchangeObject,
  exchangeName,
  webHook,
  instrument
) => {
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
      amount = webHook.amount;
    }

    const side = webHook.side;
    const price = webHook.limitPrice;
    const type = webHook.orderType;

    switch (webHook.orderType) {
      case "limit":
        await exchangeObject.createOrder(instrument, type, side, amount, price);
        break;
      case "market":
        await exchangeObject.createOrder(instrument, type, side, amount);
        break;
    }

    console.log(
      `${exchangeName}`,
      `${instrument} BUY ORDERS CLOSED SUCCESSFULLY`
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = { closeOrder };
