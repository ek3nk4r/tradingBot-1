import React from "react";

const TotalBalance = (props) => {
  const { balance } = props;

  return (
    <>
      <div>
        {" "}
        <span className="balance-data-detail">Total: </span>{" "}
        <span className="balance-data"> {balance} </span>
      </div>
    </>
  );
};

export default TotalBalance;
