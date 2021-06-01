const order = async (
  exchangeObject,
  exchangeName,
  webHook,
  instrument,
  coin
) => {
  try {
    const balance = await exchangeObject.fetchBalance();
    const ticker = await exchangeObject.fetchTicker(instrument);
    const price = ticker.ask;

    let amount;
    if (
      webHook.amount.includes("%") &&
      instrument.charAt(instrument.length - 1) === "D"
    ) {
      amount =
        balance.free[coin] *
        Number(webHook.amount.substring(0, webHook.amount.length - 1)) *
        price;
    } else if (
      webHook.amount.includes("%") &&
      instrument.charAt(instrument.length - 1) === "T"
    ) {
      amount =
        balance.free[instrument.slice(-4, instrument.length)] *
        (Number(webHook.amount.substring(0, webHook.amount.length - 1)) /
          price);
    } else {
      amount = Number(webHook.amount);
    }

    const market = exchangeObject.market(instrument);
    // *********************************************************************************
    // **********This is an attempt to set the leverage programmatically****************
    // *********************************************************************************
    // *********************************************************************************

    if (instrument.charAt(instrument.length - 1) === "T") {
      console.log("T");
      const executions =
        await exchangeObject.privateLinearGetTradeClosedPnlList({
          symbol: market["id"],
        });

      switch (webHook.leverage) {
        case executions.result.data.length === 0:
          console.log("*** LENGTH 0 ***", webHook.leverage);
          await exchangeObject.privateLinearPostPositionSetLeverage({
            symbol: instrument.replace("/", ""),
            buy_leverage: webHook.leverage,
            sell_leverage: webHook.leverage,
          });
          break;
        case executions.result.data[0].leverage != webHook.leverage &&
          executions.result.data[0].leverage == 100:
          console.log("*** LEVERAGE 100 ***");
          await exchangeObject.privateLinearPostPositionSwitchIsolated({
            symbol: instrument.replace("/", ""),
            is_isolated: true,
            buy_leverage: webHook.leverage,
            sell_leverage: webHook.leverage,
          });
          // await exchangeObject.privateLinearPostPositionSetLeverage({
          //   symbol: instrument.replace("/", ""),
          //   buy_leverage: webHook.leverage,
          //   sell_leverage: webHook.leverage,
          // });
          break;
        case executions.result.data[0].leverage != webHook.leverage &&
          webHook.leverage == 100:
          console.log("*** LEVERAGE 100 ***");
          await exchangeObject.privateLinearPostPositionSwitchIsolated({
            symbol: instrument.replace("/", ""),
            is_isolated: false,
            buy_leverage: webHook.leverage,
            sell_leverage: webHook.leverage,
          });
          break;
        case executions.result.data[0].leverage == webHook.leverage:
          console.log("*** LEVERAGE EQUAL ***");
          break;
        case executions.result.data[0].leverage != webHook.leverage &&
          executions.result.data[0].leverage != 100 &&
          webHook.leverage != 100:
          // **********************************************************************
          // This may need to be updated to privateLinearPostPositionLeverageSave()
          console.log("*** ISOLATED LEVERAGE ***");
          await exchangeObject.privateLinearPostPositionSetLeverage({
            symbol: instrument.replace("/", ""),
            buy_leverage: webHook.leverage,
            sell_leverage: webHook.leverage,
          });
          // **********************************************************************
          // **********************************************************************
          break;
      }
    } else if (instrument.charAt(instrument.length - 1) === "D") {
      console.log("D");
      const executions = await exchangeObject.v2PrivateGetTradeClosedPnlList({
        symbol: market["id"],
      });

      switch (webHook.leverage) {
        case executions.result.data.length === 0:
          await exchangeObject.v2PrivatePostPositionLeverageSave({
            symbol: instrument.replace("/", ""),
            leverage: webHook.leverage,
          });
          break;
        case executions.result.data[0].leverage == webHook.leverage:
          console.log("*** LEVERAGE EQUAL ***");
          break;
        case executions.result.data[0].leverage != webHook.leverage:
          console.log("*** LEVERAGE CHANGED ***");
          await exchangeObject.v2PrivatePostPositionLeverageSave({
            symbol: instrument.replace("/", ""),
            leverage: webHook.leverage,
          });
          break;
      }
    }

    // *********************************************************************************
    // *********************************************************************************
    // *********************************************************************************
    // *********************************************************************************

    const side = webHook.side.toLowerCase();
    const limitPrice = webHook.limitPrice;
    const type = webHook.orderType;

    switch (webHook.orderType) {
      case "limit":
        if (webHook.stopOrder == false) {
          await exchangeObject.createOrder(
            instrument,
            type,
            side,
            amount,
            limitPrice
          );
        } else if (
          instrument.charAt(instrument.length - 1) === "D" &&
          webHook.stopOrder == true
        ) {
          await exchangeObject.createOrder(
            instrument,
            type,
            side,
            amount,
            limitPrice
          );
          await exchangeObject.v2PrivatePostPositionTradingStop({
            symbol: market["id"],
            stop_loss: webHook.stopPrice,
          });
        } else if (
          instrument.charAt(instrument.length - 1) === "T" &&
          webHook.stopOrder == true
        ) {
          await exchangeObject.createOrder(
            instrument,
            type,
            side,
            amount,
            limitPrice
          );
          await exchangeObject.privateLinearPostPositionTradingStop({
            symbol: market["id"],
            side: webHook.side.toLowerCase(),
            stop_loss: webHook.stopPrice,
          });
        }
        break;
      case "market":
        if (webHook.stopOrder == false) {
          await exchangeObject.createOrder(instrument, type, side, amount);
        } else if (
          instrument.charAt(instrument.length - 1) === "T" &&
          webHook.stopOrder == true
        ) {
          await exchangeObject.createOrder(instrument, type, side, amount);
          await exchangeObject.privateLinearPostPositionTradingStop({
            symbol: market["id"],
            side: webHook.side.toLowerCase(),
            stop_loss: webHook.stopPrice,
          });
        } else if (
          instrument.charAt(instrument.length - 1) === "D" &&
          webHook.stopOrder == true
        ) {
          await exchangeObject.createOrder(instrument, type, side, amount);
          await exchangeObject.v2PrivatePostPositionTradingStop({
            symbol: market["id"],
            stop_loss: webHook.stopPrice,
          });
        }
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
