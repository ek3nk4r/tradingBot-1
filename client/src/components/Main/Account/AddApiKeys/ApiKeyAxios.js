import axios from "axios";

const sendKeys = (id, exchange, identifier, key, secret, net) => {
  return axios
    .post("/addKeysRoutes/addApiKeys", {
      id: id,
      exchange: exchange,
      identifier: identifier,
      net: net,
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

const deleteKeys = (id) => {
  console.log("***DELETE KEYS***", typeof id);
  return axios
    .put("/addKeysRoutes/deleteApiKeys", { apiKey_id: id })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("Error is: ", err);
    });
};

export { sendKeys, getKeys, deleteKeys };
