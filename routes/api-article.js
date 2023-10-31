const express = require("express");
const router = express.Router();

const testDao = require("../modules/test-dao.js");
const articleData = require("../modules/article-view.js")
router.get("/entry/:id", async function (req, res) {
    const articleId = req.params['id'];
    const article = await articleData.viewPost(articleId) ;
    res.locals.article = article;
    res.locals.articleEntry = true;

    res.locals.publishDate = article.PublishDate;
    res.locals.likes = article.Likes;
    res.locals.title = article.Title;
    res.locals.image;
    res.locals.content = article.Content;
    res.locals.userId = article.UserID;
    res.locals.location; //
    res.locals.about; // want to add this in the sql
    res.locals.userName; // want to add this in the sql
    // res.locals.locationId; For map API
   
    res.render("article");

});

module.exports = router;


