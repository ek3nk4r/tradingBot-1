import React from "react";

// material-ui
import Columns from "../Material-ui/Columns";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const OrderTableBody = (props) => {
  const { rowsPerPage, page, rows } = props;

  return (
    <>
      {rows
        .reverse()
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
    </>
  );
};

export default OrderTableBody;
