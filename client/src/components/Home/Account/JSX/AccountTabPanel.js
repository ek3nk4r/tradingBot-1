import React from "react";

// components
import TabPanel from "../../../VerticalTabs/TabPanel";
import AddApiKeys from "../AddApiKeys/AddApiKeys";
import ChangePassword from "../ChangePassword/ChangePassword";

// material_ui
import PropTypes from "prop-types";

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const AccountTabPanel = (props) => {
  const { value, user, exchangeAccounts, setExchangeAccounts } = props;

  return (
    <>
      <TabPanel value={value} index={0}></TabPanel>
      {value === 0 && <ChangePassword {...props} user={user} />}
      {value === 1 && (
        <AddApiKeys
          {...props}
          user={user}
          exchangeAccounts={exchangeAccounts}
          setExchangeAccounts={setExchangeAccounts}
        />
      )}
    </>
  );
};

export default AccountTabPanel;
