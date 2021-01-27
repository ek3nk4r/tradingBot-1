const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExchangeAccountSchema = new Schema({
  exchangeName: String,
  accountIdentifier: String, // a user input for identifying a specific account (maybe they have multiple accounts at an exchange)
  key: String,
  secret: String,
});

const ExchangeAccount = mongoose.model(
  "ExchangeAccount",
  ExchangeAccountSchema
);
module.exports = ExchangeAccount;
