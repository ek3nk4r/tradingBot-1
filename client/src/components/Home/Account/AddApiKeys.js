import React, { useState } from "react";
import AddKeys from "./AddKeys";
import ApiKeyList from "./ApiKeyList/ApiKeyList";

const AddApiKeys = (props) => {
  return (
    <div>
      <div className="flex flex-container center col">
        <div className="box">
          <AddKeys {...props} />
        </div>
      </div>
      <ApiKeyList />
    </div>
  );
};

export default AddApiKeys;
