import React from "react";

//material-ui
import TablePagination from "@material-ui/core/TablePagination";

const Pagination = (props) => {
  const {
    rows,
    handleChangePage,
    handleChangeRowsPerPage,
    page,
    rowsPerPage,
  } = props;

  return (
    <TablePagination
      rowsPerPageOptions={[10, 25, 100]}
      component="div"
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default Pagination;
