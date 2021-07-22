import React from "react";

// components
import Balance from "../../Balance/Balance";
import InstrumentOrders from "./InstrumentOrders";

const InstrumentBalance = (props) => {
  const { symbol, balance, available, used, orders } = props;

  return (
    <>
      <div>
        {symbol ? (
          <Balance
            symbol={symbol}
            balance={balance}
            available={available}
            used={used}
          />
        ) : (
          <></>
        )}
        <InstrumentOrders orders={orders} />
      </div>
    </>
  );
};

export default InstrumentBalance;
