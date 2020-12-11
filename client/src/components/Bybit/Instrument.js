import React from "react";
import Orders from "./Orders";
import Balance from "./Balance";

const Instrument = React.memo((props) => {
  console.log(props);
  return (
    <>
      <Balance
        availablebtc={props.availablebtc}
        totalbtc={props.totalbtc}
        usedbtc={props.usedbtc}
      />
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
});

export default Instrument;
