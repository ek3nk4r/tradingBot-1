const CreateLinearStop = require("./CreateLinearStop");

const LinearWithStops = async (
  exchangeObject,
  market,
  webHook,
  side,
  amount
) => {
  const { instrument, orderType } = webHook;

  await exchangeObject
    .createOrder(instrument, orderType, side, amount)
    .catch((err) => console.log("*** ERROR ***", err));

  CreateLinearStop.CreateLinearStop(exchangeObject, market, webHook).catch(
    (err) => console.log(err)
  );
};

module.exports = { LinearWithStops };
