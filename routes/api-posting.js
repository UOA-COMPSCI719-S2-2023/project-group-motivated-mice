const express = require("express");
const router = express.Router();

const testDao = require("../modules/test-dao.js");
router.get("/write-article", function (req, res) {

res.locals.articleEntry = true;
res.render("posting");

});

module.exports = router;