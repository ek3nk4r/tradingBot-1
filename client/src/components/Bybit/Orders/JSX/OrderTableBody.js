import React from "react";

// material-ui
import Columns from "../Material-ui/Columns";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";

const OrderTableBody = (props) => {
  const { rowsPerPage, page, rows } = props;

  return (
    <>
      {rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .reverse()
        .map((row) => {
          return (
            <TableBody>
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
            </TableBody>
          );
        })}
    </>
  );
};

export default OrderTableBody;
