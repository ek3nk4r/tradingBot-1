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
  //  State ************************************************
  // ************************************************************
  const [marketNames, setMarketNames] = useState([]);
  const [totalBTC, setTotalBTC] = useState(0);
  const [usedBTC, setUsedBTC] = useState(0);
  const [availableBTC, setAvailableBTC] = useState(0);
  const [balances, setBalances] = useState([]);
  // ************************************************************
  // ************************************************************

  //  API  calls ************************************************
  // ************************************************************
  const getTicker = (innerHTML) => {
    axios.post("/bybit/ticker", { name: innerHTML }).then((res) => {
      const symbol = res.data[0];
      const orders = res.data[1];

      setSymbol(symbol);
      setOrders(orders);
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
      const totalBTC = res.data[3].total.BTC;
      const usedBTC = res.data[3].used.BTC;
      const availableBTC = res.data[3].free.BTC;
      const balances = res.data[3].info.result;

      setMarketNames(marketNames);
      setTotalBTC(totalBTC);
      setUsedBTC(usedBTC);
      setAvailableBTC(availableBTC);
      setBalances(balances);
    });
  };
  // ************************************************************
  // ************************************************************

  // material_ui ************************************************
  // ************************************************************
  const classes = UseStyles();
  const [value, setValue] = React.useState(0);
  const [symbol, setSymbol] = useState("");
  const [orders, setOrders] = useState([]);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
    const { innerHTML } = event.target;

    getTicker(innerHTML);
  };
  // ************************************************************
  // ************************************************************

  useEffect(() => {
    console.log("*****FIRST RENDER*****");
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
