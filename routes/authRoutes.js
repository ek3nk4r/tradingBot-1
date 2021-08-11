const express = require("express");
const authRoutes = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const validator = require("email-validator");
const User = require("../models/User");
// const ExchangeAccount = require("../models/ExchangeAccount");
const sendEmail = require("../emailLogic/send");
const templates = require("../emailLogic/templates");

const msgs = {
  confirm: "Email sent, please check your inbox to confirm",
  confirmed: "Your email is confirmed!",
  resend: "Confirmation email resent, maybe check your spam?",
  couldNotFind: "Could not find you!",
  alreadyConfirmed: "Your email was already confirmed",
};

// SIGNUP
authRoutes.post("/signup", (req, res) => {
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

    var salt = bcrypt.genSaltSync(10);
    var hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username: username,
      password: hashPass,
    });

    console.log("***NEW USER***", newUser);

    newUser.save((err) => {
      console.log(err);
      if (err) {
        res
          .status(400)
          .json({ message: "Saving user to database went wrong." });
        return;
      }

      sendEmail(newUser.username, templates.confirm(newUser._id));

      // Automatically log in user after sign up
      // .login() here is actually predefined passport method
      // req.login(newUser, (err) => {
      //   if (err) {
      //     res.status(500).json({ message: "Login after signup went bad." });
      //     return;
      //   }

      //   // Send the user's information to the frontend
      //   // We can use also: res.status(200).json(req.user);
      //   res.status(200).json(newUser);
      // });
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

// EMAIL CONFIRMATION
authRoutes.get("/email/confirm/:id", (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      // A user with that id does not exist in the DB.
      if (!user) {
        res.json({ msg: msgs.couldNotFind });
      }

      // The user exists but has not been confirmed.
      else if (user && !user.emailConfirmed) {
        User.findByIdAndUpdate(id, { emailConfirmed: true })
          .then(() =>
            req.login(user, (err) => {
              if (err) {
                res
                  .status(500)
                  .json({ message: "Login after signup went bad." });
                return;
              }
              res.status(200).json(user);
            })
          )
          .catch((err) => console.log(err));
      }

      // The user has already confirmed this email address.
      else {
        res.json({ msg: msgs.alreadyConfirmed });
      }
    })
    .catch((err) => console.log(err));
});

module.exports = authRoutes;
