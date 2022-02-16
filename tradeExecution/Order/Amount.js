const Amount = (webHook, instrument, coin, balance, price) => {
  if (
    webHook.amount.includes("%") &&
    instrument.charAt(instrument.length - 1) === "D"
  ) {
    return (
      balance.free[coin] *
      Number(webHook.amount.substring(0, webHook.amount.length - 1) / 100) *
      price
    );
  } else if (
    webHook.amount.includes("%") &&
    instrument.charAt(instrument.length - 1) === "T"
  ) {
    return (
      balance.free[instrument.slice(-4, instrument.length)] *
      (Number(webHook.amount.substring(0, webHook.amount.length - 1)) / price)
    );
  } else {
    return Number(webHook.amount);
  }
};

module.exports = { Amount };
