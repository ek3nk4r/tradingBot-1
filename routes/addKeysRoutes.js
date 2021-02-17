const express = require("express");
const addKeysRoutes = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const ExchangeAccount = require("../models/ExchangeAccount");

// password SALT
var salt = bcrypt.genSaltSync(10);

// ADD API KEYS
addKeysRoutes.post("/addApiKeys", (req, res, next) => {
  const id = req.body.id;
  const key = req.body.key.toString();
  const secret = req.body.secret.toString();
  const exchangeName = req.body.exchange;
  const identifier = req.body.identifier;
  const newHashPass = bcrypt.hashSync(secret, salt);
  const exchangeAccount = {
    exchangeName: exchangeName,
    identifier: identifier,
    key: key,
    secret: newHashPass,
  };

  ExchangeAccount.create({ ...exchangeAccount })
    .then((res) => {
      const exchangeAccountId = res._id;
      // ADD PRODUCT TO FAVORITES LIST OF USER
      // $PUSH ADDS TO MONGO ARRAY
      User.findByIdAndUpdate(req.user._id, {
        $push: { exchangeAccount: exchangeAccountId },
      })
        .then((res) => {
          console.log(res);
          // console.log(res.exchangeAccount[res.exchangeAccount.length - 1]);
          // console.log("all good");
          // res.json({ message: "Exchange Account successfully added." });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));

  // User.findById(id)
  //   .then((user) => {
  //     console.log(user);

  //     if (!user) {
  //       res.status(400).json({ message: "User not found." });
  //       return;
  //     } else if (user) {
  //       console.log(id, keysToAdd);
  //       User.findByIdAndUpdate(id, keysToAdd)
  //         .then(() => {
  //           res.status(200).json({ message: "API keys added successfully!" });
  //         })
  //         .catch((err) => console.log(err));
  //     }
  //   })
  //   .catch((err) => console.log(err));
});

module.exports = addKeysRoutes;
