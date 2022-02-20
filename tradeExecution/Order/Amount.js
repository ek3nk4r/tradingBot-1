const Amount = (webHook, instrument, coin, balance, price) => {
  if (
    webHook.amount.includes("%") &&
    instrument.charAt(instrument.length - 1) === "D"
  ) {
    if (
      balance.free[coin] *
        Number(webHook.amount.substring(0, webHook.amount.length - 1) / 100) *
        price >=
      1
    ) {
      return (
        balance.free[coin] *
        Number(webHook.amount.substring(0, webHook.amount.length - 1) / 100) *
        price
      );
    } else if (
      balance.free[coin] *
        Number(webHook.amount.substring(0, webHook.amount.length - 1) / 100) *
        price >
      1
    ) {
      return Number(1);
    }
  } else if (
    webHook.amount.includes("%") &&
    instrument.charAt(instrument.length - 1) === "T"
  ) {
    if (
      balance.free[instrument.slice(-4, instrument.length)] *
      (Number(webHook.amount.substring(0, webHook.amount.length - 1)) >= 100)
    ) {
      return (
        balance.free[instrument.slice(-4, instrument.length)] *
        (Number(webHook.amount.substring(0, webHook.amount.length - 1)) / price)
      );
    } else if (
      balance.free[instrument.slice(-4, instrument.length)] *
      (Number(webHook.amount.substring(0, webHook.amount.length - 1)) < 100)
    ) {
      return Number(1);
    }
  } else {
    return Number(webHook.amount);
  }
};

module.exports = { Amount };
