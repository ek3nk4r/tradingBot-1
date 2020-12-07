import React from "react";

const Instrument = (props) => {
  console.log(props);
  return (
    <div></div>
    // <>
    //   {/* {" "} */}
    //   <div>
    //     <div>{props.symbol}</div>
    //   </div>
    //   <div>
    //     <div>Total: {props.totalBTC}</div>
    //     <div>Available: {props.availableBTC}</div>
    //     <div>Used: {props.usedBTC}</div>
    //   </div>
    //   <div>
    //     <div>Open Contracts: {props.openContracts}</div>
    //   </div>
    //   <div>
    //     <div>Realised PNL: {props.realisedPnl}</div>
    //     <div>Unrealised PNL: {props.unrealisedPnl}</div>
    //   </div>
    //   <div>
    //     {props.trades.length ? (
    //       props.trades.map((trade) => {
    //         {
    //           /* return <Trades trade={props.trade} />; */
    //         }
    //       })
    //     ) : (
    //       <></>
    //     )}
    //   </div>
    //   <div>
    //     {props.orders.length ? (
    //       props.orders.map((order) => {
    //         {
    //           /* return <Orders order={props.order} />; */
    //         }
    //       })
    //     ) : (
    //       <></>
    //     )}
    //   </div>
    // </>
  );
};

export default Instrument;
