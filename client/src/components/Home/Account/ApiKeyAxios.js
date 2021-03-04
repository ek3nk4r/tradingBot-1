import axios from "axios";

const sendKeys = (id, exchange, identifier, key, secret) => {
  return axios
    .post("/addKeysRoutes/addApiKeys", {
      id: id,
      exchange: exchange,
      identifier: identifier,
      key: key,
      secret: secret,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("Error is: ", err);
    });
};

const getKeys = () => {
  return axios
    .get("/addKeysRoutes/retrieveKeys")
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("Error is: ", err);
    });
};

export { sendKeys, getKeys };
