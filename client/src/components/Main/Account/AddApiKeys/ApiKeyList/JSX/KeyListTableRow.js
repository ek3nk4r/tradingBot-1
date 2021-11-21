import React from "react";

// components
import DeleteButton from "./DeleteButton";
import KeyListColumnCell from "./KeyListColumnCell";

// material-ui
import Columns from "../Material-ui/Columns";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const KeyListTableRow = (props) => {
  const { row, handleSubmit } = props;

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      {Columns.map((column) => {
        const value = row[column.id];
        return (
          <KeyListColumnCell key={column.id} column={column} value={value} />
        );
      })}
      <TableCell>
        <DeleteButton row={row} handleSubmit={handleSubmit} />
      </TableCell>
    </TableRow>
  );
};

export default KeyListTableRow;
