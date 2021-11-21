require("dotenv").config();

const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

// authentication
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo")(session);
require("./passport/index");
const flash = require("connect-flash");

mongoose
  // .connect(process.env.MONGODB_URI || "mongodb://localhost/botTrader", {
  .connect(process.env.MONGODB_URI_LIVE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup
app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true,
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "/client/build")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// default value for title local
app.locals.title = "botTrader";

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
require("./passport")(app);

const index = require("./routes/index");
app.use("/", index);

const auth = require("./routes/auth");
app.use("/auth", auth);

const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);

const googleRoutes = require("./routes/googleRoutes");
app.use("/google", googleRoutes);

const exchangeRoutes = require("./routes/exchangeRoutes");
app.use("/exchangeRoutes", exchangeRoutes);

const tradingRoutes = require("./routes/tradingRoutes");
app.use("/tradingRoutes", tradingRoutes);

const passChange = require("./routes/passChange");
app.use("/passChange", passChange);

const addKeysRoutes = require("./routes/addKeysRoutes");
app.use("/addKeysRoutes", addKeysRoutes);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "Not Found" });
});

app.use((req, res) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/client/build/index.html");
});

module.exports = app;
