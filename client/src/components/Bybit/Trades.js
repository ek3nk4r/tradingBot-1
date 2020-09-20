import React from "react";

const Trades = (props) => {
  const { trade } = props;

  return (
    <div key={trade.id}>
      <div>
        <div>Side: {trade.side}</div>
      </div>
      <div>
        <div>Amount: {trade.amount}</div>
      </div>
      <div>
        <div>Cost: {trade.cost}</div>
      </div>
      <div>
        <div>Price: {trade.price}</div>
      </div>
      <div>
        <div>Fills: {trade.info.nth_fill}</div>
      </div>
      <div>
        <div>Time: {trade.datetime}</div>
      </div>
      <div>
        <div>Order: {trade.order}</div>
      </div>
    </div>
  );
};

export default Trades;
