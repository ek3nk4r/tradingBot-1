const ExchangeNames = (res, setExchangeNames) => {
  const exchangeNames = res[0].map((el) => {
    return el.exchangeName;
  });
  setExchangeNames(exchangeNames);
};

export default ExchangeNames;
