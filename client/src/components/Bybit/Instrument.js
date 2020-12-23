import React from "react";
import Orders from "./Orders";
import Balance from "./Balance";

const Instrument = React.memo((props) => {
  return (
    <div>
      {/* <Balance
        availablebtc={props.availablebtc}
        symbol={props.symbol}
        totalbtc={props.totalbtc}
        usedbtc={props.usedbtc}
      /> */}
      {props.symbol ? (
        <Balance
          availablebtc={props.availablebtc}
          symbol={props.symbol}
          totalbtc={props.totalbtc}
          usedbtc={props.usedbtc}
        />
      ) : (
        <></>
      )}
      <div>
        {props.orders.length ? <Orders orders={props.orders} /> : <></>}
      </div>
    </div>
  );
});

export default Instrument;
