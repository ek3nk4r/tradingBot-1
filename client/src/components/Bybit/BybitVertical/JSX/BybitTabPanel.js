import React from "react";

//  Components
import Instrument from "../../Instrument/Instrument";
import TabPanel from "../../../VerticalTabs/TabPanel";

const BybitTabPanel = (props) => {
  const { value, symbol, user } = props;

  return (
    <>
      <TabPanel value={value} index={value}>
        {" "}
        {symbol ? <Instrument symbol={symbol} user={user} /> : <></>}
      </TabPanel>
    </>
  );
};

export default BybitTabPanel;
