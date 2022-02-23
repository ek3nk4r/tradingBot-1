const InverseWithStops = require("./InverseWithStops");
const LinearWithStops = require("./LinearWithStops");

const MarketWithStops = (webHook, exchangeObject, side, amount, market) => {
  const { instrument } = webHook;

  if (instrument.charAt(instrument.length - 1) === "T") {
    LinearWithStops.LinearWithStops(
      exchangeObject,
      market,
      webHook,
      side,
      amount
    );
  } else if (instrument.charAt(instrument.length - 1) === "D") {
    InverseWithStops.InverseWithStops(
      exchangeObject,
      market,
      webHook,
      side,
      amount
    );
  }
};

module.exports = { MarketWithStops };
