// material-ui
import CreateData from "./CreateData";

const rows = [];

const TableData = (rows, orders) => {
  rows.length = 0;
  orders.map((order) => {
    return rows.push(
      CreateData(
        order.symbol,
        order.side,
        order.type,
        order.amount,
        order.cost,
        order.average,
        order.status,
        order.datetime,
        order.id
      )
    );
  });
};

export { TableData, rows };
