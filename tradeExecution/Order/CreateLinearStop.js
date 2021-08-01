const CreateLinearStop = async (exchangeObject, market, webHook) => {
  const { stopPrice, profitPrice, side } = webHook;

  await exchangeObject
    .privateLinearPostPositionTradingStop({
      symbol: market["id"],
      side: side,
      stop_loss: stopPrice,
      take_profit: profitPrice,
    })
    .catch((err) => console.log(err));
};

module.exports = { CreateLinearStop };
