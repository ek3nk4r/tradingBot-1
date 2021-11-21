import React from "react";

// components
import KeyListTableRow from "./KeyListTableRow";

// material-ui
import TableBody from "@material-ui/core/TableBody";

const Body = (props) => {
  const { page, rowsPerPage, rows, handleSubmit } = props;

  return (
    <TableBody>
      {rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .reverse()
        .map((row) => {
          return (
            <KeyListTableRow
              key={row._id}
              row={row}
              handleSubmit={handleSubmit}
            />
          );
        })}
    </TableBody>
  );
};

export default Body;
