import React from "react";
import { deleteKeys, getKeys } from "../../ApiKeyAxios";

// material-ui
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";

const DeleteButton = (props) => {
  const { row, setExchangeAccounts } = props;

  const handleSubmit = (id) => {
    deleteKeys(id);
    getKeys()
      .then((res) => {
        const accounts = res.data.exchangeAccount;
        setExchangeAccounts(accounts);
      })
      .catch((err) => {
        console.log("Error is: ", err);
      });
  };

  const deleteIcon = (
    <IconButton onClick={() => handleSubmit(row._id)}>
      <DeleteIcon color="secondary" />
    </IconButton>
  );
  return <div>{deleteIcon}</div>;
};

export default DeleteButton;
