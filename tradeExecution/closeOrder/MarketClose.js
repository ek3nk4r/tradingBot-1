const MarketClose = async (exchangeObject, instrument, amount, side) => {
  params = {
    reduce_only: true,
  };
  if (side == "sell") {
    await exchangeObject.createMarketSellOrder(instrument, amount, params);
  } else if (side == "buy") {
    await exchangeObject.createMarketBuyOrder(instrument, amount, params);
  }
};

module.exports = { MarketClose };
