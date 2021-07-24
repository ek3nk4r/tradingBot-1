import React from "react";

// components
import TableHead from "./TableHeader";
import TableBody from "./Body";
import TablePagination from "./Pagination";
import UseStyles from "../Material-ui/UseStyles";

// material-ui
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";

const KeyListTable = (props) => {
  const {
    page,
    rowsPerPage,
    rows,
    handleChangePage,
    handleChangeRowsPerPage,
    setExchangeAccounts,
  } = props;

  const classes = UseStyles();

  return (
    <>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead />
            <TableBody
              page={page}
              rowsPerPage={rowsPerPage}
              rows={rows}
              setExchangeAccounts={setExchangeAccounts}
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
    </>
  );
};

export default KeyListTable;
