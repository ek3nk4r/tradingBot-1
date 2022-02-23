const CreateMarketOrder = require("./CreateMarketOrder");

const Market = (webHook, exchangeObject, side, amount, market, price) => {
  CreateMarketOrder.CreateMarketOrder(
    webHook,
    exchangeObject,
    side,
    amount,
    market,
    price
  );
};

module.exports = { Market };
