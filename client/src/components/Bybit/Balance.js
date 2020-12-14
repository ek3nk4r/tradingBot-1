import React from "react";

const Balance = React.memo((props) => {
  console.log(props);
  return (
    <div>
      <div>
        <div>{props.symbol}</div>
      </div>
      <div>
        <div>Total: {props.totalbtc}</div>
        <div>Available: {props.availablebtc}</div>
        <div>Used: {props.usedbtc}</div>
      </div>
    </div>
  );
});

export default Balance;
