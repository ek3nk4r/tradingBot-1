const express = require("express");
const addKeysRoutes = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const ExchangeAccount = require("../models/ExchangeAccount");

// password SALT
var salt = bcrypt.genSaltSync(10);

// ADD API KEYS
addKeysRoutes.post("/addApiKeys", (req, res, next) => {
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
    .then((response) => {
      const exchangeAccountId = response._id;
      // ADD API KEYS TO LIST OF USERS EXCHANGE ACCOUNTS
      // $PUSH ADDS TO MONGO ARRAY
      User.findByIdAndUpdate(req.user._id, {
        $push: { exchangeAccount: exchangeAccountId },
      })
        .then(() => {
          res.json({ msg: "API Keys successfully added!" });

          /* ***** HERE YOU NEED TO PLACE THE LOGIC THAT PULLS THE API KEY DATA FROM 
            THE DATA BASE AND SENDS IT TO THE FRONT END TO BE RENDERED ***** */
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

addKeysRoutes.get("/retrieveKeys", (req, res) => {
  User.findById(req.user._id)
    .populate("exchangeAccount")
    .then((response) => {
      res.json(response);
    });
});

module.exports = addKeysRoutes;
