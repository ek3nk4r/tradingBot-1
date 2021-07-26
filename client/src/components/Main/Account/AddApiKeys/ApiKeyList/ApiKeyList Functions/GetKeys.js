import { getKeys } from "../../ApiKeyAxios";

const GetKeys = (setExchangeAccounts) => {
  getKeys()
    .then((res) => {
      const accounts = res.data.exchangeAccount;
      setExchangeAccounts(accounts);
    })
    .catch((err) => {
      console.log("Error is: ", err);
    });
};

export default GetKeys;
