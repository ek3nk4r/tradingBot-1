import React, { useState, useEffect } from "react";
import axios from "axios";

const Confirm = (props) => {
  const { id } = props.match.params;
  const [confirming, setConfirming] = useState(true);

  const emailConfirmed = () => {
    axios
      .get(`/api/email/confirm/${id}`)
      .then((data) => {
        console.log(data);
        setConfirming(false);
      })
      .catch((err) => {
        return err.response.data;
      });
  };

  useEffect(() => {
    emailConfirmed();
    window.location.replace(`${process.env.SUCCESS_URL}`);
  });

  return <div>{confirming ? <p>Confirming</p> : <></>} </div>;
};

export default Confirm;