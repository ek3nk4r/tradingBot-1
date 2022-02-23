const Amount = require("./closeOrder/Amount");
const Executions = require("./closeOrder/Executions");
const OrderType = require("./closeOrder/OrderType");

const closeOrder = async (exchangeObject, webHook) => {
  const { instrument, limitPrice, exchange } = webHook;
  const side = webHook.side.toLowerCase();
  const orderType = webHook.orderType.toLowerCase();
  const type = webHook.orderType;

  try {
    const executions = JSON.parse(
      await Executions.Executions(exchangeObject, instrument)
    );

    const amount = Amount.Amount(webHook, executions);

    await OrderType.OrderType(
      exchangeObject,
      orderType,
      instrument,
      side,
      amount,
      limitPrice,
      webHook
    ).catch((err) => console.log(err));
  } catch (err) {
    console.error(err);
  }
};

module.exports = { closeOrder };
