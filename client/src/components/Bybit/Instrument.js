import React, { useState, useEffect } from "react";
import axios from "axios";
import Orders from "./Orders/Orders";
import Balance from "./Balance";

const Instrument = React.memo((props) => {
  console.log(props);
  const { symbol } = props;
  const initialOrders = [];

  const [state, setState] = useState({
    balance: [],
    available: [],
    used: [],
    orders: [...initialOrders],
  });

  const getCoinData = (symbol) => {
    axios
      .post("/bybit/coinData", { name: symbol })
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

  useEffect(() => {
    getCoinData(symbol);
  }, [symbol]);

  return (
    <div>
      {props.symbol ? (
        <Balance
          symbol={props.symbol}
          balance={state.balance}
          available={state.available}
          used={state.used}
        />
      ) : (
        <></>
      )}
      <div>
        {state.orders.length ? <Orders orders={state.orders} /> : <></>}
      </div>
    </div>
  );
});

export default Instrument;
