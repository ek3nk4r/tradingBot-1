import React from "react";

// components
import Columns from "./Columns";

// material-ui
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const TableHeader = () => {
  return (
    <TableHead>
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
        <TableCell>Delete</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
