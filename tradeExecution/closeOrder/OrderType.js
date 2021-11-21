const MarketClose = require("./MarketClose");

const OrderType = async (
  exchangeObject,
  orderType,
  instrument,
  type,
  side,
  amount,
  limitPrice
) => {
  switch (orderType) {
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
      MarketClose.MarketClose(exchangeObject, instrument, amount, side);
      break;
  }
};

module.exports = { OrderType };
