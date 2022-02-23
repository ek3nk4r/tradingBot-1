const CreateLimitOrder = require("./CreateLimitOrder");
const CreateInverseStop = require("./CreateInverseStop");
const CreateLinearStop = require("./CreateLinearStop");

const Limit = (webHook, exchangeObject, side, amount, market) => {
  const { instrument } = webHook;

  if (webHook.stopOrder == false && webHook.takeProfit == false) {
    /**
     * to create a limit order with a stop loss or take profit
     * simply add the sl of tp price to the JSON.
     * ***DO NOT*** mark the 'stopOrder' or 'takeProfit' as true
     *  */
    CreateLimitOrder.CreateLimitOrder(
      webHook,
      exchangeObject,
      side,
      amount,
      market
    );
  } else if (
    (instrument.charAt(instrument.length - 1) === "D" &&
      webHook.stopOrder == true) ||
    (instrument.charAt(instrument.length - 1) === "D" &&
      webHook.takeProfit == true)
  ) {
    /**
     * If you are trying to add a stop loss or take profit to an existing order
     * mark 'stopOrder' or 'takeProfit' in the JSON as true
     */
    CreateInverseStop.CreateInverseStop(exchangeObject, market, webHook);
  } else if (
    (instrument.charAt(instrument.length - 1) === "T" &&
      webHook.stopOrder == true) ||
    (instrument.charAt(instrument.length - 1) === "T" &&
      webHook.takeProfit == true) ||
    (instrument.charAt(instrument.length - 1) === "T" &&
      webHook.takeProfit == true &&
      webHook.stopOrder == true)
  ) {
    CreateLinearStop.CreateLinearStop(exchangeObject, market, webHook);
  }
};

module.exports = { Limit };
