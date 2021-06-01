const closeOrder = async (
  exchangeObject,
  exchangeName,
  webHook,
  instrument
) => {
  try {
    let executions;
    switch (exchangeName == "bybit") {
      case instrument.charAt(instrument.length - 1) === "D":
        executions = await exchangeObject.v2PrivateGetPositionList({
          symbol: instrument.replace("/", ""),
        });
        break;
      case instrument.charAt(instrument.length - 1) === "T":
        executions = await exchangeObject.privateLinearGetPositionList({
          symbol: instrument.replace("/", ""),
        });
        break;
    }

    console.log("***EXECUTIONS***", executions.result);

    const ticker = await exchangeObject.fetchTicker(instrument);
    const price = ticker.ask;
    const side = webHook.side.toLowerCase();
    const limitPrice = webHook.limitPrice;
    const type = webHook.orderType;

    let amount;
    if (
      webHook.amount.includes("%") &&
      instrument.charAt(instrument.length - 1) === "D"
    ) {
      amount =
        (executions.result.size *
          Number(webHook.amount.substring(0, webHook.amount.length - 1))) /
        100;
    } else if (
      webHook.amount.includes("%") &&
      instrument.charAt(instrument.length - 1) === "T"
    ) {
      if (webHook.side.toLowerCase() == "buy") {
        console.log(
          "***EXECUTION AMOUNT - BUY SIDE***",
          executions.result[1].size
        );
        amount = executions.result[1].size;
      } else if (webHook.side.toLowerCase() == "sell") {
        console.log(
          "***EXECUTION AMOUNT - SELL SIDE***",
          executions.result[0].size
        );
        amount = executions.result[0].size;
      }
    } else {
      amount = Number(webHook.amount);
    }

    console.log("***AMOUNT***", amount);

    switch (webHook.orderType) {
      case "limit":
        await exchangeObject.createOrder(
          instrument,
          type,
          side,
          amount,
          limitPrice
        );
        break;
      case "market":
        console.log("***MARKET***");
        params = {
          reduce_only: true,
        };
        if (side == "sell") {
          await exchangeObject.createMarketSellOrder(
            instrument,
            amount,
            params
          );
        } else if (side == "buy") {
          await exchangeObject.createMarketBuyOrder(instrument, amount, params);
        }
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
