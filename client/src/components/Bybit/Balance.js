import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Assets/stylesheets/balance.css";

const Balance = React.memo((props) => {
  console.log(props);

  const { symbol } = props;
  // const {
  //   wallet_balance,
  //   available_balance,
  //   used_margin,
  //   cum_realised_pnl,
  //   unrealised_pnl,
  //   used_margin,
  // } = props;

  const [balance, setBalance] = useState([]);
  const [available, setAvailable] = useState([]);
  const [used, setUsed] = useState([]);

  const getBalance = (symbol) => {
    axios
      .post("/bybit/balances", { name: symbol })
      .then((res) => {
        console.log(res);
        const balances = res.data[0];

        console.log(balances);

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

        setBalance(balance);
        setAvailable(available);
        setUsed(used);
      })
      .catch((err) => {
        console.log("Error is: ", err);
      });
  };

  useEffect(() => {
    getBalance(symbol);
  }, [symbol]);

  console.log(balance);
  console.log(available);
  console.log(used);

  return (
    <div className="balance-container">
      <div>
        <div className="instrument-name">{props.symbol}</div>
      </div>
      <div className="balance-data">
        <div> Total: {balance} </div>
        <div> Available: {available} </div>
        <div> Used: {used} </div>
      </div>
    </div>
  );
});

export default Balance;
