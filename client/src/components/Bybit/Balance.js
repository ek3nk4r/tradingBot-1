import React from "react";
import "../../Assets/stylesheets/balance.css";

const Balance = React.memo((props) => {
  return (
    <div className="balance-container">
      <div>
        <div className="instrument-name">{props.symbol}</div>
      </div>
      <div className="balance-data">
        <div> Total: {props.totalbtc} </div>
        <div> Available: {props.availablebtc} </div>
        <div> Used: {props.usedbtc} </div>
      </div>
    </div>
  );
});

export default Balance;
