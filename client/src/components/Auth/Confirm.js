import React, { useState, useEffect } from "react";
import { emailConfirmed } from "./AuthAxios";

const Confirm = (props) => {
  const { id } = props.match.params;
  const [confirming, setConfirming] = useState(true);

  console.log("***ID***", props.match.params);

  // const emailConfirmed = () => {
  //   axios
  //     .get(`/api/email/confirm/${id}`)
  //     .then((res) => {
  //       console.log(res);
  //       setConfirming(false);
  //     })
  //     .catch((err) => {
  //       return err.response.data;
  //     });
  // };

  useEffect(() => {
    emailConfirmed(id)
      .then((res) => {
        console.log(res);
        setConfirming(false);
      })
      .catch((err) => {
        return err.response.data;
      });
    props.history.push(`${process.env.SUCCESS_URL}`);
  });

  return <div>{confirming ? <p>Confirming</p> : <></>}</div>;
};

export default Confirm;
