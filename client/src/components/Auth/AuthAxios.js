import axios from "axios";

const signup = (username, password) => {
  return axios
    .post("/api/signup", {
      username: username,
      password: password,
      userType: "user",
    })
    .then((res) => {
      console.log(res);
      return res.data;
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
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

const logout = () => {
  axios.delete("/api/logout");
};

const emailConfirmed = (id) => {
  return axios
    .get(`/api/email/confirm/${id}`)
    .then((res) => {
      console.log("***EMAIL CONFIRMED AUTH***", res);
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export { signup, login, logout, emailConfirmed };
