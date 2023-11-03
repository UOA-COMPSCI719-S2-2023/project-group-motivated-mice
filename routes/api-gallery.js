const express = require("express");
const router = express.Router();
const articles = require("../modules/posting-dao.js");
const reading = require("../modules/read-article.js")

router.get("/gallery", async function (req, res) {
    let articlesList = await articles.retrieveAllArticles();
    const thumbnailList = await articles.retrieveAllThumbnails();
    
    res.locals.articles = articlesList;
    res.locals.images = thumbnailList;
   
    res.render("gallery");
  });

  module.exports = router;
