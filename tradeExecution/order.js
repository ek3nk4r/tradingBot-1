const Amount = require("./Order/Amount");
const PlaceOrder = require("./placeOrder");

const order = async (exchangeObject, webHook) => {
  try {
    const { instrument } = webHook;
    const coin = instrument.slice(0, instrument.indexOf("/"));
    const balance = await exchangeObject.fetchBalance();

    const ticker = await exchangeObject.fetchTicker(instrument);

    const price = ticker.ask;
    const amount = Amount.Amount(webHook, instrument, coin, balance, price);
    const market = exchangeObject.market(instrument);

    if (instrument.charAt(instrument.length - 1) === "T") {
      console.log("T");
      const executions = await exchangeObject
        .privateLinearGetTradeClosedPnlList({
          symbol: market["id"],
        })
        .catch((err) => console.log(err));

      console.log("***EXECUTIONS***", executions.result.data[0]);

      if (executions.result.data === null) {
        console.log("*** LENGTH 0 ***", webHook.leverage);
        await exchangeObject
          .privateLinearPostPositionSetLeverage({
            symbol: instrument.replace("/", ""),
            buy_leverage: webHook.leverage,
            sell_leverage: webHook.leverage,
          })
          .then((res) => {
            console.log("***RESPONSE***", res);
            PlaceOrder.placeOrder(
              webHook,
              exchangeObject,
              amount,
              market,
              price
            );
          })
          .catch((err) => console.log(err));
      } else if (
        executions.result.data[0].leverage != webHook.leverage &&
        executions.result.data[0].leverage == 100
      ) {
        console.log("*** LEVERAGE 100 ***", "is_isolated: true,");
        await exchangeObject
          .privateLinearPostPositionSwitchIsolated({
            symbol: instrument.replace("/", ""),
            is_isolated: true,
            buy_leverage: webHook.leverage,
            sell_leverage: webHook.leverage,
          })
          .then((res) => {
            console.log("***RESPONSE***", res);
            PlaceOrder.placeOrder(
              webHook,
              exchangeObject,
              amount,
              market,
              price
            );
          })
          .catch((err) => console.log(err));
      } else if (
        executions.result.data[0].leverage != webHook.leverage &&
        webHook.leverage == 100
      ) {
        console.log("*** LEVERAGE 100 ***", "is_isolated: false,");
        await exchangeObject
          .privateLinearPostPositionSwitchIsolated({
            symbol: instrument.replace("/", ""),
            is_isolated: false,
            buy_leverage: webHook.leverage,
            sell_leverage: webHook.leverage,
          })
          .then((res) => {
            console.log("***RESPONSE***", res);
            PlaceOrder.placeOrder(
              webHook,
              exchangeObject,
              amount,
              market,
              price
            );
          })
          .catch((err) => console.log(err));
      } else if (
        executions.result.data[0].leverage != webHook.leverage &&
        executions.result.data[0].leverage != 100 &&
        webHook.leverage != 100
      ) {
        console.log("*** ISOLATED LEVERAGE ***");
        await exchangeObject
          .privateLinearPostPositionSetLeverage({
            symbol: instrument.replace("/", ""),
            buy_leverage: webHook.leverage,
            sell_leverage: webHook.leverage,
          })
          .then((res) => {
            console.log("***RESPONSE***", res);
            PlaceOrder.placeOrder(
              webHook,
              exchangeObject,
              amount,
              market,
              price
            );
          })
          .catch((err) => console.log(err));
      } else if (executions.result.data[0].leverage == webHook.leverage) {
        console.log("*** LEVERAGE EQUAL ***");
        PlaceOrder.placeOrder(webHook, exchangeObject, amount, market, price);
      }
    } else if (instrument.charAt(instrument.length - 1) === "D") {
      console.log("D");
      const executions = await exchangeObject
        .v2PrivateGetTradeClosedPnlList({
          symbol: market["id"],
        })
        .catch((err) => console.log(err));

      if (executions.result.data === null) {
        await exchangeObject
          .v2PrivatePostPositionLeverageSave({
            symbol: instrument.replace("/", ""),
            leverage: webHook.leverage,
          })
          .then(() => {
            PlaceOrder.placeOrder(
              webHook,
              exchangeObject,
              amount,
              market,
              price
            );
          })
          .catch((err) => console.log(err));
      } else if (executions.result.data[0].leverage != webHook.leverage) {
        await exchangeObject
          .v2PrivatePostPositionLeverageSave({
            symbol: instrument.replace("/", ""),
            leverage: webHook.leverage,
          })
          .then(() => {
            PlaceOrder.placeOrder(
              webHook,
              exchangeObject,
              amount,
              market,
              price
            );
          })
          .catch((err) => console.log(err));
        console.log("*** LEVERAGE CHANGED ***");
      } else if (executions.result.data[0].leverage == webHook.leverage) {
        PlaceOrder.placeOrder(webHook, exchangeObject, amount, market, price);
      }
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { order };
