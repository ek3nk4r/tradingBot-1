const CreateInverseStop = async (exchangeObject, market, webHook) => {
  const { stopPrice, profitPrice } = webHook;

  // console.log("***WE MADE IT***");
  await exchangeObject
    .v2PrivatePostPositionTradingStop({
      symbol: market["id"],
      stop_loss: stopPrice,
      take_profit: profitPrice,
    })
    .catch((err) => console.log(err));
};

module.exports = { CreateInverseStop };
