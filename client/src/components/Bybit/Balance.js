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

  const [balances, setBalances] = useState([]);

  const getBalance = (symbol) => {
    axios
      .post("/bybit/balances", { name: symbol })
      .then((res) => {
        console.log(res);
        const balances = res.data[0];

        setBalances(balances);
      })
      .catch((err) => {
        console.log("Error is: ", err);
      });
  };

  useEffect(() => {
    getBalance(symbol);
  }, [symbol]);

  console.log(balances);

  return (
    <div className="balance-container">
      <div>
        <div className="instrument-name">{props.symbol}</div>
      </div>
      <div className="balance-data">
        <div> Total: {props.totalbtc} </div>
        <div> Available: {props.availablebtc} </div>
        <div> Used: {props.usedbtc} </div>
      </div>
    </div>
  );
});

export default Balance;
