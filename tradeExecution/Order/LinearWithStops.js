const CreateLinearStop = require("./CreateLinearStop");

const LinearWithStops = async (
  exchangeObject,
  market,
  webHook,
  side,
  amount
) => {
  const { instrument, orderType, exchange } = webHook;

  await exchangeObject
    .createOrder(instrument, orderType, side, amount)
    .then((res) => {
      console.log("***RESPONSE***", res);
      if (res.info.order_status === "Created") {
        console.log(
          `${exchange}`,
          `SUCCESSFUL ${instrument} ${side} OPENED`,
          amount
        );
      }
    })
    .catch((err) => console.log("*** ERROR ***", err));

  CreateLinearStop.CreateLinearStop(exchangeObject, market, webHook);
};

module.exports = { LinearWithStops };
