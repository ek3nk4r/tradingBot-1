const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExchangeAccountSchema = new Schema({
  exchangeName: String,
  identifier: String,
  net: String,
  key: String,
  secret: [
    {
      type: Schema.Types.ObjectId,
      ref: "ApiSecret",
    },
  ],
});

const ExchangeAccount = mongoose.model(
  "ExchangeAccount",
  ExchangeAccountSchema
);
module.exports = ExchangeAccount;
