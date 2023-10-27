const express = require("express");
const router = express.Router();

const testDao = require("../modules/test-dao.js");

router.get("/entry", function (req, res) {
res.locals.title;
res.locals.publishDate;
res.locals.likes;
res.locals.title;
res.locals.image;
res.locals.content;
res.locals.userId;
res.locals;
// res.locals.locationId; For map API

});

module.exports = router;