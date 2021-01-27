import axios from "axios";

const signup = (email, password) => {
  return axios
    .post("/api/signup", {
      firstName: "",
      lastName: "",
      email: email,
      password: password,
      exchangeAccount: [],
      userType: "user",
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log("err", err);
      return err.response.data;
    });
};

const login = (email, password) => {
  return axios
    .post("/api/login", {
      email: email,
      password: password,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

const logout = () => {
  axios.delete("/api/logout");
};

export { signup, login, logout };
