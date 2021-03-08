import React from "react";

// components
import DeleteButton from "./DeleteButton";
import Columns from "./Columns";

// material-ui
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const Body = (props) => {
  const { page, rowsPerPage, rows } = props;

  return (
    <TableBody>
      {rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .reverse()
        .map((row) => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
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
              <TableCell>
                <DeleteButton />
              </TableCell>
            </TableRow>
          );
        })}
    </TableBody>
  );
};

export default Body;
