import React from "react";
import Orders from "./Orders";
import Balance from "./Balance";

const Instrument = React.memo((props) => {
  console.log(props);
  return (
    <div>
      {/* <Balance
        availablebtc={props.availablebtc}
        symbol={props.symbol}
        totalbtc={props.totalbtc}
        usedbtc={props.usedbtc}
      /> */}
      {/* {props.balances.length ? (
        props.balances.filter((el) => {
          console.log(el);
          if (props.symbol === el) {
            console.log(el);
            return <Balance balances={props.balances} symbol={el} />;
          }
        })
      ) : (
        <Balance balances={props.balances} symbol={props.symbol} />
      )} */}
      {/* {props.symbol ? (
        <Balance balances={props.balances} symbol={props.symbol} />
      ) : (
        <></>
      )} */}
      <div>
        {props.orders.length ? <Orders orders={props.orders} /> : <></>}
      </div>
    </div>
  );
});

export default Instrument;
