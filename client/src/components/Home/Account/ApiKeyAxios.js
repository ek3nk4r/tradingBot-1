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
  axios
    .get("/addKeysRoutes/retrieveKeys")
    .then((res) => {
      console.log("FFFFFFFFFFFFFF", res);
      return res;
      // this.props.setUser(res.data);
      // console.log(res.data);
      // this.setState({ favorites: res.data.products }, () => {
      //   // console.log("LOOOOOOK ", this.state);
      // });
    })
    .catch((err) => {
      console.log("Error is: ", err);
    });
};

export { sendKeys, getKeys };
