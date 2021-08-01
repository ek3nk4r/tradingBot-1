const CreateMarketOrder = require("./CreateMarketOrder");

const Market = (webHook, exchangeObject, side, amount, market, price) => {
  CreateMarketOrder.CreateMarketOrder(
    webHook,
    exchangeObject,
    side,
    amount,
    market,
    price
  ).catch((err) => console.log(err));
};

module.exports = { Market };
