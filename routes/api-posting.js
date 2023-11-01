const express = require("express");
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json({}));

const testDao = require("../modules/test-dao.js");
const postArticle = require("../modules/make-article.js");


router.get("/posting", function (req, res) {
    res.locals.articleEntry = true;
    res.render("posting");
});

router.post("/writeArticle", async function (req,res){
 const title = req.body.title;
 const userId = 2;
 const content = req.body.article;
 await postArticle.createPost(userId, content, title);
 res.locals.title = title;
 res.locals.articleEntry = true;
 res.locals.preview = true;
 res.locals.content = content;
 res.render("article");
})
module.exports = router;