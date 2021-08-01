const Executions = async (exchangeObject, instrument) => {
  try {
    let executions;
    if (instrument.charAt(instrument.length - 1) === "D") {
      executions = await exchangeObject.v2PrivateGetPositionList({
        symbol: instrument.replace("/", ""),
      });
    } else if (instrument.charAt(instrument.length - 1) === "T") {
      executions = await exchangeObject.privateLinearGetPositionList({
        symbol: instrument.replace("/", ""),
      });
    }
    return executions;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { Executions };
