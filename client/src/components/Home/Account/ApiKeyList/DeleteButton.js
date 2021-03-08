import React from "react";

// material-ui
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";

const DeleteButton = () => {
  const deleteIcon = (
    <IconButton onClick={console.log("delete")}>
      <DeleteIcon color="secondary" />
    </IconButton>
  );
  return <div>{deleteIcon}</div>;
};

export default DeleteButton;
