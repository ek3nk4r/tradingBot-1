const express = require("express");
const emailRoutes = express.Router();
const User = require("../models/User");

// NOTIFICATIONS
const msgs = {
  confirm: "Email sent, please check your inbox to confirm",
  confirmed: "Your email is confirmed!",
  resend: "Confirmation email resent, maybe check your spam?",
  couldNotFind: "Could not find you!",
  alreadyConfirmed: "Your email was already confirmed",
};

// EMAIL CONFIRMATION
emailRoutes.get("/email/confirm/:id", (req, res, next) => {
  const { id } = req.params;
  console.log("ID: ", id);

  User.findById(id)
    .then((user) => {
      console.log(user);
      // A user with that id does not exist in the DB. Perhaps some tricky
      // user tried to go to a different url than the one provided in the
      // confirmation email.
      if (!user) {
        res.json({ msg: msgs.couldNotFind });
      }

      // The user exists but has not been confirmed. We need to confirm this
      // user and let them know their email address has been confirmed.
      else if (user && !user.emailConfirmed) {
        User.findByIdAndUpdate(id, { emailConfirmed: true })
          .then(
            () =>
              req.login(user, (err) => {
                if (err) {
                  res
                    .status(500)
                    .json({ message: "Login after signup went bad." });
                  return;
                }
                res.status(200).json(user);
              })
            // res.json({ msg: msgs.confirmed })
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

module.exports = emailRoutes;
