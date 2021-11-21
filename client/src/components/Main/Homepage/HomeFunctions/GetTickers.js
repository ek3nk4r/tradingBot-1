import { getTickers } from "../../../ExchangeRouteAxios";

const GetTickers = (exchangeName, identifier, userId, setMarketNames) => {
  if (identifier) {
    getTickers(exchangeName, identifier, userId)
      .then((res) => {
        const markets = res[1];
        const marketNames = Object.keys(markets)
          .map((key) => {
            return markets[key];
          })
          .map((market) => {
            return market.symbol;
          });

        setMarketNames(marketNames);
      })
      .catch((err) => {
        console.log("***ERROR***", err);
        return err.res.data;
      });
  }
};

export default GetTickers;
