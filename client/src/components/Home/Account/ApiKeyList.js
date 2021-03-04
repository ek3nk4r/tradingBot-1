import React, { useState, useEffect } from "react";
import { getKeys } from "./ApiKeyAxios";

const ApiKeyList = () => {
  const [state, setState] = useState({
    exchangeAccounts: [],
    newExchangeAccount: false,
  });

  const { exchangeAccounts, newExchangeAccount } = state;

  useEffect(() => {
    getKeys()
      .then((res) => {
        console.log("XXXXXXXXXXXXXXX", res);
        const accounts = res.data.exchangeAccount;
        if (newExchangeAccount === true) {
          setState({
            exchangeAccounts: accounts,
            newExchangeAccount: false,
          });
          console.log(exchangeAccounts);
        }
      })
      .catch((err) => {
        console.log("Error is: ", err);
      });
  }, [newExchangeAccount]);
  return <div></div>;
};

export default ApiKeyList;
