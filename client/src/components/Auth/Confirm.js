import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
        console.log("ERRRRROOOOOOORRRRRRR", err);
        return err.response.data;
      });
  };

  useEffect(() => {
    emailConfirmed();
  });

  return (
    <div>{confirming ? <p>Confirming</p> : <Link to="/home">HOME</Link>}</div>
  );
};

export default Confirm;
