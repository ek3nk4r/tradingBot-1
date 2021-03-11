import React, { useState, useEffect } from "react";
import { getKeys } from "../ApiKeyAxios";

// components
import TableHead from "./TableHeader";
import TableBody from "./Body";
import TablePagination from "./Pagination";
import { Rows, rows } from "./Rows";

// material-ui
import UseStyles from "./UseStyles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";

const ApiKeyList = (props) => {
  const { user } = props;
  const classes = UseStyles();

  const [state, setState] = useState({
    exchangeAccounts: [],
  });
  const { exchangeAccounts } = state;
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
        setState({
          exchangeAccounts: accounts,
        });
      })
      .catch((err) => {
        console.log("Error is: ", err);
      });
  }, []);

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead />
          <TableBody
            page={page}
            rowsPerPage={rowsPerPage}
            rows={rows}
            user={user}
          />
        </Table>
      </TableContainer>
      <TablePagination
        rows={rows}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        rowsPerPage={rowsPerPage}
        page={page}
      />
    </Paper>
  );
};

export default ApiKeyList;
