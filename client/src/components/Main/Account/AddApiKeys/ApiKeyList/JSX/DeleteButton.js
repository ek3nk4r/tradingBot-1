import React from "react";

// material-ui
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";

const DeleteButton = (props) => {
  const { row, handleSubmit } = props;

  return (
    <IconButton onClick={() => handleSubmit(row._id)}>
      <DeleteIcon color="secondary" />
    </IconButton>
  );
};

export default DeleteButton;
