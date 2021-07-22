import React from "react";

const UsedBalance = (props) => {
  const { used } = props;

  return (
    <>
      <div>
        {" "}
        <span className="balance-data-detail">Used: </span>{" "}
        <span className="balance-data"> {used} </span>
      </div>
    </>
  );
};

export default UsedBalance;
