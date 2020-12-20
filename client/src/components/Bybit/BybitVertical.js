import React, { useState, useEffect } from "react";
import axios from "axios";

//  Components
import Instrument from "./Instrument";
import UseStyles from "./BybitUseStyles";
import TabPanel from "./BybitTabPanel";
import A11yProps from "./A11yProps";

// material-ui
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

A11yProps();

const BybitVertical = () => {
  // material_ui ************************************************
  // ************************************************************
  const classes = UseStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
    const { innerHTML } = event.target;
    setSymbol(innerHTML);
  };
  // ************************************************************
  // ************************************************************

  // State ******************************************************
  // ************************************************************
  const [marketNames, setMarketNames] = useState([]);
  const [totalBTC, setTotalBTC] = useState(0);
  const [usedBTC, setUsedBTC] = useState(0);
  const [availableBTC, setAvailableBTC] = useState(0);
  const [balances, setBalances] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [orders, setOrders] = useState([]);
  // ************************************************************
  // ************************************************************

  //  API  calls ************************************************
  // ************************************************************
  const getTicker = (clickedSymbol) => {
    axios.post("/bybit/ticker", { name: clickedSymbol }).then((res) => {
      console.log(res);
      const newSymbol = res.data[0];
      const newOrders = [...res.data[1]];
      const totalBTC = res.data[2].total.BTC;
      const usedBTC = res.data[2].used.BTC;
      const availableBTC = res.data[2].free.BTC;
      const balances = res.data[2].info.result;

      // console.log(newOrders);

      setOrders(newOrders);
      setTotalBTC(totalBTC);
      setUsedBTC(usedBTC);
      setAvailableBTC(availableBTC);
      setBalances(balances);

      if (symbol !== newSymbol) {
        setSymbol(newSymbol);
        // setOrders(newOrders);
      } else if (symbol === newSymbol) {
        return null;
      }
    });
  };

  const getTickers = () => {
    axios.get("/bybit/tickers").then((res) => {
      const markets = res.data[1];
      const marketNames = Object.keys(markets)
        .map((key) => {
          return markets[key];
        })
        .map((market) => {
          return market.symbol;
        });

      setMarketNames(marketNames);
    });
  };
  // ************************************************************
  // ************************************************************

  useEffect(() => {
    getTicker(symbol);
  }, [symbol]);

  useEffect(() => {
    getTickers();
  }, []);

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs"
        className={classes.tabs}
      >
        {marketNames.length
          ? marketNames.map((market, index) => {
              return <Tab key={index} label={market} {...A11yProps(index)} />;
            })
          : 0}
      </Tabs>
      <TabPanel value={value} index={value}>
        {" "}
        <Instrument
          balances={balances}
          availablebtc={availableBTC}
          orders={orders}
          symbol={symbol}
          totalbtc={totalBTC}
          usedbtc={usedBTC}
        />
      </TabPanel>
    </div>
  );
};

export default BybitVertical;
