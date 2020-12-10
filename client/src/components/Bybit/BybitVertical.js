import React, { useState, useEffect } from "react";
import axios from "axios";

//  Components
import Instrument from "./Instrument";

// material-ui
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const BybitVertical = () => {
  // ******************************************
  // material_ui ******************************
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // material_ui ******************************
  // ******************************************

  const [markets, setMarkets] = useState([]);
  const [marketNames, setMarketNames] = useState([]);
  const [totalBTC, setTotalBTC] = useState(0);
  const [usedBTC, setUsedBTC] = useState(0);
  const [availableBTC, setAvailableBTC] = useState(0);
  const [realisedPnl, setRealisedPnl] = useState(0);
  const [unrealisedPnl, setUnrealisedPnl] = useState(0);
  const [symbol, setSymbol] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    console.log("FIRST RENDER");

    axios.get("/bybit/tickers").then((res) => {
      console.log(res);
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

      setMarkets(markets);
      setMarketNames(marketNames);
      setTotalBTC(totalBTC);
      setUsedBTC(usedBTC);
      setAvailableBTC(availableBTC);
      setRealisedPnl(realisedPnl);
      setUnrealisedPnl(unrealisedPnl);
    });
  }, []);

  const clickHandle = (event) => {
    const { name } = event.target;

    axios.post("/bybit/ticker", { name: name }).then((res) => {
      console.log("bybitTickerData:", res.data);
      const symbol = res.data[0].symbol;
      const orders = res.data[1];

      setSymbol(symbol);
      setOrders(orders);
    });
  };

  console.log(orders);

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
              return (
                <Tab
                  key={index}
                  label={market}
                  onClick={clickHandle}
                  {...a11yProps(index)}
                />
              );
            })
          : 0}
      </Tabs>
      <TabPanel value={value} index={value}>
        <Instrument
          totalbtc={totalBTC}
          usedbtc={usedBTC}
          availablebtc={availableBTC}
          symbol={symbol}
          realisedpnl={realisedPnl}
          unrealisedpnl={unrealisedPnl}
          orders={orders}
        />
      </TabPanel>
    </div>
  );
};

export default BybitVertical;
