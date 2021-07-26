import { getExchanges } from "../../components/ExchangeRouteAxios";

// components
import ExchangeIdentifiers from "./ExchangeIdentifiers";
import ExchangeNames from "./ExchangeNames";

const GetExchanges = (
  user,
  userId,
  setExchangeNames,
  setExchangeIdentifiers
) => {
  if (user) {
    getExchanges(userId)
      .then((res) => {
        ExchangeIdentifiers(res, setExchangeIdentifiers);
        ExchangeNames(res, setExchangeNames);
      })
      .catch((err) => {
        return err.response.data;
      });
  }
};

export default GetExchanges;
