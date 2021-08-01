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
  } = webHook;

  const orderType = webHook.orderType.toLowerCase();

  const params = {
    stop_loss: stopPrice,
    take_profit: profitPrice,
  };

  if (stopPrice > 0 || profitPrice > 0) {
    console.log("***STOP***");
    await exchangeObject
      .createOrder(instrument, orderType, side, amount, limitPrice, params)
      .catch((err) => console.log(err));
  } else {
    await exchangeObject
      .createOrder(instrument, orderType, side, amount, limitPrice)
      .catch((err) => console.log(err));
  }
};

module.exports = { CreateLimitOrder };
