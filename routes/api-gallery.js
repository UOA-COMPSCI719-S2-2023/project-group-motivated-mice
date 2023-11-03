const express = require("express");
const router = express.Router();
const articles = require("../modules/posting-dao.js");
const reading = require("../modules/read-article.js")

router.get("/gallery", async function (req, res) {
    let articlesList = await articles.retrieveAllArticles();
    console.log("🚀 ~ file: api-gallery.js:8 ~ articlesList:", articlesList)

    const thumbnailList = await articles.retrieveAllThumbnails();
    
    res.locals.articles = articlesList;
    res.locals.images = thumbnailList;
   

    res.render("gallery");
  });

  module.exports = router;
