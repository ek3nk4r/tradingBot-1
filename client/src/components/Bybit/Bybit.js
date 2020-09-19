import React, { Component } from "react";
import axios from "axios";
import Trades from "./Trades";
import Orders from "./Orders";

class Bybit extends Component {
  state = {
    symbol: "",
    totalBTC: 0,
    usedBTC: 0,
    availableBTC: 0,
    openContracts: 0,
    realisedPnl: 0,
    unrealisedPnl: 0,
    trades: [],
    orders: [],
  };

  componentDidMount = () => {
    axios.get("/bybit/ticker").then((res) => {
      console.log("bybitData:", res.data);
      const symbol = res.data[0].symbol;
      const totalBTC = res.data[1].total.BTC;
      const usedBTC = res.data[1].used.BTC;
      const availableBTC = res.data[1].free.BTC;
      const openContracts = res.data[2].size;
      const realisedPnl = res.data[2].cum_realised_pnl;
      const unrealisedPnl = res.data[2].unrealised_pnl;
      const trades = res.data[3];
      const orders = res.data[4];

      this.setState({
        symbol: symbol,
        totalBTC: totalBTC,
        usedBTC: usedBTC,
        availableBTC: availableBTC,
        openContracts: openContracts,
        realisedPnl: realisedPnl,
        unrealisedPnl: unrealisedPnl,
        trades: trades,
        orders: orders,
      });
    });
  };

  render() {
    const {
      symbol,
      totalBTC,
      usedBTC,
      availableBTC,
      openContracts,
      realisedPnl,
      unrealisedPnl,
      trades,
      orders,
    } = this.state;

    return (
      <div>
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
  }
}

export default Bybit;
