const express = require("express");
const router = express.Router();
const articles = require("../modules/posting-dao.js");

router.get("/gallery", async function (req, res) {
    const articlesList = await articles.retrieveAllArticles();
    res.locals.articles = articlesList;
   

    res.render("gallery");
  });

  module.exports = router;
