import React from "react";

// material-ui
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";

const DeleteButton = (props) => {
  const { row, handleSubmit } = props;

  const deleteIcon = (
    <IconButton onClick={() => handleSubmit(row._id)}>
      <DeleteIcon color="secondary" />
    </IconButton>
  );
  return <div>{deleteIcon}</div>;
};

export default DeleteButton;
