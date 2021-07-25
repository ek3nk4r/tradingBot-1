import React from "react";

const ErrorMessage = (isError, error) => {
  return <div>{isError ? <span id="warning">{error}</span> : <></>}</div>;
};

export default ErrorMessage;
