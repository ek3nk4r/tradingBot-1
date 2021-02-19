import React from "react";
import axios from "axios";
import Orders from "./Orders/Orders";
import Balance from "./Balance";

const Instrument = React.memo((props) => {
  console.log(props);
  const { symbol } = props;

  const [state, setState] = React.useState({
    balance: [],
    available: [],
    used: [],
    orders: [],
  });
  const { balance, available, used, orders } = state;

  const getCoinData = (symbol) => {
    axios
      .post("/exchangeRoutes/coinData", { name: symbol })
      .then((res) => {
        console.log(res);
        const balances = res.data[0];
        const newOrders = [...res.data[1]];

        let coin;
        if (symbol.includes("/")) {
          coin = symbol.slice(0, symbol.indexOf("/"));
        } else {
          coin = symbol;
        }

        let balance;
        let available;
        let used;
        if (balances.free.hasOwnProperty(coin) === true) {
          balance = balances.total[coin];
          available = balances.free[coin];
          used = balances.used[coin];
        } else {
          balance = 0;
          available = 0;
          used = 0;
        }

        setState({
          balance: balance,
          available: available,
          used: used,
          orders: newOrders,
        });
      })
      .catch((err) => {
        console.log("Error is: ", err);
      });
  };

  React.useEffect(() => {
    getCoinData(symbol);
  }, [symbol]);

  return (
    <div>
      {symbol ? (
        <Balance
          symbol={symbol}
          balance={balance}
          available={available}
          used={used}
        />
      ) : (
        <></>
      )}
      <div>{orders.length ? <Orders orders={orders} /> : <></>}</div>
    </div>
  );
});

export default Instrument;
