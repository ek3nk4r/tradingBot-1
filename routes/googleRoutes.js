const express = require("express");
const googleRoutes = express.Router();
const passport = require("passport");

googleRoutes.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);
googleRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.SUCCESS_URL,
    failureRedirect: "/login", // here you would redirect to the login page using traditional login approach
  })
);

module.exports = googleRoutes;
