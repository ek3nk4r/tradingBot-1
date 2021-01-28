const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
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

const User = mongoose.model("User", UserSchema);
module.exports = User;
