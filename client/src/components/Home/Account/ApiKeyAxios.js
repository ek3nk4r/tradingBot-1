import axios from "axios";

const sendKeys = (id, exchange, identifier, key, secret) => {
  console.log(typeof id);
  return axios
    .post("/addKeysRoutes/addApiKeys", {
      id: id,
      exchange: exchange,
      identifier: identifier,
      key: key,
      secret: secret,
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export { sendKeys };
