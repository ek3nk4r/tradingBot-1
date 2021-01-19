import React, { useState, useEffect } from "react";
import axios from "axios";

//  Components
import Instrument from "../Instrument";
import UseStyles from "./UseStyles";
import TabPanel from "./TabPanel";
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
  const getClosedOrders = (clickedSymbol) => {
    axios
      .post("/bybit/closedOrders", { name: clickedSymbol })
      .then((res) => {
        console.log(res);
        const newOrders = [...res.data[1]];

        setOrders(newOrders);
      })
      .catch((err) => {
        console.log("Error is: ", err);
      });
  };
  // ************************************************************
  // ************************************************************

  useEffect(() => {
    getClosedOrders(symbol);
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
        />
      </TabPanel>
    </div>
  );
};

export default BybitVertical;
