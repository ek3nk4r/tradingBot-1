import React, { Component } from "react";
import axios from "axios";

//  Components
// import Instrument from "./Instrument";
import Trades from "./Trades";
import Orders from "./Orders";

// material-ui
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

class Bybit extends Component {
  _isMounted = false;

  state = {
    markets: [],
    marketNames: [],
    symbol: "",
    totalBTC: 0,
    usedBTC: 0,
    availableBTC: 0,
    openContracts: 0,
    realisedPnl: 0,
    unrealisedPnl: 0,
    trades: [],
    orders: [],
    value: 0,
  };

  componentDidMount = () => {
    this._isMounted = true;
    axios.get("/bybit/tickers").then((res) => {
      console.log("bybitExchangeData:", res.data);
      const markets = res.data[1];
      const marketNames = Object.keys(markets)
        .map((key) => {
          return markets[key];
        })
        .map((market) => {
          return market.info.name;
        });
      const totalBTC = res.data[3].total.BTC;
      const usedBTC = res.data[3].used.BTC;
      const availableBTC = res.data[3].free.BTC;
      const realisedPnl = res.data[3].cum_realised_pnl;
      const unrealisedPnl = res.data[3].unrealised_pnl;

      console.log(
        Object.keys(markets)
          .map((key) => {
            return markets[key];
          })
          .map((market) => {
            return market.info.name;
          })
      );

      this.setState({
        markets: markets,
        marketNames: marketNames,
        totalBTC: totalBTC,
        usedBTC: usedBTC,
        availableBTC: availableBTC,
        realisedPnl: realisedPnl,
        unrealisedPnl: unrealisedPnl,
      });
    });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
    // console.log(event);
    // axios.post("/bybit/ticker", event).then((res) => {
    //   console.log("bybitTickerData:", res.data);
    //   const symbol = res.data[0].symbol;
    //   const openContracts = res.data[2].size;
    //   const trades = res.data[3];
    //   const orders = res.data[4];
    //   const value = this.state.markets.indexof(res.data[0].symbol);

    //   console.log(value);

    //   this.setState({
    //     symbol: symbol,
    //     openContracts: openContracts,
    //     trades: trades,
    //     orders: orders,
    //     value: value,
    //   });
    // });
  };

  // clickHandle = (event) => {
  //   console.log(event);
  //   axios.post("/bybit/ticker", { name: event }).then((res) => {
  //     console.log("bybitTickerData:", res.data);
  //     const symbol = res.data[0].symbol;
  //     const openContracts = res.data[2].size;
  //     const trades = res.data[3];
  //     const orders = res.data[4];
  //     // const value = this.state.markets.indexof(res.data[0].symbol);

  //     // console.log(value);

  //     this.setState({
  //       symbol: symbol,
  //       openContracts: openContracts,
  //       trades: trades,
  //       orders: orders,
  //       // value: value,
  //     });
  //   });
  // };

  render() {
    const {
      markets,
      marketNames,
      symbol,
      totalBTC,
      usedBTC,
      availableBTC,
      openContracts,
      realisedPnl,
      unrealisedPnl,
      trades,
      orders,
      value,
    } = this.state;

    console.log(marketNames);

    // console.log(
    //   Object.entries(markets).map((market) => {
    //     return market[1].info.name;
    //   })
    // );

    return (
      <div>
        <Paper square>
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleChange}
            aria-label="disabled tabs example"
          >
            {marketNames.length
              ? marketNames.map((market) => {
                  console.log(market);
                  {
                    return (
                      <Tab
                        label={market}
                        totalbtc={totalBTC}
                        usedbtc={usedBTC}
                        availablebtc={availableBTC}
                        // onClick={() =>
                        //   this.clickHandle(
                        //     Object.entries(markets).map((market) => {
                        //       return market[1].info.name;
                        //     })
                        //   )
                        // }
                      >
                        {/* <Instrument /> */}
                      </Tab>
                    );
                  }
                })
              : 0}
          </Tabs>
        </Paper>
      </div>
    );
  }
}

export default Bybit;
