const CreateLinearStop = async (exchangeObject, market, webHook) => {
  const { stopPrice, profitPrice, side, exchange, instrument } = webHook;

  console.log("***CREATE LINEAR STOP***");

  await exchangeObject
    .privateLinearPostPositionTradingStop({
      symbol: market["id"],
      side: side,
      stop_loss: stopPrice,
      take_profit: profitPrice,
    })
    .then((res) => {
      if (res.ret_msg === "OK") {
        console.log(
          `${exchange}`,
          `${instrument} STOP LOSS or TAKE PROFIT successfully opened!`
        );
      }
    })
    .catch((err) => console.log(err));
};

module.exports = { CreateLinearStop };
