import React from "react";

// components
import Orders from "../../Orders/Orders";

const InstrumentOrders = (props) => {
  const { orders } = props;

  return (
    <>
      <div>{orders.length ? <Orders orders={orders} /> : <></>}</div>
    </>
  );
};

export default InstrumentOrders;
