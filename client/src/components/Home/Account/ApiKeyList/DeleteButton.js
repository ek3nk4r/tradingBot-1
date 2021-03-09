import React from "react";
import { deleteKeys } from "../ApiKeyAxios";

// material-ui
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";

const DeleteButton = (props) => {
  const { row } = props;

  const handleDelete = (id) => {
    console.log(typeof id);
    deleteKeys(id);
  };

  const deleteIcon = (
    <IconButton onClick={() => handleDelete(row._id)}>
      <DeleteIcon color="secondary" />
    </IconButton>
  );
  return <div>{deleteIcon}</div>;
};

export default DeleteButton;
