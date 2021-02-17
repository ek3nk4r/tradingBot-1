import React from "react";
import AddKeys from "./AddKeys";
// import ApiKeyList from "./ApiKeyList";

const AddApiKeys = (props) => {
  return (
    <div className="flex flex-container center col">
      <div className="box">
        <AddKeys {...props} />
      </div>
    </div>
  );
};

export default AddApiKeys;
