import CreateData from "./CreateData";

const rows = [];

const Rows = (exchangeAccounts) => {
  rows.length = 0;
  exchangeAccounts.map((account) => {
    return rows.push(
      CreateData(
        account.exchangeName,
        account.identifier,
        account.key,
        account.secret,
        account._id
      )
    );
  });
};

export { Rows, rows };
