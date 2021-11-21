import React from "react";

// material-ui
import TablePagination from "@material-ui/core/TablePagination";

const OrderTablePagination = (props) => {
  const { rows, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage } =
    props;

  return (
    <>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

export default OrderTablePagination;
