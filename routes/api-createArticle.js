const express = require("express");
const router = express.Router();
router.get("/posting", function (req, res) {

    res.render("posting");
  });

  module.exports = router;