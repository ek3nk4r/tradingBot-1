import React from "react";

// components
import IdentifierTextField from "../JSX/IdentifierTextField";
import ExchangeFormControl from "../JSX/ExchangeFormControl";
import NetFormControl from "../JSX/NetFormControl";
import KeyTextField from "../JSX/KeyTextField";
import SecretTextField from "../JSX/SecretTextField";
import AddExchangeButton from "../JSX/AddExchangeButton";

const AddKeysForm = (props) => {
  const {
    handleNewKeysSubmit,
    net,
    classes,
    identifier,
    handleChange,
    exchange,
    apiKey,
    secret,
  } = props;

  return (
    <>
      <form onSubmit={handleNewKeysSubmit} className={classes.root}>
        <IdentifierTextField
          identifier={identifier}
          handleChange={handleChange}
        />
        <ExchangeFormControl
          exchange={exchange}
          handleChange={handleChange}
          classes={classes}
        />
        <NetFormControl
          net={net}
          handleChange={handleChange}
          classes={classes}
        />
        <KeyTextField apiKey={apiKey} handleChange={handleChange} />
        <SecretTextField secret={secret} handleChange={handleChange} />
        <AddExchangeButton />
      </form>
    </>
  );
};

export default AddKeysForm;
