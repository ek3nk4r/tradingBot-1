const MarketClose = async (
  exchangeObject,
  instrument,
  amount,
  side,
  exchange
) => {
  params = {
    reduce_only: true,
  };
  if (side == "sell") {
    await exchangeObject
      .createMarketSellOrder(instrument, amount, params)
      .then((res) => {
        if (res.info.order_status === "Created") {
          console.log(
            `${exchange}`,
            `SUCCESSFUL ${instrument} ${side} SIDE MARKET CLOSE ORDER`,
            amount
          );
        }
      })
      .catch((err) => console.log(err));
  } else if (side == "buy") {
    await exchangeObject
      .createMarketBuyOrder(instrument, amount, params)
      .then((res) => {
        if (res.info.order_status === "Created") {
          console.log(
            `${exchange}`,
            `SUCCESSFUL ${instrument} ${side} SIDE MARKET CLOSE ORDER`,
            amount
          );
        }
      })
      .catch((err) => console.log(err));
  }
};

module.exports = { MarketClose };
