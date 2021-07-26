import React, { useState, useEffect } from "react";
import { deleteKeys } from "../ApiKeyAxios";

// components
import KeyListTable from "./JSX/KeyListTable";
import { Rows, rows } from "./Material-ui/Rows";
import GetKeys from "./ApiKeyList Functions/GetKeys";

const ApiKeyList = (props) => {
  const { exchangeAccounts, setExchangeAccounts } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
    deleteKeys(id);
    GetKeys(setExchangeAccounts);
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
