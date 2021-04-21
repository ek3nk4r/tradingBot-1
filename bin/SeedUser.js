const user = [
  {
    firstName: "Admin",
    lastName: "Admin",
    email: "kdchorley@hotmail.com",
    password: "12345678",
    exchangeAccount: [],
    userType: "admin",
  },
  {
    firstName: "User",
    lastName: "User",
    email: "kdchorley@gmail.com",
    password: "12345678",
    exchangeAccount: [],
    userType: "user",
  },
];

const mongoose = require("mongoose");
// const { getMaxListeners } = require("../models/User");
const User = require("../models/User");

mongoose.connect("mongodb://localhost/botTrader");

// const users = user.map(user => {
//   return user;
// });

User.insertMany(user)
  .then((documents) => {
    console.log(`Success! ${documents.length}, users were added`);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });
