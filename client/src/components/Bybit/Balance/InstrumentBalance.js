import React from "react";

const InstrumentBalance = (props) => {
  const { symbol } = props;

  return (
    <>
      <div className="instrument-name">{symbol}</div>
    </>
  );
};

export default InstrumentBalance;
