const express = require("express");
const router = express.Router();

/* GET auth page */
router.get("/auth", (req, res, next) => {
  res.render("index");
});

module.exports = router;
