import React, { useState, useEffect } from "react";
import { deleteKeys } from "./ApiKeyAxios";

// components
import UseStyles from "./AddKeys/Material-ui/UseStyles";
import SendKeys from "./AddKeys/AddKeysFunctions/SendKeys";
import { Rows, rows } from "./ApiKeyList/Material-ui/Rows";
import GetKeys from "./ApiKeyList/ApiKeyList Functions/GetKeys";
import AddKeysForm from "./AddKeys/JSX/AddKeysForm";
import KeyListTable from "./ApiKeyList/JSX/KeyListTable";

const AddApiKeys = (props) => {
  const { _id } = props.user;
  const classes = UseStyles();

  const [state, setState] = useState({
    apiKey: "",
    secret: "",
    exchange: "",
    net: "",
    identifier: "",
  });

  const { apiKey, secret, exchange, identifier, net } = state;

  const handleChange = (event) => {
    event.persist();
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [exchangeAccounts, setExchangeAccounts] = useState([]);

  const handleNewKeysSubmit = (event) => {
    event.preventDefault();
    SendKeys(
      _id,
      exchange,
      identifier,
      apiKey,
      secret,
      net,
      setState,
      setExchangeAccounts
    );
  };

  Rows(exchangeAccounts);

  const handleChangePage = (event, newPage) => {
    event.preventDefault();
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    event.preventDefault();
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSubmit = (id) => {
    deleteKeys(id)
      .then(() => {
        GetKeys(setExchangeAccounts);
      })
      .catch((err) => {
        console.log("Error is: ", err);
      });
  };

  useEffect(() => {
    GetKeys(setExchangeAccounts);
  }, []);

  return (
    <div>
      <div className="flex flex-container center col">
        <div className="box">
          <AddKeysForm
            {...props}
            handleNewKeysSubmit={handleNewKeysSubmit}
            identifier={identifier}
            handleChange={handleChange}
            exchange={exchange}
            classes={classes}
            net={net}
            apiKey={apiKey}
            secret={secret}
          />
        </div>
      </div>
      <KeyListTable
        rows={rows}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSubmit={handleSubmit}
        setExchangeAccounts={setExchangeAccounts}
      />
    </div>
  );
};

export default AddApiKeys;
