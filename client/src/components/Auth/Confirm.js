import React, { useState, useEffect } from "react";
import { emailConfirmed } from "./AuthAxios";

const Confirm = (props) => {
  const { id } = props.match.params;
  const { user } = props;
  const [confirming, setConfirming] = useState(true);

  console.log("***ID***", props.match.params);

  useEffect(() => {
    emailConfirmed(id)
      .then((res) => {
        setConfirming(false);
      })
      .catch((err) => {
        return err.response.data;
      });

    props.history.push(`${process.env.SUCCESS_URL}`);
    // props.history.push("/home");
  }, []);

  return <div>{confirming ? <p>Confirming</p> : <></>}</div>;
};

export default Confirm;
