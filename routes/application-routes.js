const express = require("express");
const router = express.Router();

const testDao = require("../modules/test-dao.js");
const articleRouter = require("./api-posting.js");
const articleviewer = require("./api-article.js");

router.use(articleviewer);
router.use(articleRouter);

router.get("/", async function(req, res) {

    res.locals.title = "My route title!";
    res.locals.allTestData = await testDao.retrieveAllTestData();

    res.render("home");
});

module.exports = router;