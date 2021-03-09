const express = require("express");
const addKeysRoutes = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const ExchangeAccount = require("../models/ExchangeAccount");

// password SALT
var salt = bcrypt.genSaltSync(10);

//RETRIEVE API KEYS
addKeysRoutes.get("/retrieveKeys", (req, res) => {
  User.findById(req.user._id)
    .populate("exchangeAccount")
    .then((response) => {
      res.json(response);
    });
});

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

// DELETE API KEYS
addKeysRoutes.put("/deleteApiKeys", (req, res, next) => {
  console.log("***DELETE KEYS***", typeof req.body.id);
  const { id } = req.body;

  User.findById(req.user._id)
    .populate("ExchangeAccount")
    // POPULATE GETS THE ARRAY WITH ALL THE PRODUCTS THERE
    .then((userInfo) => {
      console.log("***USER INFO***", userInfo.exchangeAccount);

      // THIS FILTER IS GOING TO RETURN JUST THE OBJECT THAT WERE TRYING TO REMOVE FROM THE USER FAVORITES ARRAY
      const [keysToDelete] = userInfo.exchangeAccount.filter((el) => {
        console.log("********************", el._id.id);
        parseInt(el._id) === id;
      });
      console.log("***KEYS TO DELETE***", keysToDelete);
      // AND NOW WERE GOING TO REMOVE SAID PRODUCT FROM THE USER PRODUCTS ARRAY
      User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { exchangeAccount: keysToDelete._id },
        },
        { new: true }
      ).then(() => {
        // MESSAGE OF SUCCESS SENT TO USER
        res.json({ message: "API Keys Deleted" });
        // PRODUCT NO LONGER RELEVANT ENOUGH TO KEEP IN DATABASE. TIME TO DELETE
        ExchangeAccount.findByIdAndDelete(keysToDelete).then(() => {
          // HERE IT SINGLAS THAT SAID PRODUCT WAS DELETED
          console.log("Keys Successfully Deleted");
        });
      });
    });
});

module.exports = addKeysRoutes;
