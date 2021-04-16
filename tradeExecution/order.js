const order = async (
  exchangeObject,
  exchangeName,
  webHook,
  instrument,
  coin
) => {
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

    let params;
    if (webHook.stopOrder === true && webHook.takeProfit === false) {
      params = {
        stop_loss: webHook.stopPrice,
      };
    } else if (webHook.takeProfit === true && webHook.stopOrder === false) {
      params = {
        take_profit: webHook.profitPrice,
      };
    } else if (webHook.stopOrder === true && webHook.takeProfit === true) {
      params = {
        stop_loss: webHook.stopPrice,
        take_profit: webHook.profitPrice,
      };
    } else {
      params = {};
    }

    const side = webHook.side;
    const limitPrice = webHook.limitPrice;
    const type = webHook.orderType;

    switch (webHook.orderType) {
      case "limit":
        await exchangeObject.createOrder(
          instrument,
          type,
          side,
          amount,
          limitPrice,
          params
        );
        break;
      case "market":
        await exchangeObject.createOrder(
          instrument,
          type,
          side,
          amount,
          limitPrice,
          params
        );
        break;
    }

    console.log(
      `${exchangeName}`,
      `SUCCESSFUL ${instrument} LONG OPENED`,
      amount
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = { order };
