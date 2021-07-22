import React from "react";
import { rows } from "../TableData";

// components
import OrderTableRow from "./OrderTableRow";
import OrderTableBody from "./OrderTableBody";
import OrderTablePagination from "./OrderTablePagination";

// material-ui
import Columns from "../Material-ui/Columns";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";

const OrderTable = (props) => {
  const {
    classes,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = props;

  return (
    <>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <OrderTableRow Columns={Columns} />
            </TableHead>
            <OrderTableBody rowsPerPage={rowsPerPage} page={page} rows={rows} />
          </Table>
        </TableContainer>
        <OrderTablePagination
          rows={rows}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default OrderTable;
