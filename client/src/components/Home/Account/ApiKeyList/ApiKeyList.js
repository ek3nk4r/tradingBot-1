import React, { useState, useEffect } from "react";
import { getKeys } from "../ApiKeyAxios";

// material-ui
// import { makeStyles } from "@material-ui/core/styles";
import UseStyles from "./UseStyles";
import Columns from "./Columns";
import CreateData from "./CreateData";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const rows = [];

const ApiKeyList = () => {
  const [state, setState] = useState({
    exchangeAccounts: [],
    newExchangeAccount: false,
  });
  const { exchangeAccounts, newExchangeAccount } = state;
  console.log(exchangeAccounts);

  //********************************/
  //**********Table Data************/
  rows.length = 0;
  exchangeAccounts.map((account) => {
    return rows.push(
      CreateData(
        account.exchangeName,
        account.identifier,
        account.key,
        account.secret
      )
    );
  });
  //********************************/
  //********************************/
  const classes = UseStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
        console.log("XXXXXXXXXXXXXXX", res);
        const accounts = res.data.exchangeAccount;
        console.log(accounts);
        // if (newExchangeAccount === true) {
        setState({
          exchangeAccounts: accounts,
          newExchangeAccount: false,
        });
        console.log(exchangeAccounts);
        // }
      })
      .catch((err) => {
        console.log("Error is: ", err);
      });
  }, [newExchangeAccount]);

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {Columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {Columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ApiKeyList;
