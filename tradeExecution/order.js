const Amount = require("./Order/Amount");
const Limit = require("./Order/Limit");
const Market = require("./Order/Market");

const order = async (exchangeObject, exchangeName, webHook) => {
  try {
    const { instrument } = webHook;
    const coin = instrument.slice(0, instrument.indexOf("/"));
    const balance = await exchangeObject.fetchBalance();
    const ticker = await exchangeObject.fetchTicker(instrument);
    const price = ticker.ask;
    const amount = Amount.Amount(webHook, instrument, coin, balance, price);

    console.log("***AMOUNT***", amount);

    const market = exchangeObject.market(instrument);

    // *********************************************************************************
    // **********This is an attempt to set the leverage programmatically****************
    // *********************************************************************************
    // *********************************************************************************

    // if (instrument.charAt(instrument.length - 1) === "T") {
    //   console.log("T");
    //   const executions =
    //     await exchangeObject.privateLinearGetTradeClosedPnlList({
    //       symbol: market["id"],
    //     });

    //   switch (webHook.leverage) {
    //     case executions.result.data.length === 0:
    //       console.log("*** LENGTH 0 ***", webHook.leverage);
    //       await exchangeObject.privateLinearPostPositionSetLeverage({
    //         symbol: instrument.replace("/", ""),
    //         buy_leverage: webHook.leverage,
    //         sell_leverage: webHook.leverage,
    //       });
    //       break;
    //     case executions.result.data[0].leverage != webHook.leverage &&
    //       executions.result.data[0].leverage == 100:
    //       console.log("*** LEVERAGE 100 ***");
    //       await exchangeObject.privateLinearPostPositionSwitchIsolated({
    //         symbol: instrument.replace("/", ""),
    //         is_isolated: true,
    //         buy_leverage: webHook.leverage,
    //         sell_leverage: webHook.leverage,
    //       });
    //       // await exchangeObject.privateLinearPostPositionSetLeverage({
    //       //   symbol: instrument.replace("/", ""),
    //       //   buy_leverage: webHook.leverage,
    //       //   sell_leverage: webHook.leverage,
    //       // });
    //       break;
    //     case executions.result.data[0].leverage != webHook.leverage &&
    //       webHook.leverage == 100:
    //       console.log("*** LEVERAGE 100 ***");
    //       await exchangeObject.privateLinearPostPositionSwitchIsolated({
    //         symbol: instrument.replace("/", ""),
    //         is_isolated: false,
    //         buy_leverage: webHook.leverage,
    //         sell_leverage: webHook.leverage,
    //       });
    //       break;
    //     case executions.result.data[0].leverage == webHook.leverage:
    //       console.log("*** LEVERAGE EQUAL ***");
    //       break;
    //     case executions.result.data[0].leverage != webHook.leverage &&
    //       executions.result.data[0].leverage != 100 &&
    //       webHook.leverage != 100:
    //       // **********************************************************************
    //       // This may need to be updated to privateLinearPostPositionLeverageSave()
    //       console.log("*** ISOLATED LEVERAGE ***");
    //       await exchangeObject.privateLinearPostPositionSetLeverage({
    //         symbol: instrument.replace("/", ""),
    //         buy_leverage: webHook.leverage,
    //         sell_leverage: webHook.leverage,
    //       });
    //       // **********************************************************************
    //       // **********************************************************************
    //       break;
    //   }
    // } else if (instrument.charAt(instrument.length - 1) === "D") {
    //   console.log("D");
    //   const executions = await exchangeObject.v2PrivateGetTradeClosedPnlList({
    //     symbol: market["id"],
    //   });

    //   switch (webHook.leverage) {
    //     case executions.result.data.length === 0:
    //       await exchangeObject.v2PrivatePostPositionLeverageSave({
    //         symbol: instrument.replace("/", ""),
    //         leverage: webHook.leverage,
    //       });
    //       break;
    //     case executions.result.data[0].leverage == webHook.leverage:
    //       console.log("*** LEVERAGE EQUAL ***");
    //       break;
    //     case executions.result.data[0].leverage != webHook.leverage:
    //       console.log("*** LEVERAGE CHANGED ***");
    //       await exchangeObject.v2PrivatePostPositionLeverageSave({
    //         symbol: instrument.replace("/", ""),
    //         leverage: webHook.leverage,
    //       });
    //       break;
    //   }
    // }

    // *********************************************************************************
    // *********************************************************************************
    // *********************************************************************************
    // *********************************************************************************

    const side = webHook.side.toLowerCase();
    const orderType = webHook.orderType.toLowerCase();

    switch (orderType) {
      case "limit":
        Limit.Limit(webHook, exchangeObject, side, amount, market);
        break;
      case "market":
        Market.Market(webHook, exchangeObject, side, amount, market, price);
        break;
    }

    console.log(
      `${exchangeName}`,
      `SUCCESSFUL ${instrument} ${side} OPENED`,
      amount
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = { order };
