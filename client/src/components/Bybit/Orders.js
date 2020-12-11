import React from "react";

const Orders = React.memo((props) => {
  console.log(props);
  const { order } = props;

  return (
    <div key={props.order.id}>
      <div>-----------------------------------------------------</div>
      <div>
        <div>Side: {order.side}</div>
      </div>
      <div>
        <div>Amount: {order.amount}</div>
      </div>
      <div>
        <div>Cost: {order.cost}</div>
      </div>
      <div>
        <div>Price: {order.price}</div>
      </div>
      <div>
        <div>Status: {order.status}</div>
      </div>
      <div>
        <div>Time: {order.datetime}</div>
      </div>
      <div>-----------------------------------------------------</div>
    </div>
  );
});

export default Orders;
