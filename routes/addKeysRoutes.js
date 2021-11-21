const express = require("express");
const addKeysRoutes = express.Router();
const { encrypt } = require("../crypto/crypto");
const User = require("../models/User");
const ExchangeAccount = require("../models/ExchangeAccount");
const ApiSecret = require("../models/ApiSecret");

//RETRIEVE API KEYS TO DISPLAY IN THE FRONTEND
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
  // const secret = req.body.secret.toString();
  const exchangeName = req.body.exchange;
  const identifier = req.body.identifier;
  const net = req.body.net.toLowerCase();
  const hash = encrypt(req.body.secret.toString());

  ApiSecret.create({ ...hash })
    .then((response) => {
      const apiSecretId = response._id;
      const exchangeAccount = {
        exchangeName: exchangeName,
        identifier: identifier,
        net: net,
        key: key,
        secret: apiSecretId,
      };
      ExchangeAccount.create({ ...exchangeAccount })
        .then((response) => {
          const exchangeAccountId = response._id;
          User.findByIdAndUpdate(req.user._id, {
            $push: { exchangeAccount: exchangeAccountId, secret: apiSecretId },
          })
            .then(() => {
              res.json({ msg: "API Keys successfully added!" });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

// DELETE API KEYS
addKeysRoutes.put("/deleteApiKeys", (req, res, next) => {
  const { apiKey_id } = req.body;

  User.findById(req.user._id)
    .populate("exchangeAccount")
    .then((userInfo) => {
      const [exhangeAccountToDelete] = userInfo.exchangeAccount.filter((el) => {
        if (el._id.toString() == apiKey_id) {
          return el;
        }
      });
      User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { exchangeAccount: exhangeAccountToDelete._id },
        },
        { new: true }
      )
        .then(() => {
          res.json({ msg: "API Keys Deleted" });
          ExchangeAccount.findByIdAndDelete(exhangeAccountToDelete).then(() => {
            console.log("Keys Successfully Deleted");
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

module.exports = addKeysRoutes;
