const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApiSecretSchema = new Schema({
  iv: String,
  content: String,
});

const ApiSecret = mongoose.model("ApiSecret", ApiSecretSchema);
module.exports = ApiSecret;
