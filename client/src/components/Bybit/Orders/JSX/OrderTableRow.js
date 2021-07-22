import React from "react";

// material-ui
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const OrderTableRow = (props) => {
  const { Columns } = props;

  return (
    <>
      <TableRow>
        {Columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{ minWidth: column.minWidth }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </>
  );
};

export default OrderTableRow;
