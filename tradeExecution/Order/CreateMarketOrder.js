const MarketWithStops = require("./MarketWithStops");

const CreateMarketOrder = async (
  webHook,
  exchangeObject,
  side,
  amount,
  market
) => {
  const { instrument, orderType, stopPrice, profitPrice } = webHook;

  if (stopPrice > 0 || profitPrice > 0) {
    MarketWithStops.MarketWithStops(
      webHook,
      exchangeObject,
      side,
      amount,
      market
    );
  } else {
    await exchangeObject
      .createOrder(instrument, orderType, side, amount)
      .catch((err) => console.log("*** ERROR ***", err));
  }
};

module.exports = { CreateMarketOrder };
