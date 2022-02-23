const CreateInverseStop = require("./CreateInverseStop");

const InverseWithStops = async (
  exchangeObject,
  market,
  webHook,
  side,
  amount
) => {
  const { stopPrice, profitPrice, instrument, orderType, exchange } = webHook;

  const params = {
    stop_loss: stopPrice,
    take_profit: profitPrice,
  };

  await exchangeObject
    .createOrder(instrument, orderType, side, amount, params)
    .then((res) => {
      if (res.info.order_status === "Created") {
        console.log(
          `${exchange}`,
          `SUCCESSFUL ${instrument} ${side} OPENED`,
          amount
        );
      }
      CreateInverseStop.CreateInverseStop(exchangeObject, market, webHook);
    })
    .catch((err) => console.log("*** ERROR ***", err));
};

module.exports = { InverseWithStops };
