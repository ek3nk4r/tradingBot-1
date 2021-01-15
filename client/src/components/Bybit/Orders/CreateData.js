const CreateData = (
  symbol,
  side,
  type,
  amount,
  cost,
  price,
  status,
  time,
  id
) => {
  return { symbol, side, type, amount, cost, price, status, time, id };
};

export default CreateData;
