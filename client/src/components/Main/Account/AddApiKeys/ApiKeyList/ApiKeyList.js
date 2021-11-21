import React, { useState, useEffect } from "react";
import { deleteKeys } from "../ApiKeyAxios";

// components
import KeyListTable from "./JSX/KeyListTable";
import { Rows, rows } from "./Material-ui/Rows";
import GetKeys from "./ApiKeyList Functions/GetKeys";

const ApiKeyList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [exchangeAccounts, setExchangeAccounts] = useState([]);

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
    <>
      <KeyListTable
        page={page}
        rowsPerPage={rowsPerPage}
        rows={rows}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSubmit={handleSubmit}
        setExchangeAccounts={setExchangeAccounts}
      />
    </>
  );
};

export default ApiKeyList;
