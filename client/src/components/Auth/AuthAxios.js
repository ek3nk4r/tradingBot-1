import axios from "axios";

const signup = (username, password) => {
  return axios
    .post("/api/signup", {
      username: username,
      password: password,
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

const login = (username, password) => {
  return axios
    .post("/api/login", {
      username: username,
      password: password,
    })
    .then((response) => {
      console.log(response.data);
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
