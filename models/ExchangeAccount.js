const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExchangeAccountSchema = new Schema({
  exchangeName: String,
  identifier: String,
  key: String,
  secret: String,
});

const ExchangeAccount = mongoose.model(
  "ExchangeAccount",
  ExchangeAccountSchema
);
module.exports = ExchangeAccount;
