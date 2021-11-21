import React from "react";

// components
import BybitVertical from "../../../Bybit/BybitVertical/BybitVertical";
import TabPanel from "../Material-ui/TabPanel";

// material_ui
import PropTypes from "prop-types";

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const HomeTabPanel = (props) => {
  const { value, marketNames, user } = props;

  return (
    <>
      <TabPanel value={value} index={value}></TabPanel>
      {value === value && (
        <BybitVertical marketNames={marketNames} user={user} />
      )}
    </>
  );
};

export default HomeTabPanel;
