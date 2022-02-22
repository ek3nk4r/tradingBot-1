// components
import SendKeySetState from "./SendKeySetState";
import { sendKeys } from "../../ApiKeyAxios";
import GetKeys from "../../ApiKeyList/ApiKeyList Functions/GetKeys";

const SendKeys = (
  _id,
  exchange,
  identifier,
  key,
  secret,
  net,
  setState,
  setExchangeAccounts
) => {
  if (key && secret && exchange && identifier && net) {
    sendKeys(_id, exchange, identifier, key, secret, net)
      .then((res) => {
        SendKeySetState(res, setState);
      })
      .then((res) => {
        GetKeys(setExchangeAccounts);
      })
      .catch((err) => {
        console.log("Error is: ", err);
      });
  }
};

export default SendKeys;
