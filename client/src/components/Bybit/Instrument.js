import React from "react";
import Orders from "./Orders";
import Balance from "./Balance";

const Instrument = React.memo((props) => {
  console.log(props);
  return (
    <>
      <Balance
        availablebtc={props.availablebtc}
        symbol={props.symbol}
        totalbtc={props.totalbtc}
        usedbtc={props.usedbtc}
      />
      {/* <Orders orders={props.orders} /> */}
      <div>
        {props.orders.length ? <Orders orders={props.orders} /> : <></>}
      </div>
    </>
  );
});

export default Instrument;
