import React from "react";

// material-ui
import TableCell from "@material-ui/core/TableCell";

const KeyListColumnCell = (props) => {
  const { column, value } = props;

  return (
    <TableCell align={column.align}>
      {column.format && typeof value === "number"
        ? column.format(value)
        : value}
    </TableCell>
  );
};

export default KeyListColumnCell;
