const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  emailConfirmed: {
    type: Boolean,
    default: false,
  },
  password: String,
  newPassConfirmed: {
    type: Boolean,
    default: true,
  },
  googleId: String,
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
  timestamps: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
