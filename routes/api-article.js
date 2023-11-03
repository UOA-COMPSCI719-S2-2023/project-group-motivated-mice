const express = require("express");
const router = express.Router();

const testDao = require("../modules/test-dao.js");
const articleData = require("../modules/read-article.js")
const imagesData = require("../modules/upload-image.js")

// render an article
router.get("/entry/:id", async function (req, res) {
    const articleId = req.params['id'];
    const article = await articleData.retrieveArticle(articleId);
    const image = await imagesData.getImageFromId(articleId);
    res.locals.article = article;
    res.locals.articleEntry = true;

    res.locals.publishDate = article.PublishDate;
    res.locals.likes = article.Likes;
    res.locals.title = article.Title;
    res.locals.images = await image.nameOfImage; 
    console.log("🚀 ~ file: api-article.js:18 ~ images:", res.locals.images);
    res.locals.content = article.Content;
    res.locals.userId = article.UserID;
    res.locals.location; //
    res.locals.userName; // want to add this in the sql
    // res.locals.locationId; For map API
   
    res.render("article");

});

module.exports = router;


