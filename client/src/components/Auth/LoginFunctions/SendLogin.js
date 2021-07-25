import { login } from "../AuthAxios";
import SendLoginSetState from "./SendLoginSetState";

const SendLogin = (username, password, setState, setUser, history) => {
  login(username, password)
    .then((data) => {
      SendLoginSetState(data, setState, setUser, history);
    })
    .catch((err) => {
      return err.response.data;
    });
};

export default SendLogin;
