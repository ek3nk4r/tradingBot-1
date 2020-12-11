import React from "react";
import Orders from "./Orders";

const Instrument = (props) => {
  console.log(props);
  return (
    // <div></div>
    <>
      <div>
        <div>{props.symbol}</div>
      </div>
      <div>
        <div>Total: {props.totalbtc}</div>
        <div>Available: {props.availablebtc}</div>
        <div>Used: {props.usedbtc}</div>
      </div>
      {/* <div>
        {props.trades.length ? (
          props.trades.map((trade) => {
            return <Trades trade={props.trade} />;
          })
        ) : (
          <></>
        )}
      </div> */}
      <div>
        {props.orders.length ? (
          props.orders.map((order) => {
            console.log(order);
            return <Orders key={order.id} order={order} />;
          })
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Instrument;
