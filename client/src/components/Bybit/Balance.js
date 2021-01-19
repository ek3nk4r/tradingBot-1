import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Assets/stylesheets/balance.css";

const Balance = React.memo((props) => {
  console.log(props);

  const { symbol } = props;

  const [balance, setBalance] = useState([]);
  const [available, setAvailable] = useState([]);
  const [used, setUsed] = useState([]);

  const getBalance = (symbol) => {
    axios
      .post("/bybit/balances", { name: symbol })
      .then((res) => {
        const balances = res.data[0];

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

  return (
    <div className="balance-container">
      <div>
        <div className="instrument-name">{props.symbol}</div>
      </div>
      <div className="balances">
        <div>
          {" "}
          <span className="balance-data-detail">Total: </span>{" "}
          <span className="balance-data"> {balance} </span>
        </div>
        <div>
          {" "}
          <span className="balance-data-detail">Available: </span>
          <span className="balance-data"> {available} </span>
        </div>
        <div>
          {" "}
          <span className="balance-data-detail">Used: </span>{" "}
          <span className="balance-data"> {used} </span>
        </div>
      </div>
    </div>
  );
});

export default Balance;
