import axios from "axios";

const getExchanges = (userId) => {
  return axios
    .get(`/exchangeRoutes/exchangeAccounts/${userId}`)
    .then((res) => {
      // console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log("Error is", err);
      return err.res.data;
    });
};

const getTickers = (exchangeName, identifier, userId) => {
  return axios
    .get(`/exchangeRoutes/tickers/${exchangeName}/${identifier}/${userId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("Error is: ", err);
      return err.res.data;
    });
};

const postCoinData = (symbol, userId) => {
  return axios
    .post("/exchangeRoutes/coinData", { name: symbol, user_id: userId })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("Error is: ", err);
      return err.res.data;
    });
};

export { getExchanges, getTickers, postCoinData };
