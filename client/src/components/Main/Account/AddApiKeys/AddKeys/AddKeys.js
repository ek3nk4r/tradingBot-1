import React, { useState } from "react";

// components
import UseStyles from "./Material-ui/UseStyles";
import ErrorMessage from "../../../../ErrorMessage";
import SendKeys from "./AddKeysFunctions/SendKeys";
import AddKeysForm from "./JSX/AddKeysForm";

const AddKeys = (props) => {
  const { _id } = props.user;
  const classes = UseStyles();

  const [state, setState] = useState({
    apiKey: "",
    secret: "",
    exchange: "",
    net: "",
    identifier: "",
    isError: false,
    error: "",
  });

  const { apiKey, secret, exchange, identifier, net, isError, error } = state;

  const errorMessage = ErrorMessage(isError, error);

  const handleChange = (event) => {
    event.persist();
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    SendKeys(_id, exchange, identifier, apiKey, secret, net, setState);
  };

  return (
    <>
      <AddKeysForm
        handleSubmit={handleSubmit}
        identifier={identifier}
        handleChange={handleChange}
        exchange={exchange}
        classes={classes}
        net={net}
        apiKey={apiKey}
        secret={secret}
        setState={setState}
        errorMessage={errorMessage}
      />
    </>
  );
};

export default AddKeys;
