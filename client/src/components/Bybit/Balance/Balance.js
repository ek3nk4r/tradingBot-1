import React from "react";
import "../../../Assets/stylesheets/balance.css";

// components
import InstrumentBalance from "./InstrumentBalance";
import TotalBalance from "./TotalBalance";
import AvailableBalance from "./AvailableBalance";
import UsedBalance from "./UsedBalance";

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
