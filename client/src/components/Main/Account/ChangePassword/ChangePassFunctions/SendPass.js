import SendPassSetState from "./SendPassSetState";
import { sendPass } from "../NewPassAxios";

const SendPass = (
  _id,
  currentPassword,
  newPassword,
  newPasswordAgain,
  setState,
  history
) => {
  if (newPasswordAgain === newPassword) {
    sendPass(_id, currentPassword, newPassword)
      .then((res) => {
        SendPassSetState(res, setState, history);
      })
      .catch((err) => {
        console.log("Error is: ", err);
      });
  }
};

export default SendPass;
