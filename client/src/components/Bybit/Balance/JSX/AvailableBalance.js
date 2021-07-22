import React from "react";

const AvailableBalance = (props) => {
  const { available } = props;

  return (
    <>
      <div>
        {" "}
        <span className="balance-data-detail">Available: </span>
        <span className="balance-data"> {available} </span>
      </div>
    </>
  );
};

export default AvailableBalance;
