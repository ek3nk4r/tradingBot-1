import React, { useState, memo, useEffect } from "react";
import axios from "axios";
import Orders from "./Orders/Orders";
import Balance from "./Balance";

const Instrument = memo((props) => {
  const { symbol, user } = props;

  const [state, setState] = useState({
    balance: [],
    available: [],
    used: [],
    orders: [],
  });
  const { balance, available, used, orders } = state;

  useEffect(() => {
    axios
      .post("/exchangeRoutes/coinData", { name: symbol, user_id: user._id })
      .then((res) => {
        console.log(res);
        const balances = res.data[0];
        const newOrders = [...res.data[1]];

        let coin;
        if (symbol.charAt(symbol.length - 1) === "T") {
          coin = symbol.slice(symbol.indexOf("/") + 1, symbol.length);
        } else if (symbol.charAt(symbol.length - 1) === "D") {
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
