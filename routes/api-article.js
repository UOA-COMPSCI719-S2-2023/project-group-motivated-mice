const express = require("express");
const router = express.Router();

const testDao = require("../modules/test-dao.js");
const articleData = require("../modules/read-article.js");
const loadImage = require("../modules/posting-dao.js")

// render an article
router.get("/entry/:id", async function (req, res) {
    let submittedId = req.params[`id`];
    const article = await articleData.retrieveArticle(submittedId);
    res.locals.article = article;
    res.locals.testing = "testing"
    res.locals.articleEntry = true;
    res.locals.articleId = submittedId;
    const userID = await loadImage.getUserByArticle(submittedId);
    const images = await loadImage.getImagesFromId(submittedId);
    res.locals.images = images;
    res.locals.author = userID;
    res.render("article");

});

module.exports = router;


