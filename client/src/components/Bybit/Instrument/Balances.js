const Balances = (balances, setState, newOrders, coin) => {
  if (balances.free.hasOwnProperty(coin) === true) {
    setState({
      balance: balances.total[coin],
      available: balances.free[coin],
      used: balances.used[coin],
      orders: newOrders,
    });
  } else {
    setState({
      balance: 0,
      available: 0,
      used: 0,
      orders: newOrders,
    });
  }
};

export default Balances;
