const express = require("express");
const passChange = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// password SALT
var salt = bcrypt.genSaltSync(10);

// CHANGE PASSWORD
passChange.post("/passwordChange", (req, res, next) => {
  console.log("XXXXXXXXXXXXXX:", req.body.id);
  const id = req.body.id;
  const newPassword = req.body.newPassword;
  const currentPassword = req.body.currentPassword;
  const newHashPass = bcrypt.hashSync(newPassword, salt);
  const toUpdate = { password: newHashPass };

  User.findById(id)
    .then((user) => {
      if (!bcrypt.compare(currentPassword, user.password)) {
        return res.status(401).json({ msg: "Invalid credentials" });
      } else if (bcrypt.compare(currentPassword, user.password)) {
        User.findByIdAndUpdate(id, toUpdate)
          .then(() => {
            res.status(200).json({ msg: "Password updated successfully!" });
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});

module.exports = passChange;
