import React from "react";
import "../../Assets/stylesheets/balance.css";

const Balance = React.memo((props) => {
  console.log(props);
  const { balance, available, used } = props;

  return (
    <div className="balance-container">
      <div>
        <div className="instrument-name">{props.symbol}</div>
      </div>
      <div className="balances">
        <div>
          {" "}
          <span className="balance-data-detail">Total: </span>{" "}
          <span className="balance-data"> {balance} </span>
        </div>
        <div>
          {" "}
          <span className="balance-data-detail">Available: </span>
          <span className="balance-data"> {available} </span>
        </div>
        <div>
          {" "}
          <span className="balance-data-detail">Used: </span>{" "}
          <span className="balance-data"> {used} </span>
        </div>
      </div>
    </div>
  );
});

export default Balance;
