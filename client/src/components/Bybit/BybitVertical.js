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

const BybitVertical = (props) => {
  const initialOrders = [];

  // **** STATE *************************************************
  // ************************************************************
  // const [btcBalance, setBtcBalance] = useState({
  //   totalBTC: 0,
  //   usedBTC: 0,
  //   availableBTC: 0,
  // });
  const [balances, setBalances] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [orders, setOrders] = useState([...initialOrders]);
  // ************************************************************
  // ************************************************************

  // **** material_ui *******************************************
  // ************************************************************
  const classes = UseStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
    const { innerHTML } = event.target;
    if (innerHTML !== symbol) {
      return setSymbol(innerHTML);
    } else {
      return null;
    }
  };
  // ************************************************************
  // ************************************************************

  // **** API CALL *********************************************
  // ************************************************************
  const getTicker = (clickedSymbol) => {
    axios
      .post("/bybit/ticker", { name: clickedSymbol })
      .then((res) => {
        console.log(res);
        const newOrders = [...res.data[1]];
        // const totalBTC = res.data[2].total.BTC;
        // const usedBTC = res.data[2].used.BTC;
        // const availableBTC = res.data[2].free.BTC;
        const balances = res.data[2].info.result;

        console.log(typeof balances);

        setOrders(newOrders);
        // setBtcBalance({
        //   ...btcBalance,
        //   totalBTC: 0,
        //   usedBTC: 0,
        //   availableBTC: 0,
        // });
        setBalances(balances);
      })
      .catch((err) => {
        console.log("Error is: ", err);
      });
  };
  // ************************************************************
  // ************************************************************

  useEffect(() => {
    getTicker(symbol);
  }, [symbol]);

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
        {props.marketNames.length
          ? props.marketNames.map((market, index) => {
              return <Tab key={index} label={market} {...A11yProps(index)} />;
            })
          : 0}
      </Tabs>
      <TabPanel value={value} index={value}>
        {" "}
        <Instrument
          // btcBalance={btcBalance}
          orders={orders}
          symbol={symbol}
          balances={balances}
        />
      </TabPanel>
    </div>
  );
};

export default BybitVertical;
