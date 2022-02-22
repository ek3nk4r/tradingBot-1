const Limit = require("./Order/Limit");
const Market = require("./Order/Market");

const placeOrder = (webHook, exchangeObject, amount, market, price) => {
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
};

module.exports = { placeOrder };
