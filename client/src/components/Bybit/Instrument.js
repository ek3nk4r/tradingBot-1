import React from "react";
import Orders from "./Orders/Orders";
import Balance from "./Balance";

const Instrument = React.memo((props) => {
  console.log(props);
  return (
    <div>
      {props.symbol ? <Balance symbol={props.symbol} /> : <></>}
      <div>
        {props.orders.length ? <Orders orders={props.orders} /> : <></>}
      </div>
    </div>
  );
});

export default Instrument;
