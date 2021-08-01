const CreateLimitOrder = require("./CreateLimitOrder");
const CreateInverseStop = require("./CreateInverseStop");
const CreateLinearStop = require("./CreateLinearStop");

const Limit = (webHook, exchangeObject, side, amount, market) => {
  const { instrument } = webHook;

  console.log("***LIMIT***");

  if (webHook.stopOrder == false) {
    CreateLimitOrder.CreateLimitOrder(
      webHook,
      exchangeObject,
      side,
      amount,
      market
    ).catch((err) => console.log(err));
  } else if (
    instrument.charAt(instrument.length - 1) === "D" &&
    webHook.stopOrder == true
  ) {
    CreateInverseStop.CreateInverseStop(exchangeObject, market, webHook).catch(
      (err) => console.log(err)
    );
  } else if (
    instrument.charAt(instrument.length - 1) === "T" &&
    webHook.stopOrder == true
  ) {
    CreateLinearStop.CreateLinearStop(exchangeObject, market, webHook).catch(
      (err) => console.log(err)
    );
  }
};

module.exports = { Limit };
