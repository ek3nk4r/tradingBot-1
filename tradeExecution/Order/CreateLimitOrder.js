const CreateLimitOrder = async (
  webHook,
  exchangeObject,
  side,
  amount,
  market
) => {
  const {
    instrument,
    limitPrice,
    triggerPrice,
    basePrice,
    stopPrice,
    profitPrice,
    exchange,
  } = webHook;

  const orderType = webHook.orderType.toLowerCase();

  const params = {
    stop_loss: stopPrice,
    take_profit: profitPrice,
  };

  if (stopPrice > 0 || profitPrice > 0) {
    console.log("***STOP LOSS***");
    /* the following createOrder method creates a limit 
    order with either a stop loss or a take profit or both*/
    await exchangeObject
      .createOrder(instrument, orderType, side, amount, limitPrice, params)
      .then((res) => {
        if (res.info.order_status === "Created") {
          console.log(
            `${exchange}`,
            `SUCCESSFUL ${instrument} ${side} OPENED`,
            amount
          );
        }
      })
      .catch((err) => console.log(err));
  } else {
    await exchangeObject
      .createOrder(instrument, orderType, side, amount, limitPrice)
      .then((res) => {
        if (res.info.orderStatus === "Created") {
          console.log(
            `${exchange}`,
            `SUCCESSFUL ${instrument} ${side} OPENED`,
            amount
          );
        }
      })
      .catch((err) => console.log(err));
  }
};

module.exports = { CreateLimitOrder };
