import React, { useState, memo, useEffect, useCallback } from "react";

// components
import InstrumentBalance from "./JSX/InstrumentBalance";
import Coin from "./Coin";
import Balances from "./Balances";
import { postCoinData } from "../../ExchangeRouteAxios";

const Instrument = memo((props) => {
  const { symbol, user } = props;
  const userId = user._id;

  const [state, setState] = useState({
    balance: [],
    available: [],
    used: [],
    orders: [],
  });
  const { balance, available, used, orders } = state;

  const fetchCoinData = useCallback(() => {
    if (symbol) {
      postCoinData(symbol, userId)
        .then((res) => {
          const balances = res[0];
          const newOrders = [...res[1]];
          const coin = Coin(symbol);

          Balances(balances, setState, newOrders, coin);
        })
        .catch((err) => {
          console.log("Error is: ", err);
        });
    }
  }, [symbol, userId]);

  useEffect(() => {
    fetchCoinData();
  }, [fetchCoinData]);

  return (
    <>
      <InstrumentBalance
        symbol={symbol}
        balance={balance}
        available={available}
        used={used}
        orders={orders}
      />
    </>
  );
});

export default Instrument;
