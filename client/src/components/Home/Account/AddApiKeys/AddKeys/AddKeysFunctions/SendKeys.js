// components
import SendKeySetState from "./SendKeySetState";
import { sendKeys } from "../../ApiKeyAxios";

const SendKeys = (_id, exchange, identifier, key, secret, net, setState) => {
  if (key && secret && exchange && identifier && net) {
    sendKeys(_id, exchange, identifier, key, secret, net)
      .then((res) => {
        SendKeySetState(res, setState);
      })
      .catch((err) => {
        console.log("Error is: ", err);
      });
  }
};

export default SendKeys;
