import React from "react";

// material-ui
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const columns = [
  {
    id: "symbol",
    label: "Symbol",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "side",
    label: "Side",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "type",
    label: "Type",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 100,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "cost",
    label: "Cost",
    minWidth: 100,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "price",
    label: "Price",
    minWidth: 100,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "time",
    label: "Time",
    minWidth: 100,
    align: "center",
  },
  {
    id: "id",
    label: "ID",
    minWidth: 100,
    align: "center",
  },
];

const createData = (
  symbol,
  side,
  type,
  amount,
  cost,
  price,
  status,
  time,
  id
) => {
  return { symbol, side, type, amount, cost, price, status, time, id };
};

const rows = [];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 1000,
  },
});

const Orders = React.memo((props) => {
  //********************************/
  //**********Table Data************/
  rows.length = 0;
  props.orders.map((order) => {
    return rows.push(
      createData(
        order.symbol,
        order.side,
        order.type,
        order.amount,
        order.cost,
        order.price,
        order.status,
        order.datetime,
        order.id
      )
    );
  });
  //********************************/
  //********************************/

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
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
                    {columns.map((column) => {
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
});

export default Orders;
