import React from "react";

const Instrument = (props) => {
  return (
    <div>
      {" "}
      <div>
        <div>{symbol}</div>
      </div>
      <div>
        <div>Total: {totalBTC}</div>
        <div>Available: {availableBTC}</div>
        <div>Used: {usedBTC}</div>
      </div>
      <div>
        <div>Open Contracts: {openContracts}</div>
      </div>
      <div>
        <div>Realised PNL: {realisedPnl}</div>
        <div>Unrealised PNL: {unrealisedPnl}</div>
      </div>
      <div>
        {trades.length ? (
          trades.map((trade) => {
            return <Trades trade={trade} />;
          })
        ) : (
          <></>
        )}
      </div>
      <div>
        {orders.length ? (
          orders.map((order) => {
            return <Orders order={order} />;
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Instrument;
