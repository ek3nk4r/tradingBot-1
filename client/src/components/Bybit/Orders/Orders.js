import React, { useState, memo } from "react";
import { TableData, rows } from "./Material-ui/TableData";

// components
import OrderTable from "./JSX/OrderTable";

// material-ui
import UseStyles from "./Material-ui/UseStyles";

const Orders = memo((props) => {
  const { orders } = props;

  TableData(rows, orders);

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

  return (
    <>
      <OrderTable
        classes={classes}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
});

export default Orders;
