import { signup } from "../AuthAxios";
import SignupSetState from "./SignupSetState";

const SendSignup = (username, password, setState, setUser, history) => {
  signup(username, password)
    .then((res) => {
      SignupSetState(res, setState, setUser, history);
    })
    .catch((err) => {
      return err.response.data;
    });
};

export default SendSignup;
