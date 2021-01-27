const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  exchangeAccount: [
    {
      type: Schema.Types.ObjectId,
      ref: "ExchangeAccount",
    },
  ],
  userType: {
    type: String,
    enum: ["user", "admin"],
  },
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
