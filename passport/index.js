const passport = require("passport");
const User = require("../models/User");
require("./localStrategy");
require("./serializers");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:5555/google/google/callback",
      scope: ["profile"],
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then((user) => {
          if (user) {
            console.log("User", user);
            done(null, user);
          } else {
            return User.create({
              googleId: profile.id,
              username: profile.displayName,
            }).then((newUser) => {
              done(null, newUser);
            });
          }
        })
        .catch((err) => {
          console.log("error", err);
          done(err);
        });
    }
  )
);

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
};
