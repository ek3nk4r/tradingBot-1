import React from "react";
import "../../../Assets/stylesheets/balance.css";

// components
import InstrumentBalance from "./JSX/InstrumentBalance";
import TotalBalance from "./JSX/TotalBalance";
import AvailableBalance from "./JSX/AvailableBalance";
import UsedBalance from "./JSX/UsedBalance";

const Balance = React.memo((props) => {
  const { symbol, balance, available, used } = props;

  return (
    <div className="balance-container">
      <InstrumentBalance symbol={symbol} />
      <div className="balances">
        <TotalBalance balance={balance} />
        <AvailableBalance available={available} />
        <UsedBalance used={used} />
      </div>
    </div>
  );
});

export default Balance;
