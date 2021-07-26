const ExchangeIdentifiers = (res, setExchangeIdentifiers) => {
  const exchangeIdentifiers = res[0]
    .map((el) => {
      return el.identifier;
    })
    .sort((a, b) => a.localeCompare(b));
  setExchangeIdentifiers(exchangeIdentifiers);
};

export default ExchangeIdentifiers;
