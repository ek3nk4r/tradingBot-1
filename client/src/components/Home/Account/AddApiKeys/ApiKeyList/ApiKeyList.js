import React, { useState, useEffect } from "react";
import { getKeys } from "../ApiKeyAxios";

// components
import KeyListTable from "./JSX/KeyListTable";
import { Rows, rows } from "./Material-ui/Rows";

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

  useEffect(() => {
    getKeys()
      .then((res) => {
        const accounts = res.data.exchangeAccount;
        setExchangeAccounts(accounts);
      })
      .catch((err) => {
        console.log("Error is: ", err);
      });
  }, []);

  return (
    <>
      <KeyListTable
        page={page}
        rowsPerPage={rowsPerPage}
        rows={rows}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        setExchangeAccounts={setExchangeAccounts}
      />
    </>
  );
};

export default ApiKeyList;
