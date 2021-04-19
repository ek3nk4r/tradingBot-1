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
      let params;
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
    switch (exchangeObject) {
      case "bybit":
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
        break;
      // case "phemex":
      //   if (webHook.stopOrder === true && webHook.takeProfit === false) {
      //     params = {
      //       ordType: "Stop",
      //       // priceEp: exchange.to_ep(webHook.stopPrice, instrument),
      //       stopPx: webHook.stopPrice,
      //       // stopLossEp: exchange.to_ep(webHook.stopPrice, instrument),
      //       // triggerType: webHook.triggerType,
      //     };
      //   } else if (webHook.takeProfit === true && webHook.stopOrder === false) {
      //     params = {
      //       ordType: webHook.orderType,
      //       takeProfitEp: exchange.to_ep(webHook.profitPrice, instrument),
      //     };
      //   } else if (webHook.stopOrder === true && webHook.takeProfit === true) {
      //     params = {
      //       // stopPxEp: exchange.to_ep(webHook.triggerPrice, instrument),
      //       takeProfitEp: exchange.to_ep(webHook.profitPrice, instrument),
      //       stopLossEp: exchange.to_ep(webHook.stopPrice, instrument),
      //       // triggerType: webHook.triggerType,
      //     };
      //   } else {
      //     params = {};
      //   }
      //   break;
    }

    const side = webHook.side;
    const limitPrice = webHook.limitPrice;
    const type = webHook.orderType;
    const market = exchangeObject.market(instrument);

    if (exchangeName == "bybit") {
      const executions = await exchangeObject.v2PrivateGetTradeClosedPnlList({
        symbol: market["id"],
      });

      if (executions.result.data[0].leverage != webHook.leverage) {
        await exchangeObject.v2PrivatePostPositionLeverageSave({
          symbol: instrument.replace("/", ""),
          leverage: webHook.leverage,
        });
      }
    }

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
