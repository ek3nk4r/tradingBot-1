const CreateInverseStop = require("./CreateInverseStop");

const InverseWithStops = async (
  exchangeObject,
  market,
  webHook,
  side,
  amount
) => {
  const { stopPrice, profitPrice, instrument, orderType } = webHook;

  const params = {
    stop_loss: stopPrice,
    take_profit: profitPrice,
  };

  await exchangeObject
    .createOrder(instrument, orderType, side, amount, params)
    .catch((err) => console.log("*** ERROR ***", err));

  CreateInverseStop.CreateInverseStop(exchangeObject, market, webHook).catch(
    (err) => console.log(err)
  );
};

module.exports = { InverseWithStops };
