const Columns = [
  {
    id: "symbol",
    label: "Symbol",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "side",
    label: "Side",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "type",
    label: "Type",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 100,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "cost",
    label: "Cost",
    minWidth: 100,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "price",
    label: "Price",
    minWidth: 100,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "time",
    label: "Time",
    minWidth: 100,
    align: "center",
  },
  {
    id: "id",
    label: "ID",
    minWidth: 100,
    align: "center",
  },
];

export default Columns;
