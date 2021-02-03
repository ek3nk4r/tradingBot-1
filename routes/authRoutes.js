const express = require("express");
const authRoutes = express.Router();

const passport = require("passport");
const bcrypt = require("bcryptjs");
const validator = require("email-validator");

// require the user model !!!!
const User = require("../models/User");

// SIGNUP
authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!validator.validate(username)) {
    res.status(400).json({ message: "Please provide a valid email address." });
    return;
  }

  if (!username || !password) {
    res.status(400).json({ message: "Please provide username and password." });
    return;
  }

  if (password.length < 8) {
    res.status(400).json({
      message: "Passwords must be at least 8 characters long.",
    });
    return;
  }

  User.findOne({ username }, (err, foundUser) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Username check went failed.  Please try again." });
      return;
    }

    if (foundUser) {
      res
        .status(400)
        .json({ message: "Username is taken. Please choose another one." });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const aNewUser = new User({
      username: username,
      password: hashPass,
    });

    aNewUser.save((err) => {
      if (err) {
        res
          .status(400)
          .json({ message: "Saving user to database went wrong." });
        return;
      }

      // Automatically log in user after sign up
      // .login() here is actually predefined passport method
      req.login(aNewUser, (err) => {
        if (err) {
          res.status(500).json({ message: "Login after signup went bad." });
          return;
        }

        // Send the user's information to the frontend
        // We can use also: res.status(200).json(req.user);
        res.status(200).json(aNewUser);
      });
    });
  });
});

// LOGIN
authRoutes.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Something went wrong authenticating user" });
      return;
    }

    if (!user) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      res.status(401).json(failureDetails);
      return;
    }

    // save user in session
    req.login(user, (err) => {
      if (err) {
        res.status(500).json({ message: "Session save went bad." });
        return;
      }

      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(user);
    });
  })(req, res, next);
});

// LOGOUT
authRoutes.delete("/logout", (req, res, next) => {
  // req.logout() is defined by passport
  req.logout();
  res.status(200).json({ message: "Log out success!" });
});

// LOGGEDIN -???-
authRoutes.get("/loggedin", (req, res, next) => {
  res.json(req.user);
});

module.exports = authRoutes;
