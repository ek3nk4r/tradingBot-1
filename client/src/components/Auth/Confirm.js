import React, { useState, useEffect, useCallback } from "react";
import { emailConfirmed } from "./AuthAxios";

const Confirm = (props) => {
  const { id } = props.match.params;
  const { history } = props;
  const [confirming, setConfirming] = useState(true);

  console.log("***ID***", props.match.params);

  const fn = useCallback(() => {
    setConfirming(false);
  }, []);

  useEffect(() => {
    emailConfirmed(id)
      .then((res) => {
        fn();
      })
      .catch((err) => {
        return err.response.data;
      });

    history.push(`${process.env.SUCCESS_URL}`);
    // history.push("/home");
  }, [fn, id, history]);

  return <div>{confirming ? <p>Confirming</p> : <></>}</div>;
};

export default Confirm;
