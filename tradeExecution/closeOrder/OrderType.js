const MarketClose = require("./MarketClose");

const OrderType = async (
  exchangeObject,
  orderType,
  instrument,
  side,
  amount,
  limitPrice,
  webHook
) => {
  const { exchange } = webHook;

  switch (orderType) {
    case "limit":
      await exchangeObject
        .createOrder(instrument, orderType, side, amount, limitPrice)
        .then((res) => {
          console.log("***LIMIT CLOSE***", res);
          if (res.info.order_status === "Created") {
            console.log(
              `${exchange}`,
              `SUCCESSFUL ${instrument} ${side} SIDE ORDER OPENED`,
              amount
            );
          }
        })
        .catch((err) => console.log(err));
      break;
    case "market":
      MarketClose.MarketClose(
        exchangeObject,
        instrument,
        amount,
        side,
        exchange
      );
      break;
  }
};

module.exports = { OrderType };
