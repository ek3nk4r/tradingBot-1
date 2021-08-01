const Amount = (webHook, executions) => {
  const { amount, instrument } = webHook;
  const side = webHook.side.toLowerCase();

  if (
    amount.includes("%") &&
    instrument.charAt(instrument.length - 1) === "D"
  ) {
    return (
      (executions.result.size *
        Number(amount.substring(0, amount.length - 1))) /
      100
    );
  } else if (
    amount.includes("%") &&
    instrument.charAt(instrument.length - 1) === "T"
  ) {
    if (side == "buy") {
      return executions.result[1].size;
    } else if (side == "sell") {
      return executions.result[0].size;
    }
  } else {
    return Number(amount);
  }
};

module.exports = { Amount };
