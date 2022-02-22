const CreateInverseStop = async (exchangeObject, market, webHook) => {
  const { stopPrice, profitPrice, exchange, instrument } = webHook;

  await exchangeObject
    .v2PrivatePostPositionTradingStop({
      symbol: market["id"],
      stop_loss: stopPrice,
      take_profit: profitPrice,
    })
    .then((res) => {
      if (res.ret_msg === "OK") {
        console.log(
          `${exchange}`,
          `${instrument} STOP OR TAKE PROFIT SUCCESSFULLY OPENED`
        );
      }
    })
    .catch((err) => console.log(err));
};

module.exports = { CreateInverseStop };
